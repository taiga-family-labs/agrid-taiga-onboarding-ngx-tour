import {computed, Injectable, signal} from '@angular/core';

import {ProposalDto} from '../../proposal.dto';

@Injectable()
export class CommentsSidebarService {
    public readonly proposal = signal<ProposalDto | null>(null);
    public readonly opened = computed(() => this.proposal() !== null);

    public open(proposal: ProposalDto): void {
        this.proposal.set(proposal);
    }

    public close(): void {
        this.proposal.set(null);
    }
}
