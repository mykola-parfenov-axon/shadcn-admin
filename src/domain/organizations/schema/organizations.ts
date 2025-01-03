/* eslint-disable @typescript-eslint/no-unused-vars */
import z from 'zod'

const Organization = z.object({
  organizationId: z.string(),
  name: z.string(),
  createdAt: z.string(),
})

export type IOrganization = z.infer<typeof Organization>

export const CreateOrganizationBody = z.object({
  name: z.string().trim().min(1).max(50),
  url: z.string().url().trim().min(1).max(250),
})

export type ICreateOrganization = z.infer<typeof CreateOrganizationBody>

const OrganizationDetails = z.object({
  organizationId: z.string(),
  name: z.string(),
  url: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type IOrganizationDetails = z.infer<typeof OrganizationDetails>

const Customer = z.object({
  customerId: z.string(),
  name: z.string(),
  createdAt: z.string(),
})

export type ICustomer = z.infer<typeof Customer>

const RecurringInterval = z.union([
  z.literal('DAY'),
  z.literal('WEEK'),
  z.literal('MONTH'),
  z.literal('YEAR'),
])

const SubscriptionItem = z.object({
  subscriptionItemId: z.string(),
  amount: z.number(),
  currency: z.string(),
  discount: z.number(),
  nextPeriodAmount: z.number(),
  nextPeriodDiscount: z.number(),
  nextPeriodQuantity: z.number(),
  nextPeriodTotalAmount: z.number(),
  quantity: z.number(),
  subscriptionItemVersion: z.number(),
  totalAmount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  productName: z.string(),
})

export type ISubscriptionItem = z.infer<typeof SubscriptionItem>

const CustomerSubscription = z.object({
  subscriptionId: z.string(),
  nextPeriodFrom: z.string().optional(),
  nextPeriodTo: z.string().optional(),
  periodFrom: z.string().optional(),
  periodTo: z.string().optional(),
  priceType: z.literal('RECURRING'),
  recurringInterval: RecurringInterval,
  status: z.union([z.literal('ACTIVE'), z.literal('INACTIVE')]),
  createdAt: z.string(),
  updatedAt: z.string(),
  items: z.array(SubscriptionItem),
})

const CustomerDetails = z.object({
  customerId: z.string(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  subscriptions: z.array(CustomerSubscription),
})

export type ICustomerDetails = z.infer<typeof CustomerDetails>

const CustomerInvoice = z.object({
  invoiceId: z.string(),
  totalAmount: z.number(),
  currency: z.string(),
  periodFrom: z.string(),
  periodTo: z.string(),
  createdAt: z.string(),
})

export type ICustomerInvoice = z.infer<typeof CustomerInvoice>

const ProductPrice = z.object({
  priceId: z.string(),
  amount: z.number(),
  currency: z.string(),
  recurringInterval: RecurringInterval,
})

const Product = z.object({
  productId: z.string(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  prices: z.array(ProductPrice),
})

export type IProduct = z.infer<typeof Product>

const ProductPriceDetails = z.object({
  priceId: z.string(),
  amount: z.number(),
  currency: z.string(),
  priceType: z.literal('RECURRING'),
  rateType: z.union([z.literal('QUANTIFIED'), z.literal('METERED')]),
  recurringInterval: RecurringInterval,
  createdAt: z.string(),
  updateAt: z.string(),
  priceModel: z.literal('STANDARD'),
  subscriptions: z.number(),
})

const ProductDetails = z.object({
  productId: z.string(),
  name: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
  prices: z.array(ProductPriceDetails),
})

export type IProductDetails = z.infer<typeof ProductDetails>

const OrganizationApiKey = z.object({
  apiKey: z.string(),
})

export type IOrganizationApiKey = z.infer<typeof OrganizationApiKey>
