import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TuiButton, TuiIcon} from '@taiga-ui/core';
import {TourAnchorTuiHintDirective} from 'ngx-ui-tour-tui-hint';

import {TravelPlanDto} from '../../proposal.dto';
import {TRAVEL_NOTES_TOUR} from '../comment-tour/comment-tour.provider';
import {TRAVEL_NOTES_TOUR_ANCHORS} from '../comment-tour/comment-tour.service';

@Component({
    selector: 'travel-note-form',
    imports: [FormsModule, TourAnchorTuiHintDirective, TuiButton, TuiIcon],
    templateUrl: './comment-form.component.html',
    styleUrl: './comment-form.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TravelNoteFormComponent {
    protected readonly travelNotesTour = inject(TRAVEL_NOTES_TOUR);
    protected readonly anchors = TRAVEL_NOTES_TOUR_ANCHORS;
    protected note = '';
    protected addToChecklist = false;

    public readonly travelPlan = input.required<TravelPlanDto>();

    protected cancel(): void {
        this.note = '';
        this.addToChecklist = false;
    }

    protected submit(): void {
        this.note = '';
        this.addToChecklist = false;
    }
}
