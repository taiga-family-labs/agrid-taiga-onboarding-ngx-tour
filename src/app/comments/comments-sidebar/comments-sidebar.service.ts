import {computed, Injectable, signal} from '@angular/core';

import {TravelPlanDto} from '../../proposal.dto';

@Injectable()
export class TravelNotesSidebarService {
    public readonly travelPlan = signal<TravelPlanDto | null>(null);
    public readonly opened = computed(() => this.travelPlan() !== null);

    public open(travelPlan: TravelPlanDto): void {
        this.travelPlan.set(travelPlan);
    }

    public close(): void {
        this.travelPlan.set(null);
    }
}
