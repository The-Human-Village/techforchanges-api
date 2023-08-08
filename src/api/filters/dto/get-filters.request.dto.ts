export class GetFiltersRequestDTO {
  readonly newsUIDs: string[];
  readonly memberUIDs: string[];
  readonly missionUIDs: string[];
  readonly serviceUIDs: string[];
  readonly serviceProviderUIDs: string[];
  readonly locale: string;
}
