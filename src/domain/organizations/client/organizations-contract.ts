import z from 'zod'
import { createQueryKeys } from '@lukemorales/query-key-factory'
import { ClientInferRequest, initContract } from '@ts-rest/core'
import {
  IOrganization,
  CreateOrganizationBody,
  IOrganizationDetails,
  ICustomer,
  ICustomerDetails,
  ICustomerInvoice,
  IProduct,
  IProductDetails,
  IOrganizationApiKey,
} from '../schema/organizations'

const c = initContract()

export const organizationsContract = c.router(
  {
    getOrganizations: {
      method: 'GET',
      path: '/admin/organizations',
      query: z
        .object({
          sort: z.string().nullable(),
          direction: z.string().or(z.undefined()),
          skip: z.number().int().nonnegative().or(z.undefined()),
          limit: z.number().int().nonnegative(),
        })
        .partial(),
      responses: {
        200: c.type<Array<IOrganization>>(),
      },
    },
    createOrganization: {
      method: 'POST',
      path: '/admin/organizations',
      body: CreateOrganizationBody,
      responses: {
        204: c.type(),
      },
    },
    getOrganizationDetails: {
      method: 'GET',
      path: '/admin/organizations/:organizationId',
      pathParams: z.object({
        organizationId: z.string(),
      }),
      responses: {
        200: c.type<IOrganizationDetails>(),
      },
    },
    getOrganizationCustomers: {
      method: 'GET',
      path: '/admin/organizations/:organizationId/customers',
      pathParams: z.object({
        organizationId: z.string(),
      }),
      query: z
        .object({
          sort: z.string().nullable(),
          direction: z.string().or(z.undefined()),
          skip: z.number().int().nonnegative().or(z.undefined()),
          limit: z.number().int().nonnegative(),
          search: z.string().or(z.undefined()),
        })
        .partial(),
      responses: {
        200: c.type<Array<ICustomer>>(),
      },
    },
    getCustomerDetails: {
      method: 'GET',
      path: '/admin/organizations/:organizationId/customers/:customerId',
      pathParams: z.object({
        organizationId: z.string(),
        customerId: z.string(),
      }),
      responses: {
        200: c.type<ICustomerDetails>(),
      },
    },
    getCustomerInvoices: {
      method: 'GET',
      path: '/admin/organizations/:organizationId/customers/:customerId/invoices',
      pathParams: z.object({
        organizationId: z.string(),
        customerId: z.string(),
      }),
      query: z
        .object({
          sort: z.string().nullable(),
          direction: z.string().or(z.undefined()),
          skip: z.number().int().nonnegative().or(z.undefined()),
          limit: z.number().int().nonnegative(),
        })
        .partial(),
      responses: {
        200: c.type<Array<ICustomerInvoice>>(),
      },
    },
    getOrganizationProducts: {
      method: 'GET',
      path: '/admin/organizations/:organizationId/products',
      pathParams: z.object({
        organizationId: z.string(),
      }),
      query: z
        .object({
          sort: z.string().nullable(),
          direction: z.string().or(z.undefined()),
          skip: z.number().int().nonnegative().or(z.undefined()),
          limit: z.number().int().nonnegative(),
        })
        .partial(),
      responses: {
        200: c.type<Array<IProduct>>(),
      },
    },
    getProductDetails: {
      method: 'GET',
      path: '/admin/organizations/:organizationId/products/:productId',
      pathParams: z.object({
        organizationId: z.string(),
        productId: z.string(),
      }),
      responses: {
        200: c.type<IProductDetails>(),
      },
    },
    finishBillingCycleOnSubscription: {
      method: 'POST',
      path: '/admin/organizations/:organizationId/subscriptions/:subscriptionId/finish',
      pathParams: z.object({
        organizationId: z.string(),
        subscriptionId: z.string(),
      }),
      body: null,
      responses: {
        204: c.type(),
      },
    },
    regenerateOrganizationApiKey: {
      method: 'PUT',
      path: '/admin/organizations/:organizationId/api-keys',
      pathParams: z.object({
        organizationId: z.string(),
      }),
      body: null,
      responses: {
        200: c.type<IOrganizationApiKey>(),
      },
    },
  },
  {
    strictStatusCodes: true,
    pathPrefix: '/api/billing',
  }
)

type Req = ClientInferRequest<typeof organizationsContract>

export const organizationsQueryKeys = createQueryKeys('organizations', {
  organizationsList: (params: Req['getOrganizations']) => [params],
  createOrganization: (params: Req['createOrganization']) => [params],
  organizationDetails: (params: Req['getOrganizationDetails']) => [params],
  customers: (params: Req['getOrganizationCustomers']) => [params],
  customerDetails: (params: Req['getCustomerDetails']) => [params],
  customerInvoices: (params: Req['getCustomerInvoices']) => [params],
  products: (params: Req['getOrganizationProducts']) => [params],
  productDetails: (params: Req['getProductDetails']) => [params],
  finishBillingCycleOnSubscription: (
    params: Req['finishBillingCycleOnSubscription']
  ) => [params],
  regenerateOrganizationApiKey: (
    params: Req['regenerateOrganizationApiKey']
  ) => [params],
})
