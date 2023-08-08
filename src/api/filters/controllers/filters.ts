import utils from "@strapi/utils";
import { ApplyFiltersRequestDTO, GetFiltersRequestDTO } from "../dto";
import { ExampleService } from "../../../common/example-service";
const { ValidationError } = utils.errors;

/**
 * A set of functions called "actions" for `filters`
 */

const parseApplyFiltersBody = (ctx): ApplyFiltersRequestDTO => {
  if (!ctx.request.body) {
    throw new ValidationError("Request body is required");
  }

  const body = ctx.request.body;
  const locale = ctx.query.locale ?? "en";

  const errors: {
    property: string;
    error: string;
  }[] = [];

  if (
    (!body.dimensionUIDs || body.dimensionUIDs.length <= 0) &&
    (!body.cities || body.cities.length <= 0)
  ) {
    errors.push({
      property: "dimensionUIDs or cities",
      error: "is required",
    });
  }

  if (
    body.dimensionUIDs &&
    body.dimensionUIDs.length > 1 &&
    body.dimensionUIDs.some((uid) => typeof uid !== "string")
  ) {
    errors.push({
      property: "dimensionUIDs",
      error: "must be strings",
    });
  }

  if (
    body.cities &&
    body.cities.length > 1 &&
    body.cities.some((city) => typeof city !== "string")
  ) {
    errors.push({
      property: "cities",
      error: "must be strings",
    });
  }

  if (
    typeof body.returnNews !== "undefined" &&
    typeof body.returnNews !== "boolean"
  ) {
    errors.push({
      property: "returnNews",
      error: "must be boolean",
    });
  }

  if (
    typeof body.returnMembers !== "undefined" &&
    typeof body.returnMembers !== "boolean"
  ) {
    errors.push({
      property: "returnMembers",
      error: "must be boolean",
    });
  }

  if (
    typeof body.returnMissions !== "undefined" &&
    typeof body.returnMissions !== "boolean"
  ) {
    errors.push({
      property: "returnMissions",
      error: "must be boolean",
    });
  }

  if (
    typeof body.returnServices !== "undefined" &&
    typeof body.returnServices !== "boolean"
  ) {
    errors.push({
      property: "returnServices",
      error: "must be boolean",
    });
  }

  if (
    typeof body.returnServiceProviders !== "undefined" &&
    typeof body.returnServiceProviders !== "boolean"
  ) {
    errors.push({
      property: "returnServiceProviders",
      error: "must be boolean",
    });
  }

  if (errors.length > 0) {
    throw new ValidationError(
      `${errors.map((err) => err.property).join(", ")} have errors`,
      errors
    );
  }

  return {
    dimensionUIDs: body.dimensionUIDs,
    cities: body.cities,
    returnNews: body.returnNews ?? false,
    returnMembers: body.returnMembers ?? false,
    returnMissions: body.returnMissions ?? false,
    returnServices: body.returnServices ?? false,
    returnServiceProviders: body.returnServiceProviders ?? false,
    locale,
  };
};

const parseGetFiltersBody = (ctx): GetFiltersRequestDTO => {
  if (!ctx.request.body) {
    throw new ValidationError("Request body is required");
  }

  const body = ctx.request.body;
  const locale = ctx.request.query.locale ?? "en";

  const errors: {
    property: string;
    error: string;
  }[] = [];

  if (
    body.newsUIDs &&
    body.newsUIDs.length > 0 &&
    body.newsUIDs.some((uid) => typeof uid !== "string")
  ) {
    errors.push({
      property: "newsUIDs",
      error: "must be strings",
    });
  }

  if (
    body.memberUIDs &&
    body.memberUIDs.length > 0 &&
    body.memberUIDs.some((uid) => typeof uid !== "string")
  ) {
    errors.push({
      property: "memberUIDs",
      error: "must be strings",
    });
  }

  if (
    body.missionUIDs &&
    body.missionUIDs.length > 0 &&
    body.missionUIDs.some((uid) => typeof uid !== "string")
  ) {
    errors.push({
      property: "missionUIDs",
      error: "must be strings",
    });
  }

  if (
    body.serviceUIDs &&
    body.serviceUIDs.length > 0 &&
    body.serviceUIDs.some((uid) => typeof uid !== "string")
  ) {
    errors.push({
      property: "serviceUIDs",
      error: "must be strings",
    });
  }

  if (
    body.serviceProviderUIDs &&
    body.serviceProviderUIDs.length > 0 &&
    body.serviceProviderUIDs.some((uid) => typeof uid !== "string")
  ) {
    errors.push({
      property: "serviceProviderUIDs",
      error: "must be strings",
    });
  }

  if (errors.length > 0) {
    throw new ValidationError(
      `${errors.map((err) => err.property).join(", ")} have errors`,
      errors
    );
  }

  return {
    newsUIDs: body.newsUIDs ? body.newsUIDs : [],
    memberUIDs: body.memberUIDs ? body.memberUIDs : [],
    missionUIDs: body.missionUIDs ? body.missionUIDs : [],
    serviceUIDs: body.serviceUIDs ? body.serviceUIDs : [],
    serviceProviderUIDs: body.serviceProviderUIDs
      ? body.serviceProviderUIDs
      : [],
    locale,
  };
};

export default {
  applyFilters(ctx) {
    if (!ctx.request.query) {
      throw new ValidationError("Request query is required");
    }

    const query = ctx.request.query;

    return strapi
      .service<ExampleService>("api::filters.filters")
      .applyFilters(parseApplyFiltersBody(ctx), query.populate);
  },
  getFilters(ctx) {
    return strapi
      .service<ExampleService>("api::filters.filters")
      .getFilters(parseGetFiltersBody(ctx));
  },
};
