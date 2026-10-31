# Revenue Model – Subscription Management System

## 1. Overview

The Subscription Management System will operate as a B2B SaaS platform using a recurring organization-based subscription model.

Businesses will pay a subscription fee to access the platform and manage their customers, staff, products, subscription plans, invoices, payments, and business operations.

The primary revenue source will be monthly and annual SaaS subscriptions.

The initial revenue strategy will focus on acquiring small and medium-sized businesses, validating willingness to pay, and building a sustainable recurring revenue stream.

## 2. Revenue Model

**Business Model:** B2B SaaS – Recurring Subscription Revenue.

The platform will generate revenue by charging organizations for access to their dedicated workspaces.

Primary revenue sources:

- Monthly organization subscriptions.
- Annual organization subscriptions.

Potential future revenue sources:

- Premium subscription tiers.
- Advanced reporting and analytics.
- Enterprise capabilities.
- Premium integrations.
- Additional business modules.

The initial MVP will not generate transaction-based commissions because payment gateway integration is outside the current scope.

## 3. Target Customers

The initial target customers will be small and growing organizations that manage recurring products or services.

Potential customer segments include:

- Subscription-based service providers.
- Coaching and educational businesses.
- Gyms and fitness centers.
- Tiffin and meal subscription businesses.
- Maintenance and recurring service providers.
- Equipment and asset rental businesses.
- Small and medium-sized enterprises.

The primary focus will be businesses currently managing recurring subscriptions, customer records, invoices, and payment tracking manually or through disconnected systems.

## 4. Initial Pricing Strategy

The recommended launch strategy is to introduce one straightforward paid subscription plan.

| Plan | Monthly Price | Annual Price |
|---|---:|---:|
| Early Access | ₹999 | ₹9,990 |

Annual subscribers receive a discount equivalent to approximately two months of the monthly subscription price.

### Initial Plan Inclusions

- Organization workspace.
- Staff and customer management.
- Product and plan management.
- Subscription lifecycle management.
- Automatic recurring invoice generation.
- Manual payment recording and allocation.
- Invoice PDF generation.
- Customer portal.
- Organization dashboards.
- Real-time notifications.
- Role-based staff permissions.

The initial pricing is a commercial proposal and should be validated through customer interviews and actual paid conversions.

The final plan should also define reasonable usage limits for organizations, staff, and customers before launch.

## 5. Future Pricing Structure

After validating the initial pricing strategy, additional subscription tiers can be introduced.

| Plan | Indicative Monthly Price | Target Audience |
|---|---:|---|
| Starter | ₹999 | Small businesses |
| Growth | ₹1,999 | Growing organizations |
| Business | ₹3,999 | Larger organizations |

Potential differences between plans may include:

- Number of staff members.
- Number of customers.
- Number of active subscriptions.
- Advanced reporting capabilities.
- Additional integrations.
- Administrative capabilities.

These pricing tiers are future proposals, not part of the current MVP implementation.

They should only be introduced when the corresponding usage limits and premium capabilities are supported by the application.

## 6. Customer Acquisition Strategy

Initial customer acquisition should prioritize low-cost and direct channels.

Recommended acquisition channels:

1. Direct outreach to relevant businesses.
2. Product demonstrations.
3. Referrals from existing organizations.
4. Business communities and professional networks.
5. LinkedIn and relevant social platforms.
6. Partnerships with business consultants and service providers.

During the initial stage, founder-led sales and customer onboarding are recommended.

The objective is to acquire the first paying organizations, understand their requirements, and validate the product's commercial value.

## 7. Customer Acquisition Assumptions

The following figures are initial planning assumptions, not validated market data.

| Metric | Initial Planning Target |
|---|---:|
| Monthly subscription price | ₹999 |
| Annual subscription price | ₹9,990 |
| Monthly customer acquisition cost (cash) | ₹1,000–₹3,000 |
| Target monthly organization churn | Below 3% |
| Initial acquisition strategy | Direct outreach and referrals |

Customer Acquisition Cost (CAC) should be calculated as:

**CAC = Total Sales and Marketing Acquisition Cost / Number of New Paying Organizations**

Founder time and other non-cash acquisition costs should also be tracked separately.

## 8. Revenue Projections

The following projections use the proposed ₹999 monthly subscription plan.

These are illustrative business targets, not guaranteed forecasts.

### Base-Case Customer Growth

| Timeline | Paying Organizations | Monthly Recurring Revenue |
|---|---:|---:|
| Month 3 | 5 | ₹4,995 |
| Month 6 | 12 | ₹11,988 |
| Month 9 | 20 | ₹19,980 |
| Month 12 | 30 | ₹29,970 |

### Month 12 Revenue Scenarios

