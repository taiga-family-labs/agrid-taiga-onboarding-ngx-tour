import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {WA_LOCAL_STORAGE} from '@ng-web-apis/common';
import {type IStepOption, TourService} from 'ngx-ui-tour-tui-hint';

import {ProposalDto} from '../../proposal.dto';
import {CommentsSidebarService} from '../comments-sidebar/comments-sidebar.service';

export const COMMENT_TOUR_ANCHORS = {
    trigger: 'comment-trigger',
    tabs: 'comment-tabs',
    justification: 'comment-justification',
} as const;

export const COMMENT_TOUR_STEPS = {
    trigger: 'comment-trigger-step',
    tabs: 'comment-tabs-step',
    justification: 'comment-justification-step',
} as const;

const STORAGE_KEY = '@onboarding.comment-triggers.v1';
const MUTED_STATE = 'muted';

const STEPS: IStepOption[] = [
    {
        stepId: COMMENT_TOUR_STEPS.trigger,
        anchorId: COMMENT_TOUR_ANCHORS.trigger,
        placement: 'right',
        enableBackdrop: true,
    },
    {
        stepId: COMMENT_TOUR_STEPS.tabs,
        anchorId: COMMENT_TOUR_ANCHORS.tabs,
        placement: 'left',
        enableBackdrop: true,
        isAsync: true,
    },
    {
        stepId: COMMENT_TOUR_STEPS.justification,
        anchorId: COMMENT_TOUR_ANCHORS.justification,
        placement: 'left',
        enableBackdrop: true,
        isAsync: true,
    },
];

@Injectable()
export class CommentTourService {
    private readonly localStorage = inject(WA_LOCAL_STORAGE);
    private readonly sidebar = inject(CommentsSidebarService);
    private readonly tour = inject(TourService);
    private readonly targetProposal = signal<ProposalDto | null>(null);

    public constructor() {
        this.tour.initialize(STEPS, {
            disablePageScrolling: true,
            showProgress: false,
            stepDimensions: {
                width: 'min(29rem, calc(100vw - 1rem))',
                maxWidth: 'calc(100vw - 1rem)',
            },
        });

        this.tour.end$
            .pipe(takeUntilDestroyed(inject(DestroyRef)))
            .subscribe(() => this.localStorage.setItem(STORAGE_KEY, MUTED_STATE));
    }

    public prepare(proposal: ProposalDto): void {
        this.targetProposal.set(proposal);
    }

    public start(proposal: ProposalDto, ignoreMuted = false): boolean {
        if (!ignoreMuted && this.localStorage.getItem(STORAGE_KEY) === MUTED_STATE) {
            return false;
        }

        this.targetProposal.set(proposal);

        if (this.tour.currentStep) {
            this.tour.end();
        }

        this.tour.start();

        return true;
    }

    public isTarget(proposal: ProposalDto): boolean {
        return this.targetProposal()?.id === proposal.id;
    }

    public next(): void {
        if (this.tour.currentStep?.stepId === COMMENT_TOUR_STEPS.trigger) {
            const proposal = this.targetProposal();

            if (proposal) {
                this.sidebar.open(proposal);
            }
        }

        this.tour.next();
    }
}
