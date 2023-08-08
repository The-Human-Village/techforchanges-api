export class ApplyFiltersRequestDTO {
  readonly dimensionUIDs: string[];
  readonly cities: string[];
  readonly returnNews: boolean;
  readonly returnMembers: boolean;
  readonly returnMissions: boolean;
  readonly returnServices: boolean;
  readonly returnServiceProviders: boolean;
  readonly locale: string;
}
