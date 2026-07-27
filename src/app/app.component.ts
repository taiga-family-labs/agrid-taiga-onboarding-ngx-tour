import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiButton, TuiRoot, TuiTitle} from '@taiga-ui/core';
import {AgGridAngular} from 'ag-grid-angular';
import {
    AllCommunityModule,
    type ColDef,
    type GridApi,
    type GridReadyEvent,
    ModuleRegistry,
} from 'ag-grid-community';
import {TourService, TourTuiHintModule} from 'ngx-ui-tour-tui-hint';

import {
    COMMENT_TOUR,
    provideCommentTour,
} from './comments/comment-tour/comment-tour.provider';
import {CommentTourTemplateComponent} from './comments/comment-tour/comment-tour-template.component';
import {CommentsSidebarComponent} from './comments/comments-sidebar/comments-sidebar.component';
import {CommentsSidebarService} from './comments/comments-sidebar/comments-sidebar.service';
import {PROPOSALS} from './data/proposals';
import {EmployeeCellComponent} from './grid/employee-cell.component';
import {ProposalDto} from './proposal.dto';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
    selector: 'onboarding-demo',
    imports: [
        AgGridAngular,
        CommentTourTemplateComponent,
        CommentsSidebarComponent,
        TourTuiHintModule,
        TuiButton,
        TuiRoot,
        TuiTitle,
    ],
    providers: [provideCommentTour(), CommentsSidebarService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    protected readonly commentTour = inject(COMMENT_TOUR);
    protected readonly sidebar = inject(CommentsSidebarService);
    protected readonly rowData = PROPOSALS;

    protected readonly defaultColDef: ColDef<ProposalDto> = {
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
        minWidth: 140,
    };

    protected readonly columnDefs: ColDef<ProposalDto>[] = [
        {
            colId: 'employeeFullName',
            field: 'employeeFullName',
            headerName: 'Сотрудник',
            cellRenderer: EmployeeCellComponent,
            minWidth: 320,
            flex: 1.5,
        },
        {field: 'department', headerName: 'Подразделение', minWidth: 210},
        {field: 'currentCr', headerName: 'Текущий CR', minWidth: 130},
        {field: 'recommendedCr', headerName: 'Новый CR', minWidth: 130},
        {field: 'status', headerName: 'Статус', minWidth: 180},
    ];

    private readonly tour = inject(TourService);
    private gridApi: GridApi<ProposalDto> | null = null;
    private autoStartAttempted = false;

    public constructor() {
        const proposal = this.rowData[0];

        if (proposal) {
            this.commentTour?.prepare(proposal);
        }
    }

    protected onGridReady(event: GridReadyEvent<ProposalDto>): void {
        this.gridApi = event.api;
    }

    protected onFirstDataRendered(): void {
        if (this.autoStartAttempted) {
            return;
        }

        this.autoStartAttempted = true;
        this.startTour();
    }

    protected startTour(ignoreMuted = false): void {
        const proposal = this.rowData[0];

        if (!proposal || !this.commentTour?.start(proposal, ignoreMuted)) {
            return;
        }

        this.sidebar.close();
        this.gridApi?.ensureColumnVisible('employeeFullName');
        this.gridApi?.forEachNode((node) => {
            if (node.data?.id === proposal.id) {
                this.gridApi?.ensureNodeVisible(node, 'middle');
            }
        });
    }

    protected closeSidebar(): void {
        this.sidebar.close();

        if (this.tour.currentStep) {
            this.tour.end();
        }
    }
}
