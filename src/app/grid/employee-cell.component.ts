import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiButton} from '@taiga-ui/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';
import {TourAnchorTuiHintDirective} from 'ngx-ui-tour-tui-hint';

import {TRAVEL_NOTES_TOUR} from '../comments/comment-tour/comment-tour.provider';
import {TRAVEL_NOTES_TOUR_ANCHORS} from '../comments/comment-tour/comment-tour.service';
import {TravelNotesSidebarService} from '../comments/comments-sidebar/comments-sidebar.service';
import {TravelPlanDto} from '../proposal.dto';

@Component({
    selector: 'travel-plan-cell',
    imports: [TourAnchorTuiHintDirective, TuiButton],
    templateUrl: './employee-cell.component.html',
    styleUrl: './employee-cell.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TravelPlanCellComponent implements ICellRendererAngularComp {
    protected readonly sidebar = inject(TravelNotesSidebarService);
    protected readonly travelNotesTour = inject(TRAVEL_NOTES_TOUR);
    protected readonly anchors = TRAVEL_NOTES_TOUR_ANCHORS;
    protected travelPlan!: TravelPlanDto;

    public agInit(params: ICellRendererParams<TravelPlanDto>): void {
        if (params.data) {
            this.travelPlan = params.data;
        }
    }

    public refresh(params: ICellRendererParams<TravelPlanDto>): boolean {
        this.agInit(params);

        return true;
    }
}
