import {ChangeDetectionStrategy, Component, inject, input, output} from '@angular/core';
import {TuiButton} from '@taiga-ui/core';
import {TuiSegmented} from '@taiga-ui/kit';
import {TourAnchorTuiHintDirective} from 'ngx-ui-tour-tui-hint';

import {ProposalDto} from '../../proposal.dto';
import {CommentFormComponent} from '../comment-form/comment-form.component';
import {COMMENT_TOUR} from '../comment-tour/comment-tour.provider';
import {COMMENT_TOUR_ANCHORS} from '../comment-tour/comment-tour.service';

@Component({
    selector: 'comments-sidebar',
    imports: [CommentFormComponent, TourAnchorTuiHintDirective, TuiButton, TuiSegmented],
    templateUrl: './comments-sidebar.component.html',
    styleUrl: './comments-sidebar.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsSidebarComponent {
    protected readonly commentTour = inject(COMMENT_TOUR);
    protected readonly anchors = COMMENT_TOUR_ANCHORS;
    protected activeSegment = 0;

    public readonly proposal = input.required<ProposalDto>();
    public readonly closed = output<void>();
}
