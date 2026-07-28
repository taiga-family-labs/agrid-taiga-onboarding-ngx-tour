import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {WA_LOCAL_STORAGE} from '@ng-web-apis/common';
import {type IStepOption, TourService} from 'ngx-ui-tour-tui-hint';

import {TravelPlanDto} from '../../proposal.dto';
import {TravelNotesSidebarService} from '../comments-sidebar/comments-sidebar.service';

export const TRAVEL_NOTES_TOUR_ANCHORS = {
    trigger: 'travel-notes-trigger',
    tabs: 'travel-notes-tabs',
    checklist: 'travel-notes-checklist',
} as const;

export const TRAVEL_NOTES_TOUR_STEPS = {
    trigger: 'travel-notes-trigger-step',
    tabs: 'travel-notes-tabs-step',
    checklist: 'travel-notes-checklist-step',
} as const;

const STORAGE_KEY = '@onboarding.travel-notes.v1';
const MUTED_STATE = 'muted';

const STEPS: IStepOption[] = [
    {
        stepId: TRAVEL_NOTES_TOUR_STEPS.trigger,
        anchorId: TRAVEL_NOTES_TOUR_ANCHORS.trigger,
        placement: 'right',
        enableBackdrop: true,
    },
    {
        stepId: TRAVEL_NOTES_TOUR_STEPS.tabs,
        anchorId: TRAVEL_NOTES_TOUR_ANCHORS.tabs,
        placement: 'left',
        enableBackdrop: true,
        isAsync: true,
    },
    {
        stepId: TRAVEL_NOTES_TOUR_STEPS.checklist,
        anchorId: TRAVEL_NOTES_TOUR_ANCHORS.checklist,
        placement: 'left',
        enableBackdrop: true,
        isAsync: true,
    },
];

@Injectable()
export class TravelNotesTourService {
    private readonly localStorage = inject(WA_LOCAL_STORAGE);
    private readonly sidebar = inject(TravelNotesSidebarService);
    private readonly tour = inject(TourService);
    private readonly targetTravelPlan = signal<TravelPlanDto | null>(null);

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

    public prepare(travelPlan: TravelPlanDto): void {
        this.targetTravelPlan.set(travelPlan);
    }

    public start(travelPlan: TravelPlanDto, ignoreMuted = false): boolean {
        if (!ignoreMuted && this.localStorage.getItem(STORAGE_KEY) === MUTED_STATE) {
            return false;
        }

        this.targetTravelPlan.set(travelPlan);

        if (this.tour.currentStep) {
            this.tour.end();
        }

        this.tour.start();

        return true;
    }

    public isTarget(travelPlan: TravelPlanDto): boolean {
        return this.targetTravelPlan()?.id === travelPlan.id;
    }

    public next(): void {
        if (this.tour.currentStep?.stepId === TRAVEL_NOTES_TOUR_STEPS.trigger) {
            const travelPlan = this.targetTravelPlan();

            if (travelPlan) {
                this.sidebar.open(travelPlan);
            }
        }

        this.tour.next();
    }
}