| Scenario | Paying Organizations | Monthly Revenue |
|---|---:|---:|
| Conservative | 20 | ₹19,980 |
| Base Case | 30 | ₹29,970 |
| Optimistic | 50 | ₹49,950 |

### Annualized Recurring Revenue

| Scenario | Monthly Revenue | Annualized Revenue |
|---|---:|---:|
| Conservative | ₹19,980 | ₹2,39,760 |
| Base Case | ₹29,970 | ₹3,59,640 |
| Optimistic | ₹49,950 | ₹5,99,400 |

Annualized revenue represents the monthly recurring revenue multiplied by twelve. It is not the actual cash collected during the first year.

The projections assume all organizations pay the monthly launch price and exclude taxes, discounts, refunds, and customer churn.

## 9. Operating Expenses

The primary operating expense categories will include:

- Frontend hosting.
- Backend hosting.
- Database hosting.
- Domain and deployment expenses.
- SMTP and transactional email services.
- Monitoring and maintenance.
- Customer acquisition and marketing.
- Ongoing development and support.

The initial infrastructure should remain relatively inexpensive by using the selected deployment architecture.

Redis, payment gateway services, and additional notification infrastructure are not required for the initial MVP.

Exact monthly operating costs will be established after selecting hosting plans and measuring actual application usage.

## 10. Break-Even Analysis

Break-even will depend on the monthly subscription revenue and total operating expenses.

The basic calculation is:

**Contribution per Organization = Monthly Subscription Price − Variable Cost per Organization**

**Break-Even Organizations = Monthly Fixed Operating Expenses / Contribution per Organization**

For illustration, assume:

- Monthly subscription price: ₹999.
- Variable cost allowance: ₹50 per organization.
- Monthly fixed operating expenses: ₹15,000.

Contribution per organization:

₹999 − ₹50 = ₹949.

Estimated break-even:

₹15,000 / ₹949 = Approximately 16 paying organizations.

This is an illustrative operating break-even calculation. It excludes development salaries, founder compensation, taxes, legal expenses, and other unaccounted costs.

Actual break-even will be calculated using real operating expenses.

## 11. Payment Collection Strategy

Payment gateway integration is excluded from the current MVP.

Therefore, the platform's own SaaS subscription collection will initially be handled manually.

Proposed process:

1. Super Admin provisions an organization.
2. The organization receives its owner activation invitation.
3. The platform operator communicates the SaaS subscription invoice separately.
4. The organization pays through UPI or bank transfer.
5. Payment is verified manually.
6. The organization's access is activated or renewed operationally.
7. The next renewal date is tracked separately.

**Important:** The existing payment management module handles payments received by tenant organizations from their own customers. It does not implement billing for subscriptions to our SaaS platform.

Automated platform subscription billing, payment gateway integration, and tenant-level subscription enforcement are outside the documented MVP scope.

## 12. Customer Retention Strategy

Recurring revenue depends on retaining organizations over time.

The primary retention priorities will be:

- Reliable invoice generation.
- Accurate subscription tracking.
- Convenient customer management.
- Reliable payment records.
- Useful business dashboards.
- Secure staff permissions.
- Consistent application performance.
- Responsive customer support.

Customer churn should be monitored regularly to identify product and service improvements.

## 13. Key Financial Metrics

The following metrics should be tracked after launch:

| Metric | Description |
|---|---|
| MRR | Monthly Recurring Revenue |
| ARR | Annualized Recurring Revenue |
| CAC | Customer Acquisition Cost |
| LTV | Customer Lifetime Value |
| Churn Rate | Percentage of paying organizations lost |
| Conversion Rate | Percentage of prospects converted into paying customers |
| ARPA | Average Revenue Per Organization |
| Gross Margin | Revenue remaining after direct service delivery costs |

These metrics will help evaluate customer acquisition efficiency, revenue growth, and long-term business sustainability.

## 14. Future Monetization Opportunities

After validating the initial business model, additional monetization opportunities may include:

- Multiple subscription tiers.
- Advanced reporting and analytics.
- Payment gateway integrations.
- Advanced billing and discount management.
- Enterprise capabilities.
- Additional integrations.
- Premium onboarding and support services.

These opportunities will be evaluated based on customer demand, implementation costs, and revenue potential.

## 15. Final Recommendation

The recommended initial revenue model is a single B2B SaaS subscription priced at ₹999 per month or ₹9,990 per year.

The initial commercial objective should be to acquire the first 20–30 paying organizations, validate willingness to pay, and establish consistent customer retention.

The business should prioritize recurring customer value rather than premature pricing complexity or aggressive revenue projections.

After validating the initial model, additional pricing tiers and monetization opportunities can be introduced.

**Recommended Strategy: Start with simple pricing, validate paid adoption, retain organizations, and gradually scale recurring revenue.**