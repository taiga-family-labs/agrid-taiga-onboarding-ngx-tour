import {ChangeDetectionStrategy, Component, inject, input, output} from '@angular/core';
import {TuiButton} from '@taiga-ui/core';
import {TuiSegmented} from '@taiga-ui/kit';
import {TourAnchorTuiHintDirective} from 'ngx-ui-tour-tui-hint';

import {TravelPlanDto} from '../../proposal.dto';
import {TravelNoteFormComponent} from '../comment-form/comment-form.component';
import {TRAVEL_NOTES_TOUR} from '../comment-tour/comment-tour.provider';
import {TRAVEL_NOTES_TOUR_ANCHORS} from '../comment-tour/comment-tour.service';

@Component({
    selector: 'travel-notes-sidebar',
    imports: [
        TravelNoteFormComponent,
        TourAnchorTuiHintDirective,
        TuiButton,
        TuiSegmented,
    ],
    templateUrl: './comments-sidebar.component.html',
    styleUrl: './comments-sidebar.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TravelNotesSidebarComponent {
    protected readonly travelNotesTour = inject(TRAVEL_NOTES_TOUR);
    protected readonly anchors = TRAVEL_NOTES_TOUR_ANCHORS;
    protected activeSegment = 0;

    public readonly travelPlan = input.required<TravelPlanDto>();
    public readonly closed = output<void>();
}
