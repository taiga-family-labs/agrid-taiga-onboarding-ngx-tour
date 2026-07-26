export interface ProposalDto {
    readonly id: number;
    readonly employeeFullName: string;
    readonly department: string;
    readonly currentCr: number;
    readonly recommendedCr: number;
    readonly status: string;
    readonly comments: number;
}
