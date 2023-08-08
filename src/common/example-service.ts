/**
 * Example service interface
 *
 * Temporary solution for https://github.com/strapi/strapi/issues/16993
 *
 * This was implemented because Strapi introduced new Type System (https://github.com/strapi/strapi/pull/16917) in v4.11.1 and started breaking builds
 *
 * TODO: Remove this file and all references when Strapi fixes the issue
 */

import {
  ApplyFiltersRequestDTO,
  ApplyFiltersResponseDTO,
  GetFiltersRequestDTO,
} from "../api/filters/dto";
import {
  GetObjectsRequestDTO,
  GetObjectsResponseDTO,
} from "../api/objects/dto";
import { SearchResponseDTO } from "../api/search/dto";

export type ExampleService = {
  find: (query: any) => Promise<any>;
  findOne: (id: string, query: any) => Promise<any>;
  create: (data: any, { files }?: { files?: any }) => Promise<any>;
  applyFilters: (
    body: ApplyFiltersRequestDTO,
    populate: string | string[]
  ) => Promise<ApplyFiltersResponseDTO>;
  getFilters: (body: GetFiltersRequestDTO) => Promise<any>;
  getObjects: (
    body: GetObjectsRequestDTO,
    populate: string | string[]
  ) => Promise<GetObjectsResponseDTO>;
  search: (
    searchString: string,
    populate: string | string[]
  ) => Promise<SearchResponseDTO>;
};
