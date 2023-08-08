import {
  ApiDimensionDimension,
  ApiMemberMember,
  ApiMissionMission,
  ApiNewsNews,
  ApiServiceProviderServiceProvider,
  ApiServiceService
} from "../../../../schemas";

export class GetObjectsResponseDTO {
  readonly news: ApiNewsNews[];
  readonly members: ApiMemberMember[];
  readonly missions: ApiMissionMission[];
  readonly services: ApiServiceService[];
  readonly dimensions: ApiDimensionDimension[];
  readonly serviceProviders: ApiServiceProviderServiceProvider[];
}
