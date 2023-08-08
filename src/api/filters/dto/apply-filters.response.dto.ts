import {
  ApiMemberMember,
  ApiMissionMission,
  ApiNewsNews,
  ApiServiceProviderServiceProvider,
  ApiServiceService
} from "../../../../schemas";

export class ApplyFiltersResponseDTO {
  readonly news: ApiNewsNews[];
  readonly members: ApiMemberMember[];
  readonly missions: ApiMissionMission[];
  readonly services: ApiServiceService[];
  readonly serviceProviders: ApiServiceProviderServiceProvider[];
}
