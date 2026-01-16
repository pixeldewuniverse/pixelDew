import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'scalev/2.0.0 (api/6.1.3)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Creates a new bundle with the provided data.
   *
   * @summary Create a new bundle
   * @throws FetchError<400, types.ScalevApiWebBundleControllerCreateResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerCreateResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerCreateResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerCreateResponse404> Not Found
   */
  scalevApiWebBundleControllerCreate(body: types.ScalevApiWebBundleControllerCreateBodyParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerCreateResponse200>> {
    return this.core.fetch('/v2/bundles', 'post', body);
  }

  /**
   * Retrieves a paginated list of bundles with optional filtering. The data is sorted by id
   * in descending order and cannot be changed. Uses cursor-based pagination with default
   * page size of 25 and maximum of 25.
   *
   * @summary List bundles
   * @throws FetchError<400, types.ScalevApiWebBundleControllerIndexResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerIndexResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerIndexResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerIndexResponse404> Not Found
   */
  scalevApiWebBundleControllerIndex(metadata?: types.ScalevApiWebBundleControllerIndexMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerIndexResponse200>> {
    return this.core.fetch('/v2/bundles', 'get', metadata);
  }

  /**
   * Retrieves the total count of bundles for the authenticated business. This endpoint does
   * not support any filtering or pagination.
   *
   * @summary Count bundles
   * @throws FetchError<400, types.ScalevApiWebBundleControllerShowCountResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerShowCountResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerShowCountResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerShowCountResponse404> Not Found
   */
  scalevApiWebBundleControllerShow_count(metadata?: types.ScalevApiWebBundleControllerShowCountMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerShowCountResponse200>> {
    return this.core.fetch('/v2/bundles/count', 'get', metadata);
  }

  /**
   * Retrieves a paginated list of bundles with optional filtering. The data is sorted by id
   * in descending order and cannot be changed. Uses cursor-based pagination with default
   * page size of 25 and maximum of 25. This endpoint returns a simplified version of the
   * bundle data, including only essential fields and active bundle price options.
   *
   * @summary List bundles (simplified)
   * @throws FetchError<400, types.ScalevApiWebBundleControllerIndexSimplifiedResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerIndexSimplifiedResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerIndexSimplifiedResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerIndexSimplifiedResponse404> Not Found
   */
  scalevApiWebBundleControllerIndex_simplified(metadata?: types.ScalevApiWebBundleControllerIndexSimplifiedMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerIndexSimplifiedResponse200>> {
    return this.core.fetch('/v2/bundles/simplified', 'get', metadata);
  }

  /**
   * Creates a new bundle price option associated with a specific bundle using the provided
   * data.
   *
   * @summary Create a new bundle price option for a bundle
   * @throws FetchError<400, types.ScalevApiWebBundleControllerCreateBpoResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerCreateBpoResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerCreateBpoResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerCreateBpoResponse404> Not Found
   */
  scalevApiWebBundleControllerCreate_bpo(body: types.ScalevApiWebBundleControllerCreateBpoBodyParam, metadata: types.ScalevApiWebBundleControllerCreateBpoMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerCreateBpoResponse200>> {
    return this.core.fetch('/v2/bundles/{bundle_id}/bpos', 'post', body, metadata);
  }

  /**
   * Retrieves a paginated list of bundle price options associated with a specific bundle.
   * The data is sorted by id in descending order and cannot be changed. Uses cursor-based
   * pagination with default page size of 25 and maximum of 25.
   *
   * @summary List bundle price options for a bundle
   * @throws FetchError<400, types.ScalevApiWebBundleControllerIndexBpoResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerIndexBpoResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerIndexBpoResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerIndexBpoResponse404> Not Found
   */
  scalevApiWebBundleControllerIndex_bpo(metadata: types.ScalevApiWebBundleControllerIndexBpoMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerIndexBpoResponse200>> {
    return this.core.fetch('/v2/bundles/{bundle_id}/bpos', 'get', metadata);
  }

  /**
   * Updates an existing bundle price option associated with a specific bundle using the
   * provided data.
   *
   * @summary Update a bundle price option for a bundle
   * @throws FetchError<400, types.ScalevApiWebBundleControllerUpdateBpoResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerUpdateBpoResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerUpdateBpoResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerUpdateBpoResponse404> Not Found
   */
  scalevApiWebBundleControllerUpdate_bpo(body: types.ScalevApiWebBundleControllerUpdateBpoBodyParam, metadata: types.ScalevApiWebBundleControllerUpdateBpoMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerUpdateBpoResponse200>> {
    return this.core.fetch('/v2/bundles/{bundle_id}/bpos/{id}', 'patch', body, metadata);
  }

  /**
   * Deletes a bundle price option associated with a specific bundle by its ID.
   *
   * @summary Delete a bundle price option from a bundle
   * @throws FetchError<400, types.ScalevApiWebBundleControllerDeleteBpoResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerDeleteBpoResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerDeleteBpoResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerDeleteBpoResponse404> Not Found
   */
  scalevApiWebBundleControllerDelete_bpo(metadata: types.ScalevApiWebBundleControllerDeleteBpoMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerDeleteBpoResponse200>> {
    return this.core.fetch('/v2/bundles/{bundle_id}/bpos/{id}', 'delete', metadata);
  }

  /**
   * Retrieves a bundle price option along with its related entities such as associated
   * stores and form displays.
   *
   * @summary Show bundle price option relations
   * @throws FetchError<400, types.ScalevApiWebBundleControllerShowBpoRelationsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerShowBpoRelationsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerShowBpoRelationsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerShowBpoRelationsResponse404> Not Found
   */
  scalevApiWebBundleControllerShow_bpo_relations(metadata: types.ScalevApiWebBundleControllerShowBpoRelationsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerShowBpoRelationsResponse200>> {
    return this.core.fetch('/v2/bundles/{bundle_id}/bpos/{id}/relations', 'get', metadata);
  }

  /**
   * Create a follow up chat template for a bundle.
   *
   * @summary Create a follow up chat template
   * @throws FetchError<400, types.ScalevApiWebBundleControllerCreateFucResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerCreateFucResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerCreateFucResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerCreateFucResponse404> Not Found
   */
  scalevApiWebBundleControllerCreate_fuc(body: types.ScalevApiWebBundleControllerCreateFucBodyParam, metadata: types.ScalevApiWebBundleControllerCreateFucMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerCreateFucResponse200>> {
    return this.core.fetch('/v2/bundles/{bundle_id}/follow-up-chats', 'post', body, metadata);
  }

  /**
   * Retrieves a paginated list of follow up chats for a bundle.
   *
   * @summary List follow up chats
   * @throws FetchError<400, types.ScalevApiWebBundleControllerIndexFucsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerIndexFucsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerIndexFucsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerIndexFucsResponse404> Not Found
   */
  scalevApiWebBundleControllerIndex_fucs(metadata: types.ScalevApiWebBundleControllerIndexFucsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerIndexFucsResponse200>> {
    return this.core.fetch('/v2/bundles/{bundle_id}/follow-up-chats', 'get', metadata);
  }

  /**
   * Generates a new follow up chat for a bundle.
   *
   * @summary Generate a follow up chat
   * @throws FetchError<400, types.ScalevApiWebBundleControllerGenerateFucResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerGenerateFucResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerGenerateFucResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerGenerateFucResponse404> Not Found
   */
  scalevApiWebBundleControllerGenerate_fuc(metadata: types.ScalevApiWebBundleControllerGenerateFucMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerGenerateFucResponse200>> {
    return this.core.fetch('/v2/bundles/{bundle_id}/follow-up-chats/generate', 'post', metadata);
  }

  /**
   * Retrieves a follow up chat template by its ID.
   *
   * @summary Show a follow up chat template
   * @throws FetchError<400, types.ScalevApiWebBundleControllerShowFucResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerShowFucResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerShowFucResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerShowFucResponse404> Not Found
   */
  scalevApiWebBundleControllerShow_fuc(metadata: types.ScalevApiWebBundleControllerShowFucMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerShowFucResponse200>> {
    return this.core.fetch('/v2/bundles/{bundle_id}/follow-up-chats/{id}', 'get', metadata);
  }

  /**
   * Updates a follow up chat template.
   *
   * @summary Update a follow up chat template
   * @throws FetchError<400, types.ScalevApiWebBundleControllerUpdateFucResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerUpdateFucResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerUpdateFucResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerUpdateFucResponse404> Not Found
   */
  scalevApiWebBundleControllerUpdate_fuc(body: types.ScalevApiWebBundleControllerUpdateFucBodyParam, metadata: types.ScalevApiWebBundleControllerUpdateFucMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerUpdateFucResponse200>> {
    return this.core.fetch('/v2/bundles/{bundle_id}/follow-up-chats/{id}', 'patch', body, metadata);
  }

  /**
   * Deletes a follow up chat template.
   *
   * @summary Delete a follow up chat template
   * @throws FetchError<400, types.ScalevApiWebBundleControllerDeleteFucResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerDeleteFucResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerDeleteFucResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerDeleteFucResponse404> Not Found
   */
  scalevApiWebBundleControllerDelete_fuc(metadata: types.ScalevApiWebBundleControllerDeleteFucMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerDeleteFucResponse200>> {
    return this.core.fetch('/v2/bundles/{bundle_id}/follow-up-chats/{id}', 'delete', metadata);
  }

  /**
   * Associates a partner with a specific bundle using the provided unique identifier.
   *
   * @summary Add a partner to a bundle
   * @throws FetchError<400, types.ScalevApiWebBundleControllerCreatePartnerResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerCreatePartnerResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerCreatePartnerResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerCreatePartnerResponse404> Not Found
   */
  scalevApiWebBundleControllerCreate_partner(body: types.ScalevApiWebBundleControllerCreatePartnerBodyParam, metadata: types.ScalevApiWebBundleControllerCreatePartnerMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerCreatePartnerResponse200>> {
    return this.core.fetch('/v2/bundles/{bundle_id}/partners', 'post', body, metadata);
  }

  /**
   * Retrieves a paginated list of partners associated with a specific bundle. The data is
   * sorted by id in descending order and cannot be changed. Uses cursor-based pagination
   * with default page size of 25 and maximum of 25.
   *
   * @summary List partners for a bundle
   * @throws FetchError<400, types.ScalevApiWebBundleControllerIndexPartnersResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerIndexPartnersResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerIndexPartnersResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerIndexPartnersResponse404> Not Found
   */
  scalevApiWebBundleControllerIndex_partners(metadata: types.ScalevApiWebBundleControllerIndexPartnersMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerIndexPartnersResponse200>> {
    return this.core.fetch('/v2/bundles/{bundle_id}/partners', 'get', metadata);
  }

  /**
   * Dissociates a partner from a specific bundle by its ID.
   *
   * @summary Remove a partner from a bundle
   * @throws FetchError<400, types.ScalevApiWebBundleControllerDeletePartnerResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerDeletePartnerResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerDeletePartnerResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerDeletePartnerResponse404> Not Found
   */
  scalevApiWebBundleControllerDelete_partner(metadata: types.ScalevApiWebBundleControllerDeletePartnerMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerDeletePartnerResponse200>> {
    return this.core.fetch('/v2/bundles/{bundle_id}/partners/{id}', 'delete', metadata);
  }

  /**
   * Retrieves a bundle along with its related entities such as active bundle price options
   * and their associated stores and form displays.
   *
   * @summary Show bundle relations
   * @throws FetchError<400, types.ScalevApiWebBundleControllerShowRelationsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerShowRelationsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerShowRelationsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerShowRelationsResponse404> Not Found
   */
  scalevApiWebBundleControllerShow_relations(metadata: types.ScalevApiWebBundleControllerShowRelationsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerShowRelationsResponse200>> {
    return this.core.fetch('/v2/bundles/{bundle_id}/relations', 'get', metadata);
  }

  /**
   * Updates the sharing setting of an existing bundle.
   *
   * @summary Update bundle sharing setting
   * @throws FetchError<400, types.ScalevApiWebBundleControllerUpdateSharingResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerUpdateSharingResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerUpdateSharingResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerUpdateSharingResponse404> Not Found
   */
  scalevApiWebBundleControllerUpdate_sharing(body: types.ScalevApiWebBundleControllerUpdateSharingBodyParam, metadata: types.ScalevApiWebBundleControllerUpdateSharingMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerUpdateSharingResponse200>> {
    return this.core.fetch('/v2/bundles/{bundle_id}/sharing', 'patch', body, metadata);
  }

  /**
   * Retrieves a bundle by its ID.
   *
   * @summary Show bundle
   * @throws FetchError<400, types.ScalevApiWebBundleControllerShowResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerShowResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerShowResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerShowResponse404> Not Found
   */
  scalevApiWebBundleControllerShow(metadata: types.ScalevApiWebBundleControllerShowMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerShowResponse200>> {
    return this.core.fetch('/v2/bundles/{id}', 'get', metadata);
  }

  /**
   * Updates an existing bundle with the provided data.
   *
   * @summary Update a bundle
   * @throws FetchError<400, types.ScalevApiWebBundleControllerUpdateResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerUpdateResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerUpdateResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerUpdateResponse404> Not Found
   */
  scalevApiWebBundleControllerUpdate(body: types.ScalevApiWebBundleControllerUpdateBodyParam, metadata: types.ScalevApiWebBundleControllerUpdateMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerUpdateResponse200>>;
  scalevApiWebBundleControllerUpdate(metadata: types.ScalevApiWebBundleControllerUpdateMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerUpdateResponse200>>;
  scalevApiWebBundleControllerUpdate(body?: types.ScalevApiWebBundleControllerUpdateBodyParam | types.ScalevApiWebBundleControllerUpdateMetadataParam, metadata?: types.ScalevApiWebBundleControllerUpdateMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerUpdateResponse200>> {
    return this.core.fetch('/v2/bundles/{id}', 'patch', body, metadata);
  }

  /**
   * Deletes a bundle by its ID.
   *
   * @summary Delete a bundle
   * @throws FetchError<400, types.ScalevApiWebBundleControllerDeleteResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBundleControllerDeleteResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBundleControllerDeleteResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBundleControllerDeleteResponse404> Not Found
   */
  scalevApiWebBundleControllerDelete(metadata: types.ScalevApiWebBundleControllerDeleteMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebBundleControllerDeleteResponse200>> {
    return this.core.fetch('/v2/bundles/{id}', 'delete', metadata);
  }

  /**
   * Fetches the list of enabled e-payment methods for a specified business.
   *
   * @summary Get enabled e-payments for a business
   * @throws FetchError<400, types.ScalevApiWebBusinessGlobalControllerGetEnabledPayments2Response400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBusinessGlobalControllerGetEnabledPayments2Response401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBusinessGlobalControllerGetEnabledPayments2Response403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBusinessGlobalControllerGetEnabledPayments2Response404> Not Found
   */
  scalevApiWebBusinessGlobalControllerGet_enabled_payments2(): Promise<FetchResponse<200, types.ScalevApiWebBusinessGlobalControllerGetEnabledPayments2Response200>> {
    return this.core.fetch('/v2/businesses/enabled-epayments', 'get');
  }

  /**
   * Fetches the list of enabled e-payment methods for a specified business.
   *
   * @summary Get enabled e-payments for a business
   * @throws FetchError<400, types.ScalevApiWebBusinessGlobalControllerGetEnabledPaymentsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebBusinessGlobalControllerGetEnabledPaymentsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebBusinessGlobalControllerGetEnabledPaymentsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebBusinessGlobalControllerGetEnabledPaymentsResponse404> Not Found
   */
  scalevApiWebBusinessGlobalControllerGet_enabled_payments(): Promise<FetchResponse<200, types.ScalevApiWebBusinessGlobalControllerGetEnabledPaymentsResponse200>> {
    return this.core.fetch('/v2/businesses/enabled-payments', 'get');
  }

  /**
   * Retrieve information about the business associated with the authenticated user.
   *
   * @summary Get business information
   * @throws FetchError<400, types.ScalevApiWebCoreBusinessControllerShowResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebCoreBusinessControllerShowResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebCoreBusinessControllerShowResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebCoreBusinessControllerShowResponse404> Not Found
   */
  scalevApiWebCoreBusinessControllerShow(): Promise<FetchResponse<200, types.ScalevApiWebCoreBusinessControllerShowResponse200>> {
    return this.core.fetch('/v2/businesses/me', 'get');
  }

  /**
   * Retrieve a list of locations with search and pagination.
   *
   * @summary List Locations
   * @throws FetchError<400, types.ScalevApiWebLocationControllerIndexLocationsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebLocationControllerIndexLocationsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebLocationControllerIndexLocationsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebLocationControllerIndexLocationsResponse404> Not Found
   */
  scalevApiWebLocationControllerIndex_locations(metadata?: types.ScalevApiWebLocationControllerIndexLocationsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebLocationControllerIndexLocationsResponse200>> {
    return this.core.fetch('/v2/locations', 'get', metadata);
  }

  /**
   * Create a new order with the provided details.
   *
   * @summary Create a new order
   * @throws FetchError<400, types.ScalevApiWebOrderControllerCreateResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderControllerCreateResponse401> Unauthorized
   */
  scalevApiWebOrderControllerCreate(body: types.ScalevApiWebOrderControllerCreateBodyParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerCreateResponse200>> {
    return this.core.fetch('/v2/order', 'post', body);
  }

  /**
   * Retrieves a paginated list of orders with optional filtering. The data is sorted by
   * created_at in descending order and cannot be changed. Uses cursor-based pagination with
   * default page size of 25 and maximum of 25.
   *
   * @summary List orders with pagination
   * @throws FetchError<400, types.ScalevApiWebOrderViewControllerIndexResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerIndexResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderViewControllerIndexResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderViewControllerIndexResponse404> Not Found
   */
  scalevApiWebOrderViewControllerIndex(metadata?: types.ScalevApiWebOrderViewControllerIndexMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerIndexResponse200>> {
    return this.core.fetch('/v2/order', 'get', metadata);
  }

  /**
   * Cancel Air Waybill for multiple orders.
   *
   * @summary Cancel AWB for orders
   * @throws FetchError<400, types.ScalevApiWebOrderControllerCancelAwbResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderControllerCancelAwbResponse401> Unauthorized
   */
  scalevApiWebOrderControllerCancel_awb(body: types.ScalevApiWebOrderControllerCancelAwbBodyParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerCancelAwbResponse200>> {
    return this.core.fetch('/v2/order/cancel-awb', 'post', body);
  }

  /**
   * Change the status of multiple orders.
   *
   * @summary Change order status
   * @throws FetchError<400, types.ScalevApiWebOrderControllerChangeStatusResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderControllerChangeStatusResponse401> Unauthorized
   */
  scalevApiWebOrderControllerChange_status(body?: types.ScalevApiWebOrderControllerChangeStatusBodyParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerChangeStatusResponse200>> {
    return this.core.fetch('/v2/order/change-status', 'post', body);
  }

  /**
   * Delete multiple orders by IDs.
   *
   * @summary Delete orders
   * @throws FetchError<400, types.ScalevApiWebOrderControllerDeleteResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderControllerDeleteResponse401> Unauthorized
   */
  scalevApiWebOrderControllerDelete(body: types.ScalevApiWebOrderControllerDeleteBodyParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerDeleteResponse200>> {
    return this.core.fetch('/v2/order/delete', 'post', body);
  }

  /**
   * Generate Air Waybill for multiple orders.
   *
   * @summary Generate AWB for orders
   * @throws FetchError<400, types.ScalevApiWebOrderControllerGenerateAwbResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderControllerGenerateAwbResponse401> Unauthorized
   */
  scalevApiWebOrderControllerGenerate_awb(body: types.ScalevApiWebOrderControllerGenerateAwbBodyParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerGenerateAwbResponse200>> {
    return this.core.fetch('/v2/order/generate-awb', 'post', body);
  }

  /**
   * Mark multiple orders as not spam.
   *
   * @summary Mark orders as not spam
   * @throws FetchError<400, types.ScalevApiWebOrderControllerMarkNotSpamResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderControllerMarkNotSpamResponse401> Unauthorized
   */
  scalevApiWebOrderControllerMark_not_spam(body: types.ScalevApiWebOrderControllerMarkNotSpamBodyParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerMarkNotSpamResponse200>> {
    return this.core.fetch('/v2/order/mark-not-spam', 'post', body);
  }

  /**
   * Retrieve order details using payment gateway reference ID.
   *
   * @summary Get order by payment gateway reference ID
   * @throws FetchError<400, types.ScalevApiWebOrderViewControllerShowByPgReferenceIdResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerShowByPgReferenceIdResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderViewControllerShowByPgReferenceIdResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderViewControllerShowByPgReferenceIdResponse404> Not Found
   */
  scalevApiWebOrderViewControllerShow_by_pg_reference_id(metadata: types.ScalevApiWebOrderViewControllerShowByPgReferenceIdMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerShowByPgReferenceIdResponse200>> {
    return this.core.fetch('/v2/order/pg-reference-id/{pg_reference_id}', 'get', metadata);
  }

  /**
   * Retrieve orders using multiple payment gateway reference IDs.
   *
   * @summary Get orders by multiple payment gateway reference IDs
   * @throws FetchError<400, types.ScalevApiWebOrderViewControllerShowByPgReferenceIdsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerShowByPgReferenceIdsResponse401> Unauthorized
   */
  scalevApiWebOrderViewControllerShow_by_pg_reference_ids(metadata: types.ScalevApiWebOrderViewControllerShowByPgReferenceIdsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerShowByPgReferenceIdsResponse200>> {
    return this.core.fetch('/v2/order/pg-reference-ids', 'get', metadata);
  }

  /**
   * Retrieves descriptive statistics about orders, such as total orders, total revenue, and
   * other aggregated data. Can be filtered using the same parameters as the orders list
   * endpoint.
   *
   * @summary Get order statistics
   * @throws FetchError<400, types.ScalevApiWebOrderViewControllerIndexStatisticsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerIndexStatisticsResponse401> Unauthorized
   */
  scalevApiWebOrderViewControllerIndex_statistics(metadata?: types.ScalevApiWebOrderViewControllerIndexStatisticsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerIndexStatisticsResponse200>> {
    return this.core.fetch('/v2/order/statistics', 'get', metadata);
  }

  /**
   * Retrieve a list of tags associated with orders.
   *
   * @summary List order tags
   * @throws FetchError<400, types.ScalevApiWebOrderViewControllerIndexTagsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerIndexTagsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderViewControllerIndexTagsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderViewControllerIndexTagsResponse404> Not Found
   */
  scalevApiWebOrderViewControllerIndex_tags(metadata?: types.ScalevApiWebOrderViewControllerIndexTagsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerIndexTagsResponse200>> {
    return this.core.fetch('/v2/order/tags', 'get', metadata);
  }

  /**
   * Upload orders from CSV file. (1) Archive mode. Choose this mode if you want to import
   * old data from another platform you've been using. You can directly create products that
   * you made on your previous platform. Orders that are created will immediately have
   * 'Completed' status. Download template for Archive mode here:
   * https://app.scalev.id/example/template_archive.csv. (2) Regular mode. Choose this mode
   * if you want to enter current data that you wish to input in bulk, not one by one via
   * order input. It will take inventory into account if your products have inventory
   * enabled. Successfully created orders will have 'Created', 'Pending', or 'Confirmed'
   * status, depending on the completeness of the data. Download template for Regular mode
   * here: https://app.scalev.id/example/template_regular.csv.
   *
   * @summary Upload orders from CSV file
   * @throws FetchError<400, types.ScalevApiWebOrderControllerUploadOrdersResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderControllerUploadOrdersResponse401> Unauthorized
   */
  scalevApiWebOrderControllerUpload_orders(body: types.ScalevApiWebOrderControllerUploadOrdersBodyParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerUploadOrdersResponse200>> {
    return this.core.fetch('/v2/order/upload', 'post', body);
  }

  /**
   * Upload a CSV file to change status of multiple orders. Template file can be downloaded
   * from the link here: https://app.scalev.id/example/update_status_template.csv. (1) Leave
   * blank the 'shipment_receipt' field if you don't want to change the receipt/tracking
   * number. Note: this will not change receipts/tracking numbers that are automatically
   * generated by Scalev through the 'Request Pickup' menu. (2) Leave blank the 'day',
   * 'month', and 'year' fields if you want to use the time of upload.
   *
   * @summary Upload CSV to change order status
   * @throws FetchError<400, types.ScalevApiWebOrderControllerUploadChangeStatusResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderControllerUploadChangeStatusResponse401> Unauthorized
   */
  scalevApiWebOrderControllerUpload_change_status(body: types.ScalevApiWebOrderControllerUploadChangeStatusBodyParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerUploadChangeStatusResponse200>> {
    return this.core.fetch('/v2/order/upload-change-status', 'post', body);
  }

  /**
   * Upload file to update shipment receipts (tracking IDs) for multiple orders. Template
   * file can be downloaded from the link here:
   * https://app.scalev.id/example/receipt_template.csv.
   *
   * @summary Upload CSV to update shipment receipts
   * @throws FetchError<400, types.ScalevApiWebOrderControllerUploadReceiptResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderControllerUploadReceiptResponse401> Unauthorized
   */
  scalevApiWebOrderControllerUpload_receipt(body: types.ScalevApiWebOrderControllerUploadReceiptBodyParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerUploadReceiptResponse200>> {
    return this.core.fetch('/v2/order/upload-receipt', 'post', body);
  }

  /**
   * Retrieve a list of unique UTM campaign values from orders.
   *
   * @summary List unique UTM campaigns
   * @throws FetchError<400, types.ScalevApiWebOrderViewControllerIndexUtmCampaignsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerIndexUtmCampaignsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderViewControllerIndexUtmCampaignsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderViewControllerIndexUtmCampaignsResponse404> Not Found
   */
  scalevApiWebOrderViewControllerIndex_utm_campaigns(metadata?: types.ScalevApiWebOrderViewControllerIndexUtmCampaignsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerIndexUtmCampaignsResponse200>> {
    return this.core.fetch('/v2/order/utm-campaigns', 'get', metadata);
  }

  /**
   * Retrieve a list of unique UTM content values from orders.
   *
   * @summary List unique UTM contents
   * @throws FetchError<400, types.ScalevApiWebOrderViewControllerIndexUtmContentsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerIndexUtmContentsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderViewControllerIndexUtmContentsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderViewControllerIndexUtmContentsResponse404> Not Found
   */
  scalevApiWebOrderViewControllerIndex_utm_contents(metadata?: types.ScalevApiWebOrderViewControllerIndexUtmContentsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerIndexUtmContentsResponse200>> {
    return this.core.fetch('/v2/order/utm-contents', 'get', metadata);
  }

  /**
   * Retrieve a list of unique UTM medium values from orders.
   *
   * @summary List unique UTM mediums
   * @throws FetchError<400, types.ScalevApiWebOrderViewControllerIndexUtmMediumsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerIndexUtmMediumsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderViewControllerIndexUtmMediumsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderViewControllerIndexUtmMediumsResponse404> Not Found
   */
  scalevApiWebOrderViewControllerIndex_utm_mediums(metadata?: types.ScalevApiWebOrderViewControllerIndexUtmMediumsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerIndexUtmMediumsResponse200>> {
    return this.core.fetch('/v2/order/utm-mediums', 'get', metadata);
  }

  /**
   * Retrieve a list of unique UTM source values from orders.
   *
   * @summary List unique UTM sources
   * @throws FetchError<400, types.ScalevApiWebOrderViewControllerIndexUtmSourcesResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerIndexUtmSourcesResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderViewControllerIndexUtmSourcesResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderViewControllerIndexUtmSourcesResponse404> Not Found
   */
  scalevApiWebOrderViewControllerIndex_utm_sources(metadata?: types.ScalevApiWebOrderViewControllerIndexUtmSourcesMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerIndexUtmSourcesResponse200>> {
    return this.core.fetch('/v2/order/utm-sources', 'get', metadata);
  }

  /**
   * Retrieve a list of unique UTM term values from orders.
   *
   * @summary List unique UTM terms
   * @throws FetchError<400, types.ScalevApiWebOrderViewControllerIndexUtmTermsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerIndexUtmTermsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderViewControllerIndexUtmTermsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderViewControllerIndexUtmTermsResponse404> Not Found
   */
  scalevApiWebOrderViewControllerIndex_utm_terms(metadata?: types.ScalevApiWebOrderViewControllerIndexUtmTermsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerIndexUtmTermsResponse200>> {
    return this.core.fetch('/v2/order/utm-terms', 'get', metadata);
  }

  /**
   * Retrieve detailed information about a specific order.
   *
   * @summary Get order details
   * @throws FetchError<400, types.ScalevApiWebOrderViewControllerShowResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerShowResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderViewControllerShowResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderViewControllerShowResponse404> Not Found
   */
  scalevApiWebOrderViewControllerShow(metadata: types.ScalevApiWebOrderViewControllerShowMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerShowResponse200>> {
    return this.core.fetch('/v2/order/{id}', 'get', metadata);
  }

  /**
   * Update order details by ID.
   *
   * @summary Update an existing order
   * @throws FetchError<400, types.ScalevApiWebOrderControllerUpdateResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderControllerUpdateResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderControllerUpdateResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderControllerUpdateResponse404> Not Found
   */
  scalevApiWebOrderControllerUpdate(body: types.ScalevApiWebOrderControllerUpdateBodyParam, metadata: types.ScalevApiWebOrderControllerUpdateMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerUpdateResponse200>>;
  scalevApiWebOrderControllerUpdate(metadata: types.ScalevApiWebOrderControllerUpdateMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerUpdateResponse200>>;
  scalevApiWebOrderControllerUpdate(body?: types.ScalevApiWebOrderControllerUpdateBodyParam | types.ScalevApiWebOrderControllerUpdateMetadataParam, metadata?: types.ScalevApiWebOrderControllerUpdateMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerUpdateResponse200>> {
    return this.core.fetch('/v2/order/{id}', 'patch', body, metadata);
  }

  /**
   * Retrieve flags to determine available actions for an order.
   *
   * @summary Get available actions for order
   * @throws FetchError<400, types.ScalevApiWebOrderViewControllerGetAvailableActionsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerGetAvailableActionsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderViewControllerGetAvailableActionsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderViewControllerGetAvailableActionsResponse404> Not Found
   */
  scalevApiWebOrderViewControllerGet_available_actions(metadata: types.ScalevApiWebOrderViewControllerGetAvailableActionsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerGetAvailableActionsResponse200>> {
    return this.core.fetch('/v2/order/{id}/actions', 'get', metadata);
  }

  /**
   * Retrieve a specific chat text message.
   *
   * @summary Get specific chat text
   * @throws FetchError<400, types.ScalevApiWebOrderViewControllerGetOneChatTextResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerGetOneChatTextResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderViewControllerGetOneChatTextResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderViewControllerGetOneChatTextResponse404> Not Found
   */
  scalevApiWebOrderViewControllerGet_one_chat_text(metadata: types.ScalevApiWebOrderViewControllerGetOneChatTextMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerGetOneChatTextResponse200>> {
    return this.core.fetch('/v2/order/{id}/chat/{chat_id}', 'get', metadata);
  }

  /**
   * Retrieve chat text messages associated with an order.
   *
   * @summary Get chat text for order
   * @throws FetchError<400, types.ScalevApiWebOrderViewControllerGetChatTextResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerGetChatTextResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderViewControllerGetChatTextResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderViewControllerGetChatTextResponse404> Not Found
   */
  scalevApiWebOrderViewControllerGet_chat_text(metadata: types.ScalevApiWebOrderViewControllerGetChatTextMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerGetChatTextResponse200>> {
    return this.core.fetch('/v2/order/{id}/chats', 'get', metadata);
  }

  /**
   * Check the payment status of an order.
   *
   * @summary Check order payment status
   * @throws FetchError<400, types.ScalevApiWebOrderViewControllerCheckOrderPaymentResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerCheckOrderPaymentResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderViewControllerCheckOrderPaymentResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderViewControllerCheckOrderPaymentResponse404> Not Found
   */
  scalevApiWebOrderViewControllerCheck_order_payment(metadata: types.ScalevApiWebOrderViewControllerCheckOrderPaymentMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerCheckOrderPaymentResponse200>> {
    return this.core.fetch('/v2/order/{id}/check-payment', 'post', metadata);
  }

  /**
   * Check the settlement status of an order.
   *
   * @summary Check order settlement status
   * @throws FetchError<400, types.ScalevApiWebOrderViewControllerCheckOrderSettlementResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerCheckOrderSettlementResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderViewControllerCheckOrderSettlementResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderViewControllerCheckOrderSettlementResponse404> Not Found
   */
  scalevApiWebOrderViewControllerCheck_order_settlement(metadata: types.ScalevApiWebOrderViewControllerCheckOrderSettlementMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerCheckOrderSettlementResponse200>> {
    return this.core.fetch('/v2/order/{id}/check-settlement', 'post', metadata);
  }

  /**
   * Update the customer associated with an order.
   *
   * @summary Update order customer
   * @throws FetchError<400, types.ScalevApiWebOrderControllerUpdateCustomerResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderControllerUpdateCustomerResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderControllerUpdateCustomerResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderControllerUpdateCustomerResponse404> Not Found
   */
  scalevApiWebOrderControllerUpdate_customer(body: types.ScalevApiWebOrderControllerUpdateCustomerBodyParam, metadata: types.ScalevApiWebOrderControllerUpdateCustomerMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerUpdateCustomerResponse200>> {
    return this.core.fetch('/v2/order/{id}/customer', 'patch', body, metadata);
  }

  /**
   * Create a duplicate of an order and cancel the original.
   *
   * @summary Duplicate and cancel order
   * @throws FetchError<400, types.ScalevApiWebOrderControllerDuplicateAndCancelResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderControllerDuplicateAndCancelResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderControllerDuplicateAndCancelResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderControllerDuplicateAndCancelResponse404> Not Found
   */
  scalevApiWebOrderControllerDuplicate_and_cancel(body: types.ScalevApiWebOrderControllerDuplicateAndCancelBodyParam, metadata: types.ScalevApiWebOrderControllerDuplicateAndCancelMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerDuplicateAndCancelResponse200>>;
  scalevApiWebOrderControllerDuplicate_and_cancel(metadata: types.ScalevApiWebOrderControllerDuplicateAndCancelMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerDuplicateAndCancelResponse200>>;
  scalevApiWebOrderControllerDuplicate_and_cancel(body?: types.ScalevApiWebOrderControllerDuplicateAndCancelBodyParam | types.ScalevApiWebOrderControllerDuplicateAndCancelMetadataParam, metadata?: types.ScalevApiWebOrderControllerDuplicateAndCancelMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerDuplicateAndCancelResponse200>> {
    return this.core.fetch('/v2/order/{id}/duplicate', 'post', body, metadata);
  }

  /**
   * Get list of emails sent for an order.
   *
   * @summary List order emails
   * @throws FetchError<400, types.ScalevApiWebOrderViewControllerIndexOrderEmailsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerIndexOrderEmailsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderViewControllerIndexOrderEmailsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderViewControllerIndexOrderEmailsResponse404> Not Found
   */
  scalevApiWebOrderViewControllerIndex_order_emails(metadata: types.ScalevApiWebOrderViewControllerIndexOrderEmailsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerIndexOrderEmailsResponse200>> {
    return this.core.fetch('/v2/order/{id}/emails', 'get', metadata);
  }

  /**
   * Add a new message to order message history.
   *
   * @summary Add message to history
   * @throws FetchError<400, types.ScalevApiWebOrderControllerAddMessageHistoryResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderControllerAddMessageHistoryResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderControllerAddMessageHistoryResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderControllerAddMessageHistoryResponse404> Not Found
   */
  scalevApiWebOrderControllerAdd_message_history(body: types.ScalevApiWebOrderControllerAddMessageHistoryBodyParam, metadata: types.ScalevApiWebOrderControllerAddMessageHistoryMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerAddMessageHistoryResponse200>> {
    return this.core.fetch('/v2/order/{id}/message-history', 'post', body, metadata);
  }

  /**
   * Get message history for an order.
   *
   * @summary Show message history
   * @throws FetchError<400, types.ScalevApiWebOrderViewControllerShowMessageHistoryResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerShowMessageHistoryResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderViewControllerShowMessageHistoryResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderViewControllerShowMessageHistoryResponse404> Not Found
   */
  scalevApiWebOrderViewControllerShow_message_history(metadata: types.ScalevApiWebOrderViewControllerShowMessageHistoryMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerShowMessageHistoryResponse200>> {
    return this.core.fetch('/v2/order/{id}/message-history', 'get', metadata);
  }

  /**
   * Create a payment request / intent for an order.
   *
   * @summary Create payment for order
   * @throws FetchError<400, types.ScalevApiWebOrderControllerCreatePaymentResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderControllerCreatePaymentResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderControllerCreatePaymentResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderControllerCreatePaymentResponse404> Not Found
   */
  scalevApiWebOrderControllerCreate_payment(metadata: types.ScalevApiWebOrderControllerCreatePaymentMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerCreatePaymentResponse200>> {
    return this.core.fetch('/v2/order/{id}/payment', 'post', metadata);
  }

  /**
   * Send LMS access email to customer.
   *
   * @summary Send LMS access
   * @throws FetchError<400, types.ScalevApiWebOrderViewControllerSendLmsAccessResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerSendLmsAccessResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderViewControllerSendLmsAccessResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderViewControllerSendLmsAccessResponse404> Not Found
   */
  scalevApiWebOrderViewControllerSend_lms_access(metadata: types.ScalevApiWebOrderViewControllerSendLmsAccessMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerSendLmsAccessResponse200>> {
    return this.core.fetch('/v2/order/{id}/send-lms-access', 'post', metadata);
  }

  /**
   * Send email containing links to download digital products to customer.
   *
   * @summary Send digital product access
   * @throws FetchError<401, types.ScalevApiWebOrderViewControllerSendProductDigitalResponse401> Unauthorized
   * @throws FetchError<404, types.ScalevApiWebOrderViewControllerSendProductDigitalResponse404> Not Found
   */
  scalevApiWebOrderViewControllerSend_product_digital(metadata: types.ScalevApiWebOrderViewControllerSendProductDigitalMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderViewControllerSendProductDigitalResponse200>> {
    return this.core.fetch('/v2/order/{id}/send-product-digital', 'post', metadata);
  }

  /**
   * Update shipment-related data for an order.
   *
   * @summary Update shipment-related data
   * @throws FetchError<400, types.ScalevApiWebOrderControllerUpdateShipmentRawResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderControllerUpdateShipmentRawResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderControllerUpdateShipmentRawResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderControllerUpdateShipmentRawResponse404> Not Found
   */
  scalevApiWebOrderControllerUpdate_shipment_raw(body: types.ScalevApiWebOrderControllerUpdateShipmentRawBodyParam, metadata: types.ScalevApiWebOrderControllerUpdateShipmentRawMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerUpdateShipmentRawResponse200>>;
  scalevApiWebOrderControllerUpdate_shipment_raw(metadata: types.ScalevApiWebOrderControllerUpdateShipmentRawMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerUpdateShipmentRawResponse200>>;
  scalevApiWebOrderControllerUpdate_shipment_raw(body?: types.ScalevApiWebOrderControllerUpdateShipmentRawBodyParam | types.ScalevApiWebOrderControllerUpdateShipmentRawMetadataParam, metadata?: types.ScalevApiWebOrderControllerUpdateShipmentRawMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerUpdateShipmentRawResponse200>> {
    return this.core.fetch('/v2/order/{id}/shipment', 'patch', body, metadata);
  }

  /**
   * Update shipment receipt / tracking ID for an order.
   *
   * @summary Update shipment receipt information
   * @throws FetchError<400, types.ScalevApiWebOrderControllerUpdateReceiptResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderControllerUpdateReceiptResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderControllerUpdateReceiptResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderControllerUpdateReceiptResponse404> Not Found
   */
  scalevApiWebOrderControllerUpdate_receipt(body: types.ScalevApiWebOrderControllerUpdateReceiptBodyParam, metadata: types.ScalevApiWebOrderControllerUpdateReceiptMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerUpdateReceiptResponse200>> {
    return this.core.fetch('/v2/order/{id}/shipment-receipt', 'patch', body, metadata);
  }

  /**
   * Create a new shipment status history entry for an order.
   *
   * @summary Create shipment status history
   * @throws FetchError<400, types.ScalevApiWebOrderControllerCreateSshResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderControllerCreateSshResponse401> Unauthorized
   */
  scalevApiWebOrderControllerCreate_ssh(body: types.ScalevApiWebOrderControllerCreateSshBodyParam, metadata: types.ScalevApiWebOrderControllerCreateSshMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerCreateSshResponse200>> {
    return this.core.fetch('/v2/order/{id}/shipment-status-history', 'post', body, metadata);
  }

  /**
   * Trigger purchase event for analytics and tracking.
   *
   * @summary Trigger purchase event
   * @throws FetchError<400, types.ScalevApiWebOrderControllerTriggerPurchaseEventResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderControllerTriggerPurchaseEventResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderControllerTriggerPurchaseEventResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderControllerTriggerPurchaseEventResponse404> Not Found
   */
  scalevApiWebOrderControllerTrigger_purchase_event(metadata: types.ScalevApiWebOrderControllerTriggerPurchaseEventMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerTriggerPurchaseEventResponse200>> {
    return this.core.fetch('/v2/order/{id}/trigger-purchase', 'post', metadata);
  }

  /**
   * Update tags for an order.
   *
   * @summary Update order tags
   * @throws FetchError<400, types.ScalevApiWebOrderControllerUpdateTagsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebOrderControllerUpdateTagsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebOrderControllerUpdateTagsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebOrderControllerUpdateTagsResponse404> Not Found
   */
  scalevApiWebOrderControllerUpdate_tags(body: types.ScalevApiWebOrderControllerUpdateTagsBodyParam, metadata: types.ScalevApiWebOrderControllerUpdateTagsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebOrderControllerUpdateTagsResponse200>> {
    return this.core.fetch('/v2/order/{id}/update-tags', 'post', body, metadata);
  }

  /**
   * Retrieves a paginated list of product taxonomies.
   *
   * @summary List product taxonomies
   * @throws FetchError<400, types.ScalevApiWebProductControllerIndexTaxonomiesResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerIndexTaxonomiesResponse401> Unauthorized
   */
  scalevApiWebProductControllerIndex_taxonomies(metadata?: types.ScalevApiWebProductControllerIndexTaxonomiesMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerIndexTaxonomiesResponse200>> {
    return this.core.fetch('/v2/product-taxonomies', 'get', metadata);
  }

  /**
   * Shows a single product taxonomy by ID.
   *
   * @summary Show a product taxonomy
   * @throws FetchError<400, types.ScalevApiWebProductControllerShowTaxonomyResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerShowTaxonomyResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebProductControllerShowTaxonomyResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebProductControllerShowTaxonomyResponse404> Not Found
   */
  scalevApiWebProductControllerShow_taxonomy(metadata: types.ScalevApiWebProductControllerShowTaxonomyMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerShowTaxonomyResponse200>> {
    return this.core.fetch('/v2/product-taxonomies/{id}', 'get', metadata);
  }

  /**
   * Creates a new product with the provided data.
   *
   * @summary Create a new product
   * @throws FetchError<400, types.ScalevApiWebProductControllerCreateResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerCreateResponse401> Unauthorized
   */
  scalevApiWebProductControllerCreate(body: types.ScalevApiWebProductControllerCreateBodyParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerCreateResponse200>> {
    return this.core.fetch('/v2/products', 'post', body);
  }

  /**
   * Retrieves a paginated list of products with optional filtering. The data is sorted by id
   * in descending order and cannot be changed. Uses cursor-based pagination with default
   * page size of 25 and maximum of 25.
   *
   * @summary List products
   * @throws FetchError<400, types.ScalevApiWebProductControllerIndexResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerIndexResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebProductControllerIndexResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebProductControllerIndexResponse404> Not Found
   */
  scalevApiWebProductControllerIndex(metadata?: types.ScalevApiWebProductControllerIndexMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerIndexResponse200>> {
    return this.core.fetch('/v2/products', 'get', metadata);
  }

  /**
   * Returns the total count of products.
   *
   * @summary Get total count of products
   * @throws FetchError<401, types.ScalevApiWebProductControllerShowCountResponse401> Unauthorized
   */
  scalevApiWebProductControllerShow_count(metadata?: types.ScalevApiWebProductControllerShowCountMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerShowCountResponse200>> {
    return this.core.fetch('/v2/products/count', 'get', metadata);
  }

  /**
   * Retrieves a simplified paginated list of products with optional filtering. The data is
   * sorted by id in descending order and cannot be changed. Uses cursor-based pagination
   * with default page size of 25 and maximum of 25.
   *
   * @summary Simplified list of products
   * @throws FetchError<400, types.ScalevApiWebProductControllerIndexSimplifiedResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerIndexSimplifiedResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebProductControllerIndexSimplifiedResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebProductControllerIndexSimplifiedResponse404> Not Found
   */
  scalevApiWebProductControllerIndex_simplified(metadata?: types.ScalevApiWebProductControllerIndexSimplifiedMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerIndexSimplifiedResponse200>> {
    return this.core.fetch('/v2/products/simplified', 'get', metadata);
  }

  /**
   * Retrieves the details of a single product, including its variants and other associated
   * data.
   *
   * @summary Get a single product by ID
   * @throws FetchError<400, types.ScalevApiWebProductControllerShowResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerShowResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebProductControllerShowResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebProductControllerShowResponse404> Not Found
   */
  scalevApiWebProductControllerShow(metadata: types.ScalevApiWebProductControllerShowMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerShowResponse200>> {
    return this.core.fetch('/v2/products/{id}', 'get', metadata);
  }

  /**
   * Updates the details of a product, including its variants.
   *
   * @summary Update a product
   * @throws FetchError<400, types.ScalevApiWebProductControllerUpdateResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerUpdateResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebProductControllerUpdateResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebProductControllerUpdateResponse404> Not Found
   */
  scalevApiWebProductControllerUpdate(body: types.ScalevApiWebProductControllerUpdateBodyParam, metadata: types.ScalevApiWebProductControllerUpdateMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerUpdateResponse200>> {
    return this.core.fetch('/v2/products/{id}', 'patch', body, metadata);
  }

  /**
   * Deletes a product and all its associated data.
   *
   * @summary Delete a product
   * @throws FetchError<400, types.ScalevApiWebProductControllerDeleteResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerDeleteResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebProductControllerDeleteResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebProductControllerDeleteResponse404> Not Found
   */
  scalevApiWebProductControllerDelete(metadata: types.ScalevApiWebProductControllerDeleteMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerDeleteResponse200>> {
    return this.core.fetch('/v2/products/{id}', 'delete', metadata);
  }

  /**
   * Create a follow up chat template for a product.
   *
   * @summary Create a follow up chat template
   * @throws FetchError<400, types.ScalevApiWebProductControllerCreateFucResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerCreateFucResponse401> Unauthorized
   */
  scalevApiWebProductControllerCreate_fuc(body: types.ScalevApiWebProductControllerCreateFucBodyParam, metadata: types.ScalevApiWebProductControllerCreateFucMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerCreateFucResponse200>> {
    return this.core.fetch('/v2/products/{product_id}/follow-up-chats', 'post', body, metadata);
  }

  /**
   * Retrieves a paginated list of follow up chats for a product.
   *
   * @summary List follow up chats
   * @throws FetchError<400, types.ScalevApiWebProductControllerIndexFucsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerIndexFucsResponse401> Unauthorized
   */
  scalevApiWebProductControllerIndex_fucs(metadata: types.ScalevApiWebProductControllerIndexFucsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerIndexFucsResponse200>> {
    return this.core.fetch('/v2/products/{product_id}/follow-up-chats', 'get', metadata);
  }

  /**
   * Generates a new follow up chat for a product.
   *
   * @summary Generate a follow up chat
   * @throws FetchError<400, types.ScalevApiWebProductControllerGenerateFucResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerGenerateFucResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebProductControllerGenerateFucResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebProductControllerGenerateFucResponse404> Not Found
   */
  scalevApiWebProductControllerGenerate_fuc(metadata: types.ScalevApiWebProductControllerGenerateFucMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerGenerateFucResponse200>> {
    return this.core.fetch('/v2/products/{product_id}/follow-up-chats/generate', 'post', metadata);
  }

  /**
   * Shows a single follow up chat template by ID.
   *
   * @summary Show a follow up chat template
   * @throws FetchError<400, types.ScalevApiWebProductControllerShowFucResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerShowFucResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebProductControllerShowFucResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebProductControllerShowFucResponse404> Not Found
   */
  scalevApiWebProductControllerShow_fuc(metadata: types.ScalevApiWebProductControllerShowFucMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerShowFucResponse200>> {
    return this.core.fetch('/v2/products/{product_id}/follow-up-chats/{id}', 'get', metadata);
  }

  /**
   * Updates a follow up chat template.
   *
   * @summary Update a follow up chat template
   * @throws FetchError<400, types.ScalevApiWebProductControllerUpdateFucResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerUpdateFucResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebProductControllerUpdateFucResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebProductControllerUpdateFucResponse404> Not Found
   */
  scalevApiWebProductControllerUpdate_fuc(body: types.ScalevApiWebProductControllerUpdateFucBodyParam, metadata: types.ScalevApiWebProductControllerUpdateFucMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerUpdateFucResponse200>> {
    return this.core.fetch('/v2/products/{product_id}/follow-up-chats/{id}', 'patch', body, metadata);
  }

  /**
   * Deletes a follow up chat template.
   *
   * @summary Delete a follow up chat template
   * @throws FetchError<400, types.ScalevApiWebProductControllerDeleteFucResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerDeleteFucResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebProductControllerDeleteFucResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebProductControllerDeleteFucResponse404> Not Found
   */
  scalevApiWebProductControllerDelete_fuc(metadata: types.ScalevApiWebProductControllerDeleteFucMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerDeleteFucResponse200>> {
    return this.core.fetch('/v2/products/{product_id}/follow-up-chats/{id}', 'delete', metadata);
  }

  /**
   * Creates a new product partner.
   *
   * @summary Create a product partner
   * @throws FetchError<400, types.ScalevApiWebProductControllerCreatePartnerResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerCreatePartnerResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebProductControllerCreatePartnerResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebProductControllerCreatePartnerResponse404> Not Found
   */
  scalevApiWebProductControllerCreate_partner(body: types.ScalevApiWebProductControllerCreatePartnerBodyParam, metadata: types.ScalevApiWebProductControllerCreatePartnerMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerCreatePartnerResponse200>> {
    return this.core.fetch('/v2/products/{product_id}/partners', 'post', body, metadata);
  }

  /**
   * Retrieves a paginated list of product partners.
   *
   * @summary List product partners
   * @throws FetchError<400, types.ScalevApiWebProductControllerIndexPartnersResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerIndexPartnersResponse401> Unauthorized
   */
  scalevApiWebProductControllerIndex_partners(metadata: types.ScalevApiWebProductControllerIndexPartnersMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerIndexPartnersResponse200>> {
    return this.core.fetch('/v2/products/{product_id}/partners', 'get', metadata);
  }

  /**
   * Deletes a product partner.
   *
   * @summary Delete a product partner
   * @throws FetchError<400, types.ScalevApiWebProductControllerDeletePartnerResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerDeletePartnerResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebProductControllerDeletePartnerResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebProductControllerDeletePartnerResponse404> Not Found
   */
  scalevApiWebProductControllerDelete_partner(metadata: types.ScalevApiWebProductControllerDeletePartnerMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerDeletePartnerResponse200>> {
    return this.core.fetch('/v2/products/{product_id}/partners/{id}', 'delete', metadata);
  }

  /**
   * Shows the relations of a product, including variants, stores, bundles, and pages.
   *
   * @summary Show product relations
   * @throws FetchError<400, types.ScalevApiWebProductControllerShowRelationsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerShowRelationsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebProductControllerShowRelationsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebProductControllerShowRelationsResponse404> Not Found
   */
  scalevApiWebProductControllerShow_relations(metadata: types.ScalevApiWebProductControllerShowRelationsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerShowRelationsResponse200>> {
    return this.core.fetch('/v2/products/{product_id}/relations', 'get', metadata);
  }

  /**
   * Updates the product sharing settings for a given product.
   *
   * @summary Update product sharing settings
   * @throws FetchError<400, types.ScalevApiWebProductControllerUpdateSharingResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerUpdateSharingResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebProductControllerUpdateSharingResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebProductControllerUpdateSharingResponse404> Not Found
   */
  scalevApiWebProductControllerUpdate_sharing(body: types.ScalevApiWebProductControllerUpdateSharingBodyParam, metadata: types.ScalevApiWebProductControllerUpdateSharingMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerUpdateSharingResponse200>> {
    return this.core.fetch('/v2/products/{product_id}/sharing', 'patch', body, metadata);
  }

  /**
   * Retrieve shipping cost estimates based on origin, destination, courier services, and
   * package weight.
   *
   * @summary Get Shipping Costs
   * @throws FetchError<400, types.ScalevApiWebShippingCostControllerSearchShippingCostsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebShippingCostControllerSearchShippingCostsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebShippingCostControllerSearchShippingCostsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebShippingCostControllerSearchShippingCostsResponse404> Not Found
   */
  scalevApiWebShippingCostControllerSearch_shipping_costs(body: types.ScalevApiWebShippingCostControllerSearchShippingCostsBodyParam): Promise<FetchResponse<200, types.ScalevApiWebShippingCostControllerSearchShippingCostsResponse200>> {
    return this.core.fetch('/v2/shipping-costs', 'post', body);
  }

  /**
   * Retrieve available courier services based on warehouse, destination, payment method, and
   * package weight.
   *
   * @summary Get Courier Services
   * @throws FetchError<400, types.ScalevApiWebShippingCostControllerSearchCourierServicesResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebShippingCostControllerSearchCourierServicesResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebShippingCostControllerSearchCourierServicesResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebShippingCostControllerSearchCourierServicesResponse404> Not Found
   */
  scalevApiWebShippingCostControllerSearch_courier_services(body: types.ScalevApiWebShippingCostControllerSearchCourierServicesBodyParam): Promise<FetchResponse<200, types.ScalevApiWebShippingCostControllerSearchCourierServicesResponse200>> {
    return this.core.fetch('/v2/shipping-costs/search-courier-service', 'post', body);
  }

  /**
   * Search for warehouses based on order details, store, destination, and product variants.
   *
   * @summary Search Warehouses
   * @throws FetchError<400, types.ScalevApiWebShippingCostControllerSearchWarehousesResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebShippingCostControllerSearchWarehousesResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebShippingCostControllerSearchWarehousesResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebShippingCostControllerSearchWarehousesResponse404> Not Found
   */
  scalevApiWebShippingCostControllerSearch_warehouses(body: types.ScalevApiWebShippingCostControllerSearchWarehousesBodyParam): Promise<FetchResponse<200, types.ScalevApiWebShippingCostControllerSearchWarehousesResponse200>> {
    return this.core.fetch('/v2/shipping-costs/search-warehouse', 'post', body);
  }

  /**
   * Creates a new store with the provided details.
   *
   * @summary Create a store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerCreateResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerCreateResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerCreateResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerCreateResponse404> Not Found
   */
  scalevApiWebStoreControllerCreate(body: types.ScalevApiWebStoreControllerCreateBodyParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerCreateResponse200>> {
    return this.core.fetch('/v2/stores', 'post', body);
  }

  /**
   * Retrieves a paginated list of stores with optional filtering. The data is sorted by id
   * in descending order and cannot be changed. Uses cursor-based pagination with default
   * page size of 25 and maximum of 25.
   *
   * @summary List stores
   * @throws FetchError<400, types.ScalevApiWebStoreControllerIndexResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerIndexResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerIndexResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerIndexResponse404> Not Found
   */
  scalevApiWebStoreControllerIndex(metadata?: types.ScalevApiWebStoreControllerIndexMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerIndexResponse200>> {
    return this.core.fetch('/v2/stores', 'get', metadata);
  }

  /**
   * Retrieves a paginated list of stores with simplified fields and optional filtering. The
   * data is sorted by id in descending order and cannot be changed. Uses cursor-based
   * pagination with default page size of 25 and maximum of 25.
   *
   * @summary List stores with simplified fields
   * @throws FetchError<400, types.ScalevApiWebStoreControllerIndexSimplifiedResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerIndexSimplifiedResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerIndexSimplifiedResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerIndexSimplifiedResponse404> Not Found
   */
  scalevApiWebStoreControllerIndex_simplified(metadata?: types.ScalevApiWebStoreControllerIndexSimplifiedMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerIndexSimplifiedResponse200>> {
    return this.core.fetch('/v2/stores/simplified', 'get', metadata);
  }

  /**
   * Retrieves detailed information about a specific store identified by its ID.
   *
   * @summary View a store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerShowResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerShowResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerShowResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerShowResponse404> Not Found
   */
  scalevApiWebStoreControllerShow(metadata: types.ScalevApiWebStoreControllerShowMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerShowResponse200>> {
    return this.core.fetch('/v2/stores/{id}', 'get', metadata);
  }

  /**
   * Updates the details of an existing store identified by its ID.
   *
   * @summary Update a store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerUpdateResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerUpdateResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerUpdateResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerUpdateResponse404> Not Found
   */
  scalevApiWebStoreControllerUpdate(body: types.ScalevApiWebStoreControllerUpdateBodyParam, metadata: types.ScalevApiWebStoreControllerUpdateMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerUpdateResponse200>>;
  scalevApiWebStoreControllerUpdate(metadata: types.ScalevApiWebStoreControllerUpdateMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerUpdateResponse200>>;
  scalevApiWebStoreControllerUpdate(body?: types.ScalevApiWebStoreControllerUpdateBodyParam | types.ScalevApiWebStoreControllerUpdateMetadataParam, metadata?: types.ScalevApiWebStoreControllerUpdateMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerUpdateResponse200>> {
    return this.core.fetch('/v2/stores/{id}', 'patch', body, metadata);
  }

  /**
   * Deletes a store and all its associated data.
   *
   * @summary Delete a store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerDeleteResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerDeleteResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerDeleteResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerDeleteResponse404> Not Found
   */
  scalevApiWebStoreControllerDelete(metadata: types.ScalevApiWebStoreControllerDeleteMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerDeleteResponse200>> {
    return this.core.fetch('/v2/stores/{id}', 'delete', metadata);
  }

  /**
   * Associates one or more bundle price options with a specific store.
   *
   * @summary Add Bundle Price Options to a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerAddBposResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerAddBposResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerAddBposResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerAddBposResponse404> Not Found
   */
  scalevApiWebStoreControllerAdd_bpos(body: types.ScalevApiWebStoreControllerAddBposBodyParam, metadata: types.ScalevApiWebStoreControllerAddBposMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerAddBposResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/bpos', 'post', body, metadata);
  }

  /**
   * Dissociates a specific Bundle Price Option from a store.
   *
   * @summary Remove a Bundle Price Option from a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerRemoveBpoResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerRemoveBpoResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerRemoveBpoResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerRemoveBpoResponse404> Not Found
   */
  scalevApiWebStoreControllerRemove_bpo(metadata: types.ScalevApiWebStoreControllerRemoveBpoMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerRemoveBpoResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/bpos/{id}', 'delete', metadata);
  }

  /**
   * Retrieves detailed relation of a specific Bundle Price Option associated with a store.
   *
   * @summary View Bundle Price Option relations in a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerShowBpoRelationsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerShowBpoRelationsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerShowBpoRelationsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerShowBpoRelationsResponse404> Not Found
   */
  scalevApiWebStoreControllerShow_bpo_relations(metadata: types.ScalevApiWebStoreControllerShowBpoRelationsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerShowBpoRelationsResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/bpos/{id}/relations', 'get', metadata);
  }

  /**
   * Retrieves a paginated list of bundles available in a specific store. The data is sorted
   * by id in descending order and cannot be changed. Uses cursor-based pagination with
   * default page size of 25 and maximum of 25.
   *
   * @summary List Bundles in a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerIndexBundleResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerIndexBundleResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerIndexBundleResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerIndexBundleResponse404> Not Found
   */
  scalevApiWebStoreControllerIndex_bundle(metadata: types.ScalevApiWebStoreControllerIndexBundleMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerIndexBundleResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/bundles', 'get', metadata);
  }

  /**
   * Retrieves detailed information about a specific bundle in a store.
   *
   * @summary View a Bundle in a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerShowBundleResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerShowBundleResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerShowBundleResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerShowBundleResponse404> Not Found
   */
  scalevApiWebStoreControllerShow_bundle(metadata: types.ScalevApiWebStoreControllerShowBundleMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerShowBundleResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/bundles/{bundle_id}', 'get', metadata);
  }

  /**
   * Associates one or more courier services with a specific store.
   *
   * @summary Add Courier Services to a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerAddCourierServicesResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerAddCourierServicesResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerAddCourierServicesResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerAddCourierServicesResponse404> Not Found
   */
  scalevApiWebStoreControllerAdd_courier_services(body: types.ScalevApiWebStoreControllerAddCourierServicesBodyParam, metadata: types.ScalevApiWebStoreControllerAddCourierServicesMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerAddCourierServicesResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/courier-services', 'post', body, metadata);
  }

  /**
   * Dissociates one or more courier services from a specific store.
   *
   * @summary Remove Courier Services from a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerRemoveCourierServiceResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerRemoveCourierServiceResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerRemoveCourierServiceResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerRemoveCourierServiceResponse404> Not Found
   */
  scalevApiWebStoreControllerRemove_courier_service(body: types.ScalevApiWebStoreControllerRemoveCourierServiceBodyParam, metadata: types.ScalevApiWebStoreControllerRemoveCourierServiceMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerRemoveCourierServiceResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/courier-services', 'delete', body, metadata);
  }

  /**
   * Retrieves a list of custom audiences associated with a specific store.
   *
   * @summary List Custom Audiences in a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerIndexCustomAudiencesResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerIndexCustomAudiencesResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerIndexCustomAudiencesResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerIndexCustomAudiencesResponse404> Not Found
   */
  scalevApiWebStoreControllerIndex_custom_audiences(metadata: types.ScalevApiWebStoreControllerIndexCustomAudiencesMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerIndexCustomAudiencesResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/custom-audiences', 'get', metadata);
  }

  /**
   * Create a follow up chat template for a store.
   *
   * @summary Create a follow up chat template
   * @throws FetchError<400, types.ScalevApiWebFollowUpChatControllerCreateFucResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebFollowUpChatControllerCreateFucResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebFollowUpChatControllerCreateFucResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebFollowUpChatControllerCreateFucResponse404> Not Found
   */
  scalevApiWebFollowUpChatControllerCreate_fuc(body: types.ScalevApiWebFollowUpChatControllerCreateFucBodyParam, metadata: types.ScalevApiWebFollowUpChatControllerCreateFucMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebFollowUpChatControllerCreateFucResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/follow-up-chats', 'post', body, metadata);
  }

  /**
   * Retrieves a paginated list of follow up chats for a store.
   *
   * @summary List follow up chats
   * @throws FetchError<400, types.ScalevApiWebFollowUpChatControllerIndexFucsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebFollowUpChatControllerIndexFucsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebFollowUpChatControllerIndexFucsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebFollowUpChatControllerIndexFucsResponse404> Not Found
   */
  scalevApiWebFollowUpChatControllerIndex_fucs(metadata: types.ScalevApiWebFollowUpChatControllerIndexFucsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebFollowUpChatControllerIndexFucsResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/follow-up-chats', 'get', metadata);
  }

  /**
   * Generates a new follow up chat for a store.
   *
   * @summary Generate a follow up chat
   * @throws FetchError<400, types.ScalevApiWebFollowUpChatControllerGenerateFucResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebFollowUpChatControllerGenerateFucResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebFollowUpChatControllerGenerateFucResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebFollowUpChatControllerGenerateFucResponse404> Not Found
   */
  scalevApiWebFollowUpChatControllerGenerate_fuc(metadata: types.ScalevApiWebFollowUpChatControllerGenerateFucMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebFollowUpChatControllerGenerateFucResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/follow-up-chats/generate', 'post', metadata);
  }

  /**
   * Retrieves a follow up chat template by its ID.
   *
   * @summary Show a follow up chat template
   * @throws FetchError<400, types.ScalevApiWebFollowUpChatControllerShowFucResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebFollowUpChatControllerShowFucResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebFollowUpChatControllerShowFucResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebFollowUpChatControllerShowFucResponse404> Not Found
   */
  scalevApiWebFollowUpChatControllerShow_fuc(metadata: types.ScalevApiWebFollowUpChatControllerShowFucMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebFollowUpChatControllerShowFucResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/follow-up-chats/{id}', 'get', metadata);
  }

  /**
   * Updates a follow up chat template.
   *
   * @summary Update a follow up chat template
   * @throws FetchError<400, types.ScalevApiWebFollowUpChatControllerUpdateFucResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebFollowUpChatControllerUpdateFucResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebFollowUpChatControllerUpdateFucResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebFollowUpChatControllerUpdateFucResponse404> Not Found
   */
  scalevApiWebFollowUpChatControllerUpdate_fuc(body: types.ScalevApiWebFollowUpChatControllerUpdateFucBodyParam, metadata: types.ScalevApiWebFollowUpChatControllerUpdateFucMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebFollowUpChatControllerUpdateFucResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/follow-up-chats/{id}', 'patch', body, metadata);
  }

  /**
   * Deletes a follow up chat template.
   *
   * @summary Delete a follow up chat template
   * @throws FetchError<400, types.ScalevApiWebFollowUpChatControllerDeleteFucResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebFollowUpChatControllerDeleteFucResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebFollowUpChatControllerDeleteFucResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebFollowUpChatControllerDeleteFucResponse404> Not Found
   */
  scalevApiWebFollowUpChatControllerDelete_fuc(metadata: types.ScalevApiWebFollowUpChatControllerDeleteFucMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebFollowUpChatControllerDeleteFucResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/follow-up-chats/{id}', 'delete', metadata);
  }

  /**
   * Retrieves a paginated list of pages associated with a specific store. The data is sorted
   * by id in descending order and cannot be changed. Uses cursor-based pagination with
   * default page size of 25 and maximum of 25.
   *
   * @summary List Pages in a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerIndexPageResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerIndexPageResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerIndexPageResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerIndexPageResponse404> Not Found
   */
  scalevApiWebStoreControllerIndex_page(metadata: types.ScalevApiWebStoreControllerIndexPageMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerIndexPageResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/pages', 'get', metadata);
  }

  /**
   * Retrieves a paginated list of payment accounts associated with a specific store. The
   * data is sorted by id in descending order and cannot be changed. Uses cursor-based
   * pagination with default page size of 25 and maximum of 25.
   *
   * @summary List Payment Accounts in a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerIndexPaymentAccountResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerIndexPaymentAccountResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerIndexPaymentAccountResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerIndexPaymentAccountResponse404> Not Found
   */
  scalevApiWebStoreControllerIndex_payment_account(metadata: types.ScalevApiWebStoreControllerIndexPaymentAccountMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerIndexPaymentAccountResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/payment-accounts', 'get', metadata);
  }

  /**
   * Associates one or more payment methods with a specific store.
   *
   * @summary Add Payment Methods to a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerAddPaymentMethodsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerAddPaymentMethodsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerAddPaymentMethodsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerAddPaymentMethodsResponse404> Not Found
   */
  scalevApiWebStoreControllerAdd_payment_methods(body: types.ScalevApiWebStoreControllerAddPaymentMethodsBodyParam, metadata: types.ScalevApiWebStoreControllerAddPaymentMethodsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerAddPaymentMethodsResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/payment-methods', 'post', body, metadata);
  }

  /**
   * Retrieves a list of payment methods associated with a specific store.
   *
   * @summary List Payment Methods in a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerIndexPaymentMethodResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerIndexPaymentMethodResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerIndexPaymentMethodResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerIndexPaymentMethodResponse404> Not Found
   */
  scalevApiWebStoreControllerIndex_payment_method(metadata: types.ScalevApiWebStoreControllerIndexPaymentMethodMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerIndexPaymentMethodResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/payment-methods', 'get', metadata);
  }

  /**
   * Dissociates a specific payment method from a store.
   *
   * @summary Remove a Payment Method from a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerRemovePaymentMethodResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerRemovePaymentMethodResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerRemovePaymentMethodResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerRemovePaymentMethodResponse404> Not Found
   */
  scalevApiWebStoreControllerRemove_payment_method(body: types.ScalevApiWebStoreControllerRemovePaymentMethodBodyParam, metadata: types.ScalevApiWebStoreControllerRemovePaymentMethodMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerRemovePaymentMethodResponse200>>;
  scalevApiWebStoreControllerRemove_payment_method(metadata: types.ScalevApiWebStoreControllerRemovePaymentMethodMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerRemovePaymentMethodResponse200>>;
  scalevApiWebStoreControllerRemove_payment_method(body?: types.ScalevApiWebStoreControllerRemovePaymentMethodBodyParam | types.ScalevApiWebStoreControllerRemovePaymentMethodMetadataParam, metadata?: types.ScalevApiWebStoreControllerRemovePaymentMethodMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerRemovePaymentMethodResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/payment-methods', 'delete', body, metadata);
  }

  /**
   * Associates one or more products with a specific store.
   *
   * @summary Add Products to a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerAddProductsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerAddProductsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerAddProductsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerAddProductsResponse404> Not Found
   */
  scalevApiWebStoreControllerAdd_products(body: types.ScalevApiWebStoreControllerAddProductsBodyParam, metadata: types.ScalevApiWebStoreControllerAddProductsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerAddProductsResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/products', 'post', body, metadata);
  }

  /**
   * Retrieves a paginated list of products available in a specific store. The data is sorted
   * by id in descending order and cannot be changed. Uses cursor-based pagination with
   * default page size of 25 and maximum of 25.
   *
   * @summary List Products in a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerIndexProductResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerIndexProductResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerIndexProductResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerIndexProductResponse404> Not Found
   */
  scalevApiWebStoreControllerIndex_product(metadata: types.ScalevApiWebStoreControllerIndexProductMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerIndexProductResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/products', 'get', metadata);
  }

  /**
   * Dissociates a specific Product from a store.
   *
   * @summary Remove a Product from a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerRemoveProductResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerRemoveProductResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerRemoveProductResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerRemoveProductResponse404> Not Found
   */
  scalevApiWebStoreControllerRemove_product(metadata: types.ScalevApiWebStoreControllerRemoveProductMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerRemoveProductResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/products/{id}', 'delete', metadata);
  }

  /**
   * Retrieves detailed relation of a specific Product associated with a store.
   *
   * @summary View Product relations in a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerShowProductRelationsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerShowProductRelationsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerShowProductRelationsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerShowProductRelationsResponse404> Not Found
   */
  scalevApiWebStoreControllerShow_product_relations(metadata: types.ScalevApiWebStoreControllerShowProductRelationsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerShowProductRelationsResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/products/{id}/relations', 'get', metadata);
  }

  /**
   * Retrieves a paginated list of sales persons associated with a specific store. The data
   * is sorted by id in descending order and cannot be changed. Uses cursor-based pagination
   * with default page size of 25 and maximum of 25.
   *
   * @summary List Sales Persons in a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerIndexSalesPersonResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerIndexSalesPersonResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerIndexSalesPersonResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerIndexSalesPersonResponse404> Not Found
   */
  scalevApiWebStoreControllerIndex_sales_person(metadata: types.ScalevApiWebStoreControllerIndexSalesPersonMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerIndexSalesPersonResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/sales-people', 'get', metadata);
  }

  /**
   * Associates one or more business users as store admins to a specific store.
   *
   * @summary Add Store Admins to a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerAddStoreAdminsResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerAddStoreAdminsResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerAddStoreAdminsResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerAddStoreAdminsResponse404> Not Found
   */
  scalevApiWebStoreControllerAdd_store_admins(body: types.ScalevApiWebStoreControllerAddStoreAdminsBodyParam, metadata: types.ScalevApiWebStoreControllerAddStoreAdminsMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerAddStoreAdminsResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/store-admins', 'post', body, metadata);
  }

  /**
   * Retrieves a paginated list of store admins associated with a specific store. The data is
   * sorted by id in descending order and cannot be changed. Uses cursor-based pagination
   * with default page size of 25 and maximum of 25.
   *
   * @summary List Store Admins in a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerIndexStoreAdminResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerIndexStoreAdminResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerIndexStoreAdminResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerIndexStoreAdminResponse404> Not Found
   */
  scalevApiWebStoreControllerIndex_store_admin(metadata: types.ScalevApiWebStoreControllerIndexStoreAdminMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerIndexStoreAdminResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/store-admins', 'get', metadata);
  }

  /**
   * Dissociates a specific business user as a store admin from a store.
   *
   * @summary Remove a Store Admin from a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerRemoveStoreAdminResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerRemoveStoreAdminResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerRemoveStoreAdminResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerRemoveStoreAdminResponse404> Not Found
   */
  scalevApiWebStoreControllerRemove_store_admin(metadata: types.ScalevApiWebStoreControllerRemoveStoreAdminMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerRemoveStoreAdminResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/store-admins/{bu_id}', 'delete', metadata);
  }

  /**
   * Associates one or more business users as store advertisers to a specific store.
   *
   * @summary Add Store Advertisers to a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerAddStoreAdvertisersResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerAddStoreAdvertisersResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerAddStoreAdvertisersResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerAddStoreAdvertisersResponse404> Not Found
   */
  scalevApiWebStoreControllerAdd_store_advertisers(body: types.ScalevApiWebStoreControllerAddStoreAdvertisersBodyParam, metadata: types.ScalevApiWebStoreControllerAddStoreAdvertisersMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerAddStoreAdvertisersResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/store-advertisers', 'post', body, metadata);
  }

  /**
   * Retrieves a paginated list of store advertisers associated with a specific store. The
   * data is sorted by id in descending order and cannot be changed. Uses cursor-based
   * pagination with default page size of 25 and maximum of 25.
   *
   * @summary List Store Advertisers in a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerIndexStoreAdvertiserResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerIndexStoreAdvertiserResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerIndexStoreAdvertiserResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerIndexStoreAdvertiserResponse404> Not Found
   */
  scalevApiWebStoreControllerIndex_store_advertiser(metadata: types.ScalevApiWebStoreControllerIndexStoreAdvertiserMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerIndexStoreAdvertiserResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/store-advertisers', 'get', metadata);
  }

  /**
   * Dissociates a specific business user as a store advertiser from a store.
   *
   * @summary Remove a Store Advertiser from a Store
   * @throws FetchError<400, types.ScalevApiWebStoreControllerRemoveStoreAdvertiserResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebStoreControllerRemoveStoreAdvertiserResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebStoreControllerRemoveStoreAdvertiserResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebStoreControllerRemoveStoreAdvertiserResponse404> Not Found
   */
  scalevApiWebStoreControllerRemove_store_advertiser(metadata: types.ScalevApiWebStoreControllerRemoveStoreAdvertiserMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebStoreControllerRemoveStoreAdvertiserResponse200>> {
    return this.core.fetch('/v2/stores/{store_id}/store-advertisers/{bu_id}', 'delete', metadata);
  }

  /**
   * Shows a single product variant by ID.
   *
   * @summary Show a product variant
   * @throws FetchError<400, types.ScalevApiWebProductControllerShowVariantResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerShowVariantResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebProductControllerShowVariantResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebProductControllerShowVariantResponse404> Not Found
   */
  scalevApiWebProductControllerShow_variant(metadata: types.ScalevApiWebProductControllerShowVariantMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerShowVariantResponse200>> {
    return this.core.fetch('/v2/variants/{id}', 'get', metadata);
  }

  /**
   * Retrieves a paginated list of digital product files for a variant.
   *
   * @summary List digital product files
   * @throws FetchError<400, types.ScalevApiWebProductControllerIndexDigitalProductFilesResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerIndexDigitalProductFilesResponse401> Unauthorized
   */
  scalevApiWebProductControllerIndex_digital_product_files(metadata: types.ScalevApiWebProductControllerIndexDigitalProductFilesMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerIndexDigitalProductFilesResponse200>> {
    return this.core.fetch('/v2/variants/{variant_id}/digital-product-files', 'get', metadata);
  }

  /**
   * Shows a single digital product file by ID.
   *
   * @summary Show a digital product file
   * @throws FetchError<400, types.ScalevApiWebProductControllerShowDigitalProductFileResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerShowDigitalProductFileResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebProductControllerShowDigitalProductFileResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebProductControllerShowDigitalProductFileResponse404> Not Found
   */
  scalevApiWebProductControllerShow_digital_product_file(metadata: types.ScalevApiWebProductControllerShowDigitalProductFileMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerShowDigitalProductFileResponse200>> {
    return this.core.fetch('/v2/variants/{variant_id}/digital-product-files/{id}', 'get', metadata);
  }

  /**
   * Deletes a digital product file.
   *
   * @summary Delete a digital product file
   * @throws FetchError<400, types.ScalevApiWebProductControllerDeleteDigitalProductFileResponse400> Bad Request
   * @throws FetchError<401, types.ScalevApiWebProductControllerDeleteDigitalProductFileResponse401> Unauthorized
   * @throws FetchError<403, types.ScalevApiWebProductControllerDeleteDigitalProductFileResponse403> Forbidden
   * @throws FetchError<404, types.ScalevApiWebProductControllerDeleteDigitalProductFileResponse404> Not Found
   */
  scalevApiWebProductControllerDelete_digital_product_file(metadata: types.ScalevApiWebProductControllerDeleteDigitalProductFileMetadataParam): Promise<FetchResponse<200, types.ScalevApiWebProductControllerDeleteDigitalProductFileResponse200>> {
    return this.core.fetch('/v2/variants/{variant_id}/digital-product-files/{id}', 'delete', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { ScalevApiWebBundleControllerCreateBodyParam, ScalevApiWebBundleControllerCreateBpoBodyParam, ScalevApiWebBundleControllerCreateBpoMetadataParam, ScalevApiWebBundleControllerCreateBpoResponse200, ScalevApiWebBundleControllerCreateBpoResponse400, ScalevApiWebBundleControllerCreateBpoResponse401, ScalevApiWebBundleControllerCreateBpoResponse403, ScalevApiWebBundleControllerCreateBpoResponse404, ScalevApiWebBundleControllerCreateFucBodyParam, ScalevApiWebBundleControllerCreateFucMetadataParam, ScalevApiWebBundleControllerCreateFucResponse200, ScalevApiWebBundleControllerCreateFucResponse400, ScalevApiWebBundleControllerCreateFucResponse401, ScalevApiWebBundleControllerCreateFucResponse403, ScalevApiWebBundleControllerCreateFucResponse404, ScalevApiWebBundleControllerCreatePartnerBodyParam, ScalevApiWebBundleControllerCreatePartnerMetadataParam, ScalevApiWebBundleControllerCreatePartnerResponse200, ScalevApiWebBundleControllerCreatePartnerResponse400, ScalevApiWebBundleControllerCreatePartnerResponse401, ScalevApiWebBundleControllerCreatePartnerResponse403, ScalevApiWebBundleControllerCreatePartnerResponse404, ScalevApiWebBundleControllerCreateResponse200, ScalevApiWebBundleControllerCreateResponse400, ScalevApiWebBundleControllerCreateResponse401, ScalevApiWebBundleControllerCreateResponse403, ScalevApiWebBundleControllerCreateResponse404, ScalevApiWebBundleControllerDeleteBpoMetadataParam, ScalevApiWebBundleControllerDeleteBpoResponse200, ScalevApiWebBundleControllerDeleteBpoResponse400, ScalevApiWebBundleControllerDeleteBpoResponse401, ScalevApiWebBundleControllerDeleteBpoResponse403, ScalevApiWebBundleControllerDeleteBpoResponse404, ScalevApiWebBundleControllerDeleteFucMetadataParam, ScalevApiWebBundleControllerDeleteFucResponse200, ScalevApiWebBundleControllerDeleteFucResponse400, ScalevApiWebBundleControllerDeleteFucResponse401, ScalevApiWebBundleControllerDeleteFucResponse403, ScalevApiWebBundleControllerDeleteFucResponse404, ScalevApiWebBundleControllerDeleteMetadataParam, ScalevApiWebBundleControllerDeletePartnerMetadataParam, ScalevApiWebBundleControllerDeletePartnerResponse200, ScalevApiWebBundleControllerDeletePartnerResponse400, ScalevApiWebBundleControllerDeletePartnerResponse401, ScalevApiWebBundleControllerDeletePartnerResponse403, ScalevApiWebBundleControllerDeletePartnerResponse404, ScalevApiWebBundleControllerDeleteResponse200, ScalevApiWebBundleControllerDeleteResponse400, ScalevApiWebBundleControllerDeleteResponse401, ScalevApiWebBundleControllerDeleteResponse403, ScalevApiWebBundleControllerDeleteResponse404, ScalevApiWebBundleControllerGenerateFucMetadataParam, ScalevApiWebBundleControllerGenerateFucResponse200, ScalevApiWebBundleControllerGenerateFucResponse400, ScalevApiWebBundleControllerGenerateFucResponse401, ScalevApiWebBundleControllerGenerateFucResponse403, ScalevApiWebBundleControllerGenerateFucResponse404, ScalevApiWebBundleControllerIndexBpoMetadataParam, ScalevApiWebBundleControllerIndexBpoResponse200, ScalevApiWebBundleControllerIndexBpoResponse400, ScalevApiWebBundleControllerIndexBpoResponse401, ScalevApiWebBundleControllerIndexBpoResponse403, ScalevApiWebBundleControllerIndexBpoResponse404, ScalevApiWebBundleControllerIndexFucsMetadataParam, ScalevApiWebBundleControllerIndexFucsResponse200, ScalevApiWebBundleControllerIndexFucsResponse400, ScalevApiWebBundleControllerIndexFucsResponse401, ScalevApiWebBundleControllerIndexFucsResponse403, ScalevApiWebBundleControllerIndexFucsResponse404, ScalevApiWebBundleControllerIndexMetadataParam, ScalevApiWebBundleControllerIndexPartnersMetadataParam, ScalevApiWebBundleControllerIndexPartnersResponse200, ScalevApiWebBundleControllerIndexPartnersResponse400, ScalevApiWebBundleControllerIndexPartnersResponse401, ScalevApiWebBundleControllerIndexPartnersResponse403, ScalevApiWebBundleControllerIndexPartnersResponse404, ScalevApiWebBundleControllerIndexResponse200, ScalevApiWebBundleControllerIndexResponse400, ScalevApiWebBundleControllerIndexResponse401, ScalevApiWebBundleControllerIndexResponse403, ScalevApiWebBundleControllerIndexResponse404, ScalevApiWebBundleControllerIndexSimplifiedMetadataParam, ScalevApiWebBundleControllerIndexSimplifiedResponse200, ScalevApiWebBundleControllerIndexSimplifiedResponse400, ScalevApiWebBundleControllerIndexSimplifiedResponse401, ScalevApiWebBundleControllerIndexSimplifiedResponse403, ScalevApiWebBundleControllerIndexSimplifiedResponse404, ScalevApiWebBundleControllerShowBpoRelationsMetadataParam, ScalevApiWebBundleControllerShowBpoRelationsResponse200, ScalevApiWebBundleControllerShowBpoRelationsResponse400, ScalevApiWebBundleControllerShowBpoRelationsResponse401, ScalevApiWebBundleControllerShowBpoRelationsResponse403, ScalevApiWebBundleControllerShowBpoRelationsResponse404, ScalevApiWebBundleControllerShowCountMetadataParam, ScalevApiWebBundleControllerShowCountResponse200, ScalevApiWebBundleControllerShowCountResponse400, ScalevApiWebBundleControllerShowCountResponse401, ScalevApiWebBundleControllerShowCountResponse403, ScalevApiWebBundleControllerShowCountResponse404, ScalevApiWebBundleControllerShowFucMetadataParam, ScalevApiWebBundleControllerShowFucResponse200, ScalevApiWebBundleControllerShowFucResponse400, ScalevApiWebBundleControllerShowFucResponse401, ScalevApiWebBundleControllerShowFucResponse403, ScalevApiWebBundleControllerShowFucResponse404, ScalevApiWebBundleControllerShowMetadataParam, ScalevApiWebBundleControllerShowRelationsMetadataParam, ScalevApiWebBundleControllerShowRelationsResponse200, ScalevApiWebBundleControllerShowRelationsResponse400, ScalevApiWebBundleControllerShowRelationsResponse401, ScalevApiWebBundleControllerShowRelationsResponse403, ScalevApiWebBundleControllerShowRelationsResponse404, ScalevApiWebBundleControllerShowResponse200, ScalevApiWebBundleControllerShowResponse400, ScalevApiWebBundleControllerShowResponse401, ScalevApiWebBundleControllerShowResponse403, ScalevApiWebBundleControllerShowResponse404, ScalevApiWebBundleControllerUpdateBodyParam, ScalevApiWebBundleControllerUpdateBpoBodyParam, ScalevApiWebBundleControllerUpdateBpoMetadataParam, ScalevApiWebBundleControllerUpdateBpoResponse200, ScalevApiWebBundleControllerUpdateBpoResponse400, ScalevApiWebBundleControllerUpdateBpoResponse401, ScalevApiWebBundleControllerUpdateBpoResponse403, ScalevApiWebBundleControllerUpdateBpoResponse404, ScalevApiWebBundleControllerUpdateFucBodyParam, ScalevApiWebBundleControllerUpdateFucMetadataParam, ScalevApiWebBundleControllerUpdateFucResponse200, ScalevApiWebBundleControllerUpdateFucResponse400, ScalevApiWebBundleControllerUpdateFucResponse401, ScalevApiWebBundleControllerUpdateFucResponse403, ScalevApiWebBundleControllerUpdateFucResponse404, ScalevApiWebBundleControllerUpdateMetadataParam, ScalevApiWebBundleControllerUpdateResponse200, ScalevApiWebBundleControllerUpdateResponse400, ScalevApiWebBundleControllerUpdateResponse401, ScalevApiWebBundleControllerUpdateResponse403, ScalevApiWebBundleControllerUpdateResponse404, ScalevApiWebBundleControllerUpdateSharingBodyParam, ScalevApiWebBundleControllerUpdateSharingMetadataParam, ScalevApiWebBundleControllerUpdateSharingResponse200, ScalevApiWebBundleControllerUpdateSharingResponse400, ScalevApiWebBundleControllerUpdateSharingResponse401, ScalevApiWebBundleControllerUpdateSharingResponse403, ScalevApiWebBundleControllerUpdateSharingResponse404, ScalevApiWebBusinessGlobalControllerGetEnabledPayments2Response200, ScalevApiWebBusinessGlobalControllerGetEnabledPayments2Response400, ScalevApiWebBusinessGlobalControllerGetEnabledPayments2Response401, ScalevApiWebBusinessGlobalControllerGetEnabledPayments2Response403, ScalevApiWebBusinessGlobalControllerGetEnabledPayments2Response404, ScalevApiWebBusinessGlobalControllerGetEnabledPaymentsResponse200, ScalevApiWebBusinessGlobalControllerGetEnabledPaymentsResponse400, ScalevApiWebBusinessGlobalControllerGetEnabledPaymentsResponse401, ScalevApiWebBusinessGlobalControllerGetEnabledPaymentsResponse403, ScalevApiWebBusinessGlobalControllerGetEnabledPaymentsResponse404, ScalevApiWebCoreBusinessControllerShowResponse200, ScalevApiWebCoreBusinessControllerShowResponse400, ScalevApiWebCoreBusinessControllerShowResponse401, ScalevApiWebCoreBusinessControllerShowResponse403, ScalevApiWebCoreBusinessControllerShowResponse404, ScalevApiWebFollowUpChatControllerCreateFucBodyParam, ScalevApiWebFollowUpChatControllerCreateFucMetadataParam, ScalevApiWebFollowUpChatControllerCreateFucResponse200, ScalevApiWebFollowUpChatControllerCreateFucResponse400, ScalevApiWebFollowUpChatControllerCreateFucResponse401, ScalevApiWebFollowUpChatControllerCreateFucResponse403, ScalevApiWebFollowUpChatControllerCreateFucResponse404, ScalevApiWebFollowUpChatControllerDeleteFucMetadataParam, ScalevApiWebFollowUpChatControllerDeleteFucResponse200, ScalevApiWebFollowUpChatControllerDeleteFucResponse400, ScalevApiWebFollowUpChatControllerDeleteFucResponse401, ScalevApiWebFollowUpChatControllerDeleteFucResponse403, ScalevApiWebFollowUpChatControllerDeleteFucResponse404, ScalevApiWebFollowUpChatControllerGenerateFucMetadataParam, ScalevApiWebFollowUpChatControllerGenerateFucResponse200, ScalevApiWebFollowUpChatControllerGenerateFucResponse400, ScalevApiWebFollowUpChatControllerGenerateFucResponse401, ScalevApiWebFollowUpChatControllerGenerateFucResponse403, ScalevApiWebFollowUpChatControllerGenerateFucResponse404, ScalevApiWebFollowUpChatControllerIndexFucsMetadataParam, ScalevApiWebFollowUpChatControllerIndexFucsResponse200, ScalevApiWebFollowUpChatControllerIndexFucsResponse400, ScalevApiWebFollowUpChatControllerIndexFucsResponse401, ScalevApiWebFollowUpChatControllerIndexFucsResponse403, ScalevApiWebFollowUpChatControllerIndexFucsResponse404, ScalevApiWebFollowUpChatControllerShowFucMetadataParam, ScalevApiWebFollowUpChatControllerShowFucResponse200, ScalevApiWebFollowUpChatControllerShowFucResponse400, ScalevApiWebFollowUpChatControllerShowFucResponse401, ScalevApiWebFollowUpChatControllerShowFucResponse403, ScalevApiWebFollowUpChatControllerShowFucResponse404, ScalevApiWebFollowUpChatControllerUpdateFucBodyParam, ScalevApiWebFollowUpChatControllerUpdateFucMetadataParam, ScalevApiWebFollowUpChatControllerUpdateFucResponse200, ScalevApiWebFollowUpChatControllerUpdateFucResponse400, ScalevApiWebFollowUpChatControllerUpdateFucResponse401, ScalevApiWebFollowUpChatControllerUpdateFucResponse403, ScalevApiWebFollowUpChatControllerUpdateFucResponse404, ScalevApiWebLocationControllerIndexLocationsMetadataParam, ScalevApiWebLocationControllerIndexLocationsResponse200, ScalevApiWebLocationControllerIndexLocationsResponse400, ScalevApiWebLocationControllerIndexLocationsResponse401, ScalevApiWebLocationControllerIndexLocationsResponse403, ScalevApiWebLocationControllerIndexLocationsResponse404, ScalevApiWebOrderControllerAddMessageHistoryBodyParam, ScalevApiWebOrderControllerAddMessageHistoryMetadataParam, ScalevApiWebOrderControllerAddMessageHistoryResponse200, ScalevApiWebOrderControllerAddMessageHistoryResponse400, ScalevApiWebOrderControllerAddMessageHistoryResponse401, ScalevApiWebOrderControllerAddMessageHistoryResponse403, ScalevApiWebOrderControllerAddMessageHistoryResponse404, ScalevApiWebOrderControllerCancelAwbBodyParam, ScalevApiWebOrderControllerCancelAwbResponse200, ScalevApiWebOrderControllerCancelAwbResponse400, ScalevApiWebOrderControllerCancelAwbResponse401, ScalevApiWebOrderControllerChangeStatusBodyParam, ScalevApiWebOrderControllerChangeStatusResponse200, ScalevApiWebOrderControllerChangeStatusResponse400, ScalevApiWebOrderControllerChangeStatusResponse401, ScalevApiWebOrderControllerCreateBodyParam, ScalevApiWebOrderControllerCreatePaymentMetadataParam, ScalevApiWebOrderControllerCreatePaymentResponse200, ScalevApiWebOrderControllerCreatePaymentResponse400, ScalevApiWebOrderControllerCreatePaymentResponse401, ScalevApiWebOrderControllerCreatePaymentResponse403, ScalevApiWebOrderControllerCreatePaymentResponse404, ScalevApiWebOrderControllerCreateResponse200, ScalevApiWebOrderControllerCreateResponse400, ScalevApiWebOrderControllerCreateResponse401, ScalevApiWebOrderControllerCreateSshBodyParam, ScalevApiWebOrderControllerCreateSshMetadataParam, ScalevApiWebOrderControllerCreateSshResponse200, ScalevApiWebOrderControllerCreateSshResponse400, ScalevApiWebOrderControllerCreateSshResponse401, ScalevApiWebOrderControllerDeleteBodyParam, ScalevApiWebOrderControllerDeleteResponse200, ScalevApiWebOrderControllerDeleteResponse400, ScalevApiWebOrderControllerDeleteResponse401, ScalevApiWebOrderControllerDuplicateAndCancelBodyParam, ScalevApiWebOrderControllerDuplicateAndCancelMetadataParam, ScalevApiWebOrderControllerDuplicateAndCancelResponse200, ScalevApiWebOrderControllerDuplicateAndCancelResponse400, ScalevApiWebOrderControllerDuplicateAndCancelResponse401, ScalevApiWebOrderControllerDuplicateAndCancelResponse403, ScalevApiWebOrderControllerDuplicateAndCancelResponse404, ScalevApiWebOrderControllerGenerateAwbBodyParam, ScalevApiWebOrderControllerGenerateAwbResponse200, ScalevApiWebOrderControllerGenerateAwbResponse400, ScalevApiWebOrderControllerGenerateAwbResponse401, ScalevApiWebOrderControllerMarkNotSpamBodyParam, ScalevApiWebOrderControllerMarkNotSpamResponse200, ScalevApiWebOrderControllerMarkNotSpamResponse400, ScalevApiWebOrderControllerMarkNotSpamResponse401, ScalevApiWebOrderControllerTriggerPurchaseEventMetadataParam, ScalevApiWebOrderControllerTriggerPurchaseEventResponse200, ScalevApiWebOrderControllerTriggerPurchaseEventResponse400, ScalevApiWebOrderControllerTriggerPurchaseEventResponse401, ScalevApiWebOrderControllerTriggerPurchaseEventResponse403, ScalevApiWebOrderControllerTriggerPurchaseEventResponse404, ScalevApiWebOrderControllerUpdateBodyParam, ScalevApiWebOrderControllerUpdateCustomerBodyParam, ScalevApiWebOrderControllerUpdateCustomerMetadataParam, ScalevApiWebOrderControllerUpdateCustomerResponse200, ScalevApiWebOrderControllerUpdateCustomerResponse400, ScalevApiWebOrderControllerUpdateCustomerResponse401, ScalevApiWebOrderControllerUpdateCustomerResponse403, ScalevApiWebOrderControllerUpdateCustomerResponse404, ScalevApiWebOrderControllerUpdateMetadataParam, ScalevApiWebOrderControllerUpdateReceiptBodyParam, ScalevApiWebOrderControllerUpdateReceiptMetadataParam, ScalevApiWebOrderControllerUpdateReceiptResponse200, ScalevApiWebOrderControllerUpdateReceiptResponse400, ScalevApiWebOrderControllerUpdateReceiptResponse401, ScalevApiWebOrderControllerUpdateReceiptResponse403, ScalevApiWebOrderControllerUpdateReceiptResponse404, ScalevApiWebOrderControllerUpdateResponse200, ScalevApiWebOrderControllerUpdateResponse400, ScalevApiWebOrderControllerUpdateResponse401, ScalevApiWebOrderControllerUpdateResponse403, ScalevApiWebOrderControllerUpdateResponse404, ScalevApiWebOrderControllerUpdateShipmentRawBodyParam, ScalevApiWebOrderControllerUpdateShipmentRawMetadataParam, ScalevApiWebOrderControllerUpdateShipmentRawResponse200, ScalevApiWebOrderControllerUpdateShipmentRawResponse400, ScalevApiWebOrderControllerUpdateShipmentRawResponse401, ScalevApiWebOrderControllerUpdateShipmentRawResponse403, ScalevApiWebOrderControllerUpdateShipmentRawResponse404, ScalevApiWebOrderControllerUpdateTagsBodyParam, ScalevApiWebOrderControllerUpdateTagsMetadataParam, ScalevApiWebOrderControllerUpdateTagsResponse200, ScalevApiWebOrderControllerUpdateTagsResponse400, ScalevApiWebOrderControllerUpdateTagsResponse401, ScalevApiWebOrderControllerUpdateTagsResponse403, ScalevApiWebOrderControllerUpdateTagsResponse404, ScalevApiWebOrderControllerUploadChangeStatusBodyParam, ScalevApiWebOrderControllerUploadChangeStatusResponse200, ScalevApiWebOrderControllerUploadChangeStatusResponse400, ScalevApiWebOrderControllerUploadChangeStatusResponse401, ScalevApiWebOrderControllerUploadOrdersBodyParam, ScalevApiWebOrderControllerUploadOrdersResponse200, ScalevApiWebOrderControllerUploadOrdersResponse400, ScalevApiWebOrderControllerUploadOrdersResponse401, ScalevApiWebOrderControllerUploadReceiptBodyParam, ScalevApiWebOrderControllerUploadReceiptResponse200, ScalevApiWebOrderControllerUploadReceiptResponse400, ScalevApiWebOrderControllerUploadReceiptResponse401, ScalevApiWebOrderViewControllerCheckOrderPaymentMetadataParam, ScalevApiWebOrderViewControllerCheckOrderPaymentResponse200, ScalevApiWebOrderViewControllerCheckOrderPaymentResponse400, ScalevApiWebOrderViewControllerCheckOrderPaymentResponse401, ScalevApiWebOrderViewControllerCheckOrderPaymentResponse403, ScalevApiWebOrderViewControllerCheckOrderPaymentResponse404, ScalevApiWebOrderViewControllerCheckOrderSettlementMetadataParam, ScalevApiWebOrderViewControllerCheckOrderSettlementResponse200, ScalevApiWebOrderViewControllerCheckOrderSettlementResponse400, ScalevApiWebOrderViewControllerCheckOrderSettlementResponse401, ScalevApiWebOrderViewControllerCheckOrderSettlementResponse403, ScalevApiWebOrderViewControllerCheckOrderSettlementResponse404, ScalevApiWebOrderViewControllerGetAvailableActionsMetadataParam, ScalevApiWebOrderViewControllerGetAvailableActionsResponse200, ScalevApiWebOrderViewControllerGetAvailableActionsResponse400, ScalevApiWebOrderViewControllerGetAvailableActionsResponse401, ScalevApiWebOrderViewControllerGetAvailableActionsResponse403, ScalevApiWebOrderViewControllerGetAvailableActionsResponse404, ScalevApiWebOrderViewControllerGetChatTextMetadataParam, ScalevApiWebOrderViewControllerGetChatTextResponse200, ScalevApiWebOrderViewControllerGetChatTextResponse400, ScalevApiWebOrderViewControllerGetChatTextResponse401, ScalevApiWebOrderViewControllerGetChatTextResponse403, ScalevApiWebOrderViewControllerGetChatTextResponse404, ScalevApiWebOrderViewControllerGetOneChatTextMetadataParam, ScalevApiWebOrderViewControllerGetOneChatTextResponse200, ScalevApiWebOrderViewControllerGetOneChatTextResponse400, ScalevApiWebOrderViewControllerGetOneChatTextResponse401, ScalevApiWebOrderViewControllerGetOneChatTextResponse403, ScalevApiWebOrderViewControllerGetOneChatTextResponse404, ScalevApiWebOrderViewControllerIndexMetadataParam, ScalevApiWebOrderViewControllerIndexOrderEmailsMetadataParam, ScalevApiWebOrderViewControllerIndexOrderEmailsResponse200, ScalevApiWebOrderViewControllerIndexOrderEmailsResponse400, ScalevApiWebOrderViewControllerIndexOrderEmailsResponse401, ScalevApiWebOrderViewControllerIndexOrderEmailsResponse403, ScalevApiWebOrderViewControllerIndexOrderEmailsResponse404, ScalevApiWebOrderViewControllerIndexResponse200, ScalevApiWebOrderViewControllerIndexResponse400, ScalevApiWebOrderViewControllerIndexResponse401, ScalevApiWebOrderViewControllerIndexResponse403, ScalevApiWebOrderViewControllerIndexResponse404, ScalevApiWebOrderViewControllerIndexStatisticsMetadataParam, ScalevApiWebOrderViewControllerIndexStatisticsResponse200, ScalevApiWebOrderViewControllerIndexStatisticsResponse400, ScalevApiWebOrderViewControllerIndexStatisticsResponse401, ScalevApiWebOrderViewControllerIndexTagsMetadataParam, ScalevApiWebOrderViewControllerIndexTagsResponse200, ScalevApiWebOrderViewControllerIndexTagsResponse400, ScalevApiWebOrderViewControllerIndexTagsResponse401, ScalevApiWebOrderViewControllerIndexTagsResponse403, ScalevApiWebOrderViewControllerIndexTagsResponse404, ScalevApiWebOrderViewControllerIndexUtmCampaignsMetadataParam, ScalevApiWebOrderViewControllerIndexUtmCampaignsResponse200, ScalevApiWebOrderViewControllerIndexUtmCampaignsResponse400, ScalevApiWebOrderViewControllerIndexUtmCampaignsResponse401, ScalevApiWebOrderViewControllerIndexUtmCampaignsResponse403, ScalevApiWebOrderViewControllerIndexUtmCampaignsResponse404, ScalevApiWebOrderViewControllerIndexUtmContentsMetadataParam, ScalevApiWebOrderViewControllerIndexUtmContentsResponse200, ScalevApiWebOrderViewControllerIndexUtmContentsResponse400, ScalevApiWebOrderViewControllerIndexUtmContentsResponse401, ScalevApiWebOrderViewControllerIndexUtmContentsResponse403, ScalevApiWebOrderViewControllerIndexUtmContentsResponse404, ScalevApiWebOrderViewControllerIndexUtmMediumsMetadataParam, ScalevApiWebOrderViewControllerIndexUtmMediumsResponse200, ScalevApiWebOrderViewControllerIndexUtmMediumsResponse400, ScalevApiWebOrderViewControllerIndexUtmMediumsResponse401, ScalevApiWebOrderViewControllerIndexUtmMediumsResponse403, ScalevApiWebOrderViewControllerIndexUtmMediumsResponse404, ScalevApiWebOrderViewControllerIndexUtmSourcesMetadataParam, ScalevApiWebOrderViewControllerIndexUtmSourcesResponse200, ScalevApiWebOrderViewControllerIndexUtmSourcesResponse400, ScalevApiWebOrderViewControllerIndexUtmSourcesResponse401, ScalevApiWebOrderViewControllerIndexUtmSourcesResponse403, ScalevApiWebOrderViewControllerIndexUtmSourcesResponse404, ScalevApiWebOrderViewControllerIndexUtmTermsMetadataParam, ScalevApiWebOrderViewControllerIndexUtmTermsResponse200, ScalevApiWebOrderViewControllerIndexUtmTermsResponse400, ScalevApiWebOrderViewControllerIndexUtmTermsResponse401, ScalevApiWebOrderViewControllerIndexUtmTermsResponse403, ScalevApiWebOrderViewControllerIndexUtmTermsResponse404, ScalevApiWebOrderViewControllerSendLmsAccessMetadataParam, ScalevApiWebOrderViewControllerSendLmsAccessResponse200, ScalevApiWebOrderViewControllerSendLmsAccessResponse400, ScalevApiWebOrderViewControllerSendLmsAccessResponse401, ScalevApiWebOrderViewControllerSendLmsAccessResponse403, ScalevApiWebOrderViewControllerSendLmsAccessResponse404, ScalevApiWebOrderViewControllerSendProductDigitalMetadataParam, ScalevApiWebOrderViewControllerSendProductDigitalResponse200, ScalevApiWebOrderViewControllerSendProductDigitalResponse401, ScalevApiWebOrderViewControllerSendProductDigitalResponse404, ScalevApiWebOrderViewControllerShowByPgReferenceIdMetadataParam, ScalevApiWebOrderViewControllerShowByPgReferenceIdResponse200, ScalevApiWebOrderViewControllerShowByPgReferenceIdResponse400, ScalevApiWebOrderViewControllerShowByPgReferenceIdResponse401, ScalevApiWebOrderViewControllerShowByPgReferenceIdResponse403, ScalevApiWebOrderViewControllerShowByPgReferenceIdResponse404, ScalevApiWebOrderViewControllerShowByPgReferenceIdsMetadataParam, ScalevApiWebOrderViewControllerShowByPgReferenceIdsResponse200, ScalevApiWebOrderViewControllerShowByPgReferenceIdsResponse400, ScalevApiWebOrderViewControllerShowByPgReferenceIdsResponse401, ScalevApiWebOrderViewControllerShowMessageHistoryMetadataParam, ScalevApiWebOrderViewControllerShowMessageHistoryResponse200, ScalevApiWebOrderViewControllerShowMessageHistoryResponse400, ScalevApiWebOrderViewControllerShowMessageHistoryResponse401, ScalevApiWebOrderViewControllerShowMessageHistoryResponse403, ScalevApiWebOrderViewControllerShowMessageHistoryResponse404, ScalevApiWebOrderViewControllerShowMetadataParam, ScalevApiWebOrderViewControllerShowResponse200, ScalevApiWebOrderViewControllerShowResponse400, ScalevApiWebOrderViewControllerShowResponse401, ScalevApiWebOrderViewControllerShowResponse403, ScalevApiWebOrderViewControllerShowResponse404, ScalevApiWebProductControllerCreateBodyParam, ScalevApiWebProductControllerCreateFucBodyParam, ScalevApiWebProductControllerCreateFucMetadataParam, ScalevApiWebProductControllerCreateFucResponse200, ScalevApiWebProductControllerCreateFucResponse400, ScalevApiWebProductControllerCreateFucResponse401, ScalevApiWebProductControllerCreatePartnerBodyParam, ScalevApiWebProductControllerCreatePartnerMetadataParam, ScalevApiWebProductControllerCreatePartnerResponse200, ScalevApiWebProductControllerCreatePartnerResponse400, ScalevApiWebProductControllerCreatePartnerResponse401, ScalevApiWebProductControllerCreatePartnerResponse403, ScalevApiWebProductControllerCreatePartnerResponse404, ScalevApiWebProductControllerCreateResponse200, ScalevApiWebProductControllerCreateResponse400, ScalevApiWebProductControllerCreateResponse401, ScalevApiWebProductControllerDeleteDigitalProductFileMetadataParam, ScalevApiWebProductControllerDeleteDigitalProductFileResponse200, ScalevApiWebProductControllerDeleteDigitalProductFileResponse400, ScalevApiWebProductControllerDeleteDigitalProductFileResponse401, ScalevApiWebProductControllerDeleteDigitalProductFileResponse403, ScalevApiWebProductControllerDeleteDigitalProductFileResponse404, ScalevApiWebProductControllerDeleteFucMetadataParam, ScalevApiWebProductControllerDeleteFucResponse200, ScalevApiWebProductControllerDeleteFucResponse400, ScalevApiWebProductControllerDeleteFucResponse401, ScalevApiWebProductControllerDeleteFucResponse403, ScalevApiWebProductControllerDeleteFucResponse404, ScalevApiWebProductControllerDeleteMetadataParam, ScalevApiWebProductControllerDeletePartnerMetadataParam, ScalevApiWebProductControllerDeletePartnerResponse200, ScalevApiWebProductControllerDeletePartnerResponse400, ScalevApiWebProductControllerDeletePartnerResponse401, ScalevApiWebProductControllerDeletePartnerResponse403, ScalevApiWebProductControllerDeletePartnerResponse404, ScalevApiWebProductControllerDeleteResponse200, ScalevApiWebProductControllerDeleteResponse400, ScalevApiWebProductControllerDeleteResponse401, ScalevApiWebProductControllerDeleteResponse403, ScalevApiWebProductControllerDeleteResponse404, ScalevApiWebProductControllerGenerateFucMetadataParam, ScalevApiWebProductControllerGenerateFucResponse200, ScalevApiWebProductControllerGenerateFucResponse400, ScalevApiWebProductControllerGenerateFucResponse401, ScalevApiWebProductControllerGenerateFucResponse403, ScalevApiWebProductControllerGenerateFucResponse404, ScalevApiWebProductControllerIndexDigitalProductFilesMetadataParam, ScalevApiWebProductControllerIndexDigitalProductFilesResponse200, ScalevApiWebProductControllerIndexDigitalProductFilesResponse400, ScalevApiWebProductControllerIndexDigitalProductFilesResponse401, ScalevApiWebProductControllerIndexFucsMetadataParam, ScalevApiWebProductControllerIndexFucsResponse200, ScalevApiWebProductControllerIndexFucsResponse400, ScalevApiWebProductControllerIndexFucsResponse401, ScalevApiWebProductControllerIndexMetadataParam, ScalevApiWebProductControllerIndexPartnersMetadataParam, ScalevApiWebProductControllerIndexPartnersResponse200, ScalevApiWebProductControllerIndexPartnersResponse400, ScalevApiWebProductControllerIndexPartnersResponse401, ScalevApiWebProductControllerIndexResponse200, ScalevApiWebProductControllerIndexResponse400, ScalevApiWebProductControllerIndexResponse401, ScalevApiWebProductControllerIndexResponse403, ScalevApiWebProductControllerIndexResponse404, ScalevApiWebProductControllerIndexSimplifiedMetadataParam, ScalevApiWebProductControllerIndexSimplifiedResponse200, ScalevApiWebProductControllerIndexSimplifiedResponse400, ScalevApiWebProductControllerIndexSimplifiedResponse401, ScalevApiWebProductControllerIndexSimplifiedResponse403, ScalevApiWebProductControllerIndexSimplifiedResponse404, ScalevApiWebProductControllerIndexTaxonomiesMetadataParam, ScalevApiWebProductControllerIndexTaxonomiesResponse200, ScalevApiWebProductControllerIndexTaxonomiesResponse400, ScalevApiWebProductControllerIndexTaxonomiesResponse401, ScalevApiWebProductControllerShowCountMetadataParam, ScalevApiWebProductControllerShowCountResponse200, ScalevApiWebProductControllerShowCountResponse401, ScalevApiWebProductControllerShowDigitalProductFileMetadataParam, ScalevApiWebProductControllerShowDigitalProductFileResponse200, ScalevApiWebProductControllerShowDigitalProductFileResponse400, ScalevApiWebProductControllerShowDigitalProductFileResponse401, ScalevApiWebProductControllerShowDigitalProductFileResponse403, ScalevApiWebProductControllerShowDigitalProductFileResponse404, ScalevApiWebProductControllerShowFucMetadataParam, ScalevApiWebProductControllerShowFucResponse200, ScalevApiWebProductControllerShowFucResponse400, ScalevApiWebProductControllerShowFucResponse401, ScalevApiWebProductControllerShowFucResponse403, ScalevApiWebProductControllerShowFucResponse404, ScalevApiWebProductControllerShowMetadataParam, ScalevApiWebProductControllerShowRelationsMetadataParam, ScalevApiWebProductControllerShowRelationsResponse200, ScalevApiWebProductControllerShowRelationsResponse400, ScalevApiWebProductControllerShowRelationsResponse401, ScalevApiWebProductControllerShowRelationsResponse403, ScalevApiWebProductControllerShowRelationsResponse404, ScalevApiWebProductControllerShowResponse200, ScalevApiWebProductControllerShowResponse400, ScalevApiWebProductControllerShowResponse401, ScalevApiWebProductControllerShowResponse403, ScalevApiWebProductControllerShowResponse404, ScalevApiWebProductControllerShowTaxonomyMetadataParam, ScalevApiWebProductControllerShowTaxonomyResponse200, ScalevApiWebProductControllerShowTaxonomyResponse400, ScalevApiWebProductControllerShowTaxonomyResponse401, ScalevApiWebProductControllerShowTaxonomyResponse403, ScalevApiWebProductControllerShowTaxonomyResponse404, ScalevApiWebProductControllerShowVariantMetadataParam, ScalevApiWebProductControllerShowVariantResponse200, ScalevApiWebProductControllerShowVariantResponse400, ScalevApiWebProductControllerShowVariantResponse401, ScalevApiWebProductControllerShowVariantResponse403, ScalevApiWebProductControllerShowVariantResponse404, ScalevApiWebProductControllerUpdateBodyParam, ScalevApiWebProductControllerUpdateFucBodyParam, ScalevApiWebProductControllerUpdateFucMetadataParam, ScalevApiWebProductControllerUpdateFucResponse200, ScalevApiWebProductControllerUpdateFucResponse400, ScalevApiWebProductControllerUpdateFucResponse401, ScalevApiWebProductControllerUpdateFucResponse403, ScalevApiWebProductControllerUpdateFucResponse404, ScalevApiWebProductControllerUpdateMetadataParam, ScalevApiWebProductControllerUpdateResponse200, ScalevApiWebProductControllerUpdateResponse400, ScalevApiWebProductControllerUpdateResponse401, ScalevApiWebProductControllerUpdateResponse403, ScalevApiWebProductControllerUpdateResponse404, ScalevApiWebProductControllerUpdateSharingBodyParam, ScalevApiWebProductControllerUpdateSharingMetadataParam, ScalevApiWebProductControllerUpdateSharingResponse200, ScalevApiWebProductControllerUpdateSharingResponse400, ScalevApiWebProductControllerUpdateSharingResponse401, ScalevApiWebProductControllerUpdateSharingResponse403, ScalevApiWebProductControllerUpdateSharingResponse404, ScalevApiWebShippingCostControllerSearchCourierServicesBodyParam, ScalevApiWebShippingCostControllerSearchCourierServicesResponse200, ScalevApiWebShippingCostControllerSearchCourierServicesResponse400, ScalevApiWebShippingCostControllerSearchCourierServicesResponse401, ScalevApiWebShippingCostControllerSearchCourierServicesResponse403, ScalevApiWebShippingCostControllerSearchCourierServicesResponse404, ScalevApiWebShippingCostControllerSearchShippingCostsBodyParam, ScalevApiWebShippingCostControllerSearchShippingCostsResponse200, ScalevApiWebShippingCostControllerSearchShippingCostsResponse400, ScalevApiWebShippingCostControllerSearchShippingCostsResponse401, ScalevApiWebShippingCostControllerSearchShippingCostsResponse403, ScalevApiWebShippingCostControllerSearchShippingCostsResponse404, ScalevApiWebShippingCostControllerSearchWarehousesBodyParam, ScalevApiWebShippingCostControllerSearchWarehousesResponse200, ScalevApiWebShippingCostControllerSearchWarehousesResponse400, ScalevApiWebShippingCostControllerSearchWarehousesResponse401, ScalevApiWebShippingCostControllerSearchWarehousesResponse403, ScalevApiWebShippingCostControllerSearchWarehousesResponse404, ScalevApiWebStoreControllerAddBposBodyParam, ScalevApiWebStoreControllerAddBposMetadataParam, ScalevApiWebStoreControllerAddBposResponse200, ScalevApiWebStoreControllerAddBposResponse400, ScalevApiWebStoreControllerAddBposResponse401, ScalevApiWebStoreControllerAddBposResponse403, ScalevApiWebStoreControllerAddBposResponse404, ScalevApiWebStoreControllerAddCourierServicesBodyParam, ScalevApiWebStoreControllerAddCourierServicesMetadataParam, ScalevApiWebStoreControllerAddCourierServicesResponse200, ScalevApiWebStoreControllerAddCourierServicesResponse400, ScalevApiWebStoreControllerAddCourierServicesResponse401, ScalevApiWebStoreControllerAddCourierServicesResponse403, ScalevApiWebStoreControllerAddCourierServicesResponse404, ScalevApiWebStoreControllerAddPaymentMethodsBodyParam, ScalevApiWebStoreControllerAddPaymentMethodsMetadataParam, ScalevApiWebStoreControllerAddPaymentMethodsResponse200, ScalevApiWebStoreControllerAddPaymentMethodsResponse400, ScalevApiWebStoreControllerAddPaymentMethodsResponse401, ScalevApiWebStoreControllerAddPaymentMethodsResponse403, ScalevApiWebStoreControllerAddPaymentMethodsResponse404, ScalevApiWebStoreControllerAddProductsBodyParam, ScalevApiWebStoreControllerAddProductsMetadataParam, ScalevApiWebStoreControllerAddProductsResponse200, ScalevApiWebStoreControllerAddProductsResponse400, ScalevApiWebStoreControllerAddProductsResponse401, ScalevApiWebStoreControllerAddProductsResponse403, ScalevApiWebStoreControllerAddProductsResponse404, ScalevApiWebStoreControllerAddStoreAdminsBodyParam, ScalevApiWebStoreControllerAddStoreAdminsMetadataParam, ScalevApiWebStoreControllerAddStoreAdminsResponse200, ScalevApiWebStoreControllerAddStoreAdminsResponse400, ScalevApiWebStoreControllerAddStoreAdminsResponse401, ScalevApiWebStoreControllerAddStoreAdminsResponse403, ScalevApiWebStoreControllerAddStoreAdminsResponse404, ScalevApiWebStoreControllerAddStoreAdvertisersBodyParam, ScalevApiWebStoreControllerAddStoreAdvertisersMetadataParam, ScalevApiWebStoreControllerAddStoreAdvertisersResponse200, ScalevApiWebStoreControllerAddStoreAdvertisersResponse400, ScalevApiWebStoreControllerAddStoreAdvertisersResponse401, ScalevApiWebStoreControllerAddStoreAdvertisersResponse403, ScalevApiWebStoreControllerAddStoreAdvertisersResponse404, ScalevApiWebStoreControllerCreateBodyParam, ScalevApiWebStoreControllerCreateResponse200, ScalevApiWebStoreControllerCreateResponse400, ScalevApiWebStoreControllerCreateResponse401, ScalevApiWebStoreControllerCreateResponse403, ScalevApiWebStoreControllerCreateResponse404, ScalevApiWebStoreControllerDeleteMetadataParam, ScalevApiWebStoreControllerDeleteResponse200, ScalevApiWebStoreControllerDeleteResponse400, ScalevApiWebStoreControllerDeleteResponse401, ScalevApiWebStoreControllerDeleteResponse403, ScalevApiWebStoreControllerDeleteResponse404, ScalevApiWebStoreControllerIndexBundleMetadataParam, ScalevApiWebStoreControllerIndexBundleResponse200, ScalevApiWebStoreControllerIndexBundleResponse400, ScalevApiWebStoreControllerIndexBundleResponse401, ScalevApiWebStoreControllerIndexBundleResponse403, ScalevApiWebStoreControllerIndexBundleResponse404, ScalevApiWebStoreControllerIndexCustomAudiencesMetadataParam, ScalevApiWebStoreControllerIndexCustomAudiencesResponse200, ScalevApiWebStoreControllerIndexCustomAudiencesResponse400, ScalevApiWebStoreControllerIndexCustomAudiencesResponse401, ScalevApiWebStoreControllerIndexCustomAudiencesResponse403, ScalevApiWebStoreControllerIndexCustomAudiencesResponse404, ScalevApiWebStoreControllerIndexMetadataParam, ScalevApiWebStoreControllerIndexPageMetadataParam, ScalevApiWebStoreControllerIndexPageResponse200, ScalevApiWebStoreControllerIndexPageResponse400, ScalevApiWebStoreControllerIndexPageResponse401, ScalevApiWebStoreControllerIndexPageResponse403, ScalevApiWebStoreControllerIndexPageResponse404, ScalevApiWebStoreControllerIndexPaymentAccountMetadataParam, ScalevApiWebStoreControllerIndexPaymentAccountResponse200, ScalevApiWebStoreControllerIndexPaymentAccountResponse400, ScalevApiWebStoreControllerIndexPaymentAccountResponse401, ScalevApiWebStoreControllerIndexPaymentAccountResponse403, ScalevApiWebStoreControllerIndexPaymentAccountResponse404, ScalevApiWebStoreControllerIndexPaymentMethodMetadataParam, ScalevApiWebStoreControllerIndexPaymentMethodResponse200, ScalevApiWebStoreControllerIndexPaymentMethodResponse400, ScalevApiWebStoreControllerIndexPaymentMethodResponse401, ScalevApiWebStoreControllerIndexPaymentMethodResponse403, ScalevApiWebStoreControllerIndexPaymentMethodResponse404, ScalevApiWebStoreControllerIndexProductMetadataParam, ScalevApiWebStoreControllerIndexProductResponse200, ScalevApiWebStoreControllerIndexProductResponse400, ScalevApiWebStoreControllerIndexProductResponse401, ScalevApiWebStoreControllerIndexProductResponse403, ScalevApiWebStoreControllerIndexProductResponse404, ScalevApiWebStoreControllerIndexResponse200, ScalevApiWebStoreControllerIndexResponse400, ScalevApiWebStoreControllerIndexResponse401, ScalevApiWebStoreControllerIndexResponse403, ScalevApiWebStoreControllerIndexResponse404, ScalevApiWebStoreControllerIndexSalesPersonMetadataParam, ScalevApiWebStoreControllerIndexSalesPersonResponse200, ScalevApiWebStoreControllerIndexSalesPersonResponse400, ScalevApiWebStoreControllerIndexSalesPersonResponse401, ScalevApiWebStoreControllerIndexSalesPersonResponse403, ScalevApiWebStoreControllerIndexSalesPersonResponse404, ScalevApiWebStoreControllerIndexSimplifiedMetadataParam, ScalevApiWebStoreControllerIndexSimplifiedResponse200, ScalevApiWebStoreControllerIndexSimplifiedResponse400, ScalevApiWebStoreControllerIndexSimplifiedResponse401, ScalevApiWebStoreControllerIndexSimplifiedResponse403, ScalevApiWebStoreControllerIndexSimplifiedResponse404, ScalevApiWebStoreControllerIndexStoreAdminMetadataParam, ScalevApiWebStoreControllerIndexStoreAdminResponse200, ScalevApiWebStoreControllerIndexStoreAdminResponse400, ScalevApiWebStoreControllerIndexStoreAdminResponse401, ScalevApiWebStoreControllerIndexStoreAdminResponse403, ScalevApiWebStoreControllerIndexStoreAdminResponse404, ScalevApiWebStoreControllerIndexStoreAdvertiserMetadataParam, ScalevApiWebStoreControllerIndexStoreAdvertiserResponse200, ScalevApiWebStoreControllerIndexStoreAdvertiserResponse400, ScalevApiWebStoreControllerIndexStoreAdvertiserResponse401, ScalevApiWebStoreControllerIndexStoreAdvertiserResponse403, ScalevApiWebStoreControllerIndexStoreAdvertiserResponse404, ScalevApiWebStoreControllerRemoveBpoMetadataParam, ScalevApiWebStoreControllerRemoveBpoResponse200, ScalevApiWebStoreControllerRemoveBpoResponse400, ScalevApiWebStoreControllerRemoveBpoResponse401, ScalevApiWebStoreControllerRemoveBpoResponse403, ScalevApiWebStoreControllerRemoveBpoResponse404, ScalevApiWebStoreControllerRemoveCourierServiceBodyParam, ScalevApiWebStoreControllerRemoveCourierServiceMetadataParam, ScalevApiWebStoreControllerRemoveCourierServiceResponse200, ScalevApiWebStoreControllerRemoveCourierServiceResponse400, ScalevApiWebStoreControllerRemoveCourierServiceResponse401, ScalevApiWebStoreControllerRemoveCourierServiceResponse403, ScalevApiWebStoreControllerRemoveCourierServiceResponse404, ScalevApiWebStoreControllerRemovePaymentMethodBodyParam, ScalevApiWebStoreControllerRemovePaymentMethodMetadataParam, ScalevApiWebStoreControllerRemovePaymentMethodResponse200, ScalevApiWebStoreControllerRemovePaymentMethodResponse400, ScalevApiWebStoreControllerRemovePaymentMethodResponse401, ScalevApiWebStoreControllerRemovePaymentMethodResponse403, ScalevApiWebStoreControllerRemovePaymentMethodResponse404, ScalevApiWebStoreControllerRemoveProductMetadataParam, ScalevApiWebStoreControllerRemoveProductResponse200, ScalevApiWebStoreControllerRemoveProductResponse400, ScalevApiWebStoreControllerRemoveProductResponse401, ScalevApiWebStoreControllerRemoveProductResponse403, ScalevApiWebStoreControllerRemoveProductResponse404, ScalevApiWebStoreControllerRemoveStoreAdminMetadataParam, ScalevApiWebStoreControllerRemoveStoreAdminResponse200, ScalevApiWebStoreControllerRemoveStoreAdminResponse400, ScalevApiWebStoreControllerRemoveStoreAdminResponse401, ScalevApiWebStoreControllerRemoveStoreAdminResponse403, ScalevApiWebStoreControllerRemoveStoreAdminResponse404, ScalevApiWebStoreControllerRemoveStoreAdvertiserMetadataParam, ScalevApiWebStoreControllerRemoveStoreAdvertiserResponse200, ScalevApiWebStoreControllerRemoveStoreAdvertiserResponse400, ScalevApiWebStoreControllerRemoveStoreAdvertiserResponse401, ScalevApiWebStoreControllerRemoveStoreAdvertiserResponse403, ScalevApiWebStoreControllerRemoveStoreAdvertiserResponse404, ScalevApiWebStoreControllerShowBpoRelationsMetadataParam, ScalevApiWebStoreControllerShowBpoRelationsResponse200, ScalevApiWebStoreControllerShowBpoRelationsResponse400, ScalevApiWebStoreControllerShowBpoRelationsResponse401, ScalevApiWebStoreControllerShowBpoRelationsResponse403, ScalevApiWebStoreControllerShowBpoRelationsResponse404, ScalevApiWebStoreControllerShowBundleMetadataParam, ScalevApiWebStoreControllerShowBundleResponse200, ScalevApiWebStoreControllerShowBundleResponse400, ScalevApiWebStoreControllerShowBundleResponse401, ScalevApiWebStoreControllerShowBundleResponse403, ScalevApiWebStoreControllerShowBundleResponse404, ScalevApiWebStoreControllerShowMetadataParam, ScalevApiWebStoreControllerShowProductRelationsMetadataParam, ScalevApiWebStoreControllerShowProductRelationsResponse200, ScalevApiWebStoreControllerShowProductRelationsResponse400, ScalevApiWebStoreControllerShowProductRelationsResponse401, ScalevApiWebStoreControllerShowProductRelationsResponse403, ScalevApiWebStoreControllerShowProductRelationsResponse404, ScalevApiWebStoreControllerShowResponse200, ScalevApiWebStoreControllerShowResponse400, ScalevApiWebStoreControllerShowResponse401, ScalevApiWebStoreControllerShowResponse403, ScalevApiWebStoreControllerShowResponse404, ScalevApiWebStoreControllerUpdateBodyParam, ScalevApiWebStoreControllerUpdateMetadataParam, ScalevApiWebStoreControllerUpdateResponse200, ScalevApiWebStoreControllerUpdateResponse400, ScalevApiWebStoreControllerUpdateResponse401, ScalevApiWebStoreControllerUpdateResponse403, ScalevApiWebStoreControllerUpdateResponse404 } from './types';
