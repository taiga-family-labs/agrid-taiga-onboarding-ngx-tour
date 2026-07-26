import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiButton} from '@taiga-ui/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';
import {TourAnchorTuiHintDirective} from 'ngx-ui-tour-tui-hint';

import {COMMENT_TOUR} from '../comments/comment-tour/comment-tour.provider';
import {COMMENT_TOUR_ANCHORS} from '../comments/comment-tour/comment-tour.service';
import {CommentsSidebarService} from '../comments/comments-sidebar/comments-sidebar.service';
import {ProposalDto} from '../proposal.dto';

@Component({
    selector: 'employee-cell',
    imports: [TourAnchorTuiHintDirective, TuiButton],
    templateUrl: './employee-cell.component.html',
    styleUrl: './employee-cell.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCellComponent implements ICellRendererAngularComp {
    protected readonly sidebar = inject(CommentsSidebarService);
    protected readonly commentTour = inject(COMMENT_TOUR);
    protected readonly anchors = COMMENT_TOUR_ANCHORS;
    protected proposal!: ProposalDto;

    public agInit(params: ICellRendererParams<ProposalDto>): void {
        if (params.data) {
            this.proposal = params.data;
        }
    }

    public refresh(params: ICellRendererParams<ProposalDto>): boolean {
        this.agInit(params);

        return true;
    }
}
