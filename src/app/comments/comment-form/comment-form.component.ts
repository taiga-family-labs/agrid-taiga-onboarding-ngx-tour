import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TuiButton, TuiIcon} from '@taiga-ui/core';
import {TourAnchorTuiHintDirective} from 'ngx-ui-tour-tui-hint';

import {ProposalDto} from '../../proposal.dto';
import {
    COMMENT_TOUR,
} from '../comment-tour/comment-tour.provider';
import {COMMENT_TOUR_ANCHORS} from '../comment-tour/comment-tour.service';

@Component({
    selector: 'comment-form',
    imports: [FormsModule, TourAnchorTuiHintDirective, TuiButton, TuiIcon],
    templateUrl: './comment-form.component.html',
    styleUrl: './comment-form.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent {
    protected readonly commentTour = inject(COMMENT_TOUR);
    protected readonly anchors = COMMENT_TOUR_ANCHORS;
    protected comment = '';
    protected isJustification = false;

    public readonly proposal = input.required<ProposalDto>();

    protected cancel(): void {
        this.comment = '';
        this.isJustification = false;
    }

    protected submit(): void {
        this.comment = '';
        this.isJustification = false;
    }
}
