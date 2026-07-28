export interface TravelPlanDto {
    readonly id: number;
    readonly title: string;
    readonly country: string;
    readonly season: string;
    readonly durationDays: number;
    readonly status: string;
    readonly notesCount: number;
}
