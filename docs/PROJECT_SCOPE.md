# Project Scope – Subscription Management System

## 1. Project Overview

The Subscription Management System is a multi-tenant B2B SaaS application designed to help organizations manage recurring products and services through a centralized platform.

The system will provide organizations with dedicated workspaces to manage customers, staff, products, subscription plans, subscriptions, invoices, payments, and notifications.

A platform-level Super Admin will manage the SaaS platform and provision organizations, while each organization will independently manage its business operations.

The primary objective is to develop a focused, secure, and reliable MVP that covers the complete subscription management workflow.

## 2. Project Objectives

The main objectives of the project are:

- Centralize subscription and customer management.
- Simplify recurring billing and invoice generation.
- Maintain accurate payment and outstanding balance records.
- Provide secure organization-level data isolation.
- Support configurable staff permissions.
- Provide customers with access to their subscriptions and invoices.
- Deliver useful dashboards for monitoring business activity.
- Establish a maintainable foundation for future SaaS expansion.

## 3. Application Structure

The application will follow a multi-tenant SaaS architecture.

```text
SaaS Platform
    |
    └── Super Admin
          |
          ├── Organization A
          |     ├── Owner / Admin
          |     ├── Staff
          |     ├── Customers
          |     ├── Products
          |     ├── Subscription Plans
          |     ├── Subscriptions
          |     ├── Invoices
          |     ├── Payments
          |     └── Notifications
          |
          └── Organization B
                ├── Owner / Admin
                ├── Staff
                ├── Customers
                ├── Products
                ├── Subscription Plans
                ├── Subscriptions
                ├── Invoices
                ├── Payments
                └── Notifications
```

Each organization will operate within its own logically isolated workspace.

All tenant-owned records must be associated with an `organizationId`.

## 4. User Roles & Responsibilities

### 4.1 Super Admin

The Super Admin operates at the platform level.

Responsibilities:

- Create and provision organizations.
- Generate organization-owner activation invitations.
- View organization lists and basic organization details.
- Activate and suspend organizations.
- Resend or revoke owner invitations.
- Perform platform-level support and oversight.

Super Admin access will remain separate from organization-level administration. Tenant business data will not be accessible by default.

### 4.2 Organization Owner / Admin

The Organization Owner manages the organization's workspace.

Responsibilities:

- Manage organization operations.
- Invite and manage staff.
- Assign staff permissions.
- Manage customer records.
- Configure products and subscription plans.
- Create and manage subscriptions.
- Manage invoices and payments.
- Monitor dashboards and notifications.

### 4.3 Staff

Staff members operate within the permissions assigned by the organization owner.

Responsibilities may include:

- Customer management.
- Product and plan management.
- Subscription management.
- Invoice management.
- Payment recording.
- Dashboard access.

All staff operations will be restricted by organization membership and assigned permissions.

### 4.4 Customer

Customers will have access to their own portal.

They can:

- View their profile.
- View their active subscriptions.
- Check upcoming billing dates.
- Access invoices.
- View payment history.

Customers must never access another customer's records.

## 5. MVP Functional Scope

The first release will consist of nine core modules.

### Module 1: Platform Organization Management

- Create organization records.
- Enter organization owner details.
- Generate owner activation invitations.
- View organization lists and details.
- Activate or suspend organizations.
- Resend or revoke activation invitations.

### Module 2: Authentication & Authorization

- Login and logout.
- Account activation through invitations.
- Forgot and reset password.
- Change password.
- JWT-based authentication.
- Secure HTTP-only cookie-based session handling.
- Backend-protected routes.
- Role-based access control.
- Organization-scoped permissions.
- No public self-registration.

### Module 3: Staff & Customer Management

**Staff Management**
- Invite staff members.
- Assign permission sets.
- Edit staff information.
- Deactivate staff.
- View staff lists.

**Customer Management**
- Create customer profiles.
- Invite customers.
- Edit and manage customer records.
- Search and paginate customer records.
- Deactivate customer records.
- View customer subscription, invoice, and payment history.

### Module 4: Product & Plan Management

**Product Management**
- Create and edit products.
- Activate and deactivate products.
- Archive products.
- Maintain product name, type, sales price, cost price, and notes.

**Subscription Plan Management**
- Create and edit subscription plans.
- Enable and disable plans.
- Configure monthly and yearly billing.
- Set plan prices.
- Configure minimum quantities.
- Set plan availability dates.
- Configure a basic tax rate.

### Module 5: Subscription Management

- Create subscriptions for customers.
- View subscription details.
- Track subscription numbers.
- Track start dates and billing periods.
- Track next billing dates.
- Activate subscriptions.
- Pause active subscriptions.
- Resume paused subscriptions.
- Renew subscriptions.
- Close subscriptions.
- Maintain subscription and billing-period history.
- Enforce valid subscription lifecycle transitions.

### Module 6: Invoice Management

- Generate invoices for subscriptions due for billing.
- Create manual invoices when required.
- Draft invoices.
- Confirm invoices.
- Cancel invoices.
- Generate invoice PDFs.
- Download invoice PDFs.
- Calculate line totals and taxes.
- Track paid amounts.
- Calculate outstanding balances.
- Prevent duplicate invoices for the same subscription and billing period.

### Module 7: Payment Management

- Record manual payments.
- Support multiple payments against one invoice.
- Support partial payments.
- Allocate payments to invoices.
- Capture payment amount, method, date, and reference.
- Calculate remaining invoice balances.
- Derive invoice payment status.

Supported invoice statuses:

- Unpaid / Outstanding.
- Partially Paid.
- Paid.
- Overdue.

Payment gateway integration is excluded from the MVP.

### Module 8: Dashboards

**Organization Owner Dashboard**

- Total customers.
- Total products.
- Active subscriptions.
- Revenue collected.
- Outstanding balances.
- Overdue invoices.
- Upcoming renewals.

**Staff Dashboard**

- Display metrics and records according to assigned permissions.

**Customer Dashboard**

- Active subscriptions.
- Next billing date.
- Available invoices.
- Recent payments.

Dashboard information must be derived from organization-scoped database records.

### Module 9: Notifications

- Store notifications in MongoDB.
- Deliver real-time updates through Socket.IO.
- Support unread and read notification states.
- Maintain notification history.
- Notify relevant users and roles.
- Send transactional emails through Nodemailer.

MVP notification events include:

- Organization-owner invitations.
- Staff invitations.
- Customer invitations.
- Password reset links.
- Invoice generation and availability.
- Payment recording and confirmation.
- Subscription activation.
- Basic subscription expiry reminders.

## 6. Staff Permission Management

The organization owner will be able to configure staff access through database-driven permissions.

Example permission groups:

| Module | Example Permissions |
|---|---|
| Customers | Read, Create, Update, Deactivate |
| Products | Read, Create, Update, Archive |
| Plans | Read, Create, Update, Manage Status |
| Subscriptions | Read, Create, Update, Pause, Close |
| Invoices | Read, Create, Confirm, Cancel, Download |
| Payments | Read, Record, Allocate |
| Dashboard | View |
| Staff | Read, Invite, Update, Manage Permissions |

Permission templates such as Sales, Operations, and Finance can be used as starting configurations.

The backend must independently validate every protected operation. Frontend navigation restrictions alone are not sufficient for authorization.

## 7. Core Application Workflows

### 7.1 Organization Onboarding

```text
Super Admin Creates Organization
              |
              v
Owner Membership Created
              |
              v
Activation Token Generated
              |
              v
Activation Email Sent
              |
              v
Owner Opens Invitation Link
              |
              v
Token Validation
              |
              v
Owner Sets Password
              |
              v
Account Activated
              |
              v
Owner Accesses Organization Workspace
```

### 7.2 Staff & Customer Onboarding

```text
Organization Owner
        |
        ├── Invites Staff
        |      |
        |      └── Assigns Permissions
        |
        └── Creates Customer
               |
               v
        Activation Invitation
               |
               v
        Recipient Sets Password
               |
               v
        Account Activated
```

All activation links must be single-use, expiring, securely generated, and stored as hashes.

### 7.3 Subscription-to-Payment Workflow

```text
Create Product
      |
      v
Create Subscription Plan
      |
      v
Create / Select Customer
      |
      v
Create Customer Subscription
      |
      v
Confirm & Activate Subscription
      |
      v
Billing Scheduler Checks Due Subscriptions
      |
      v
Validate Billing Period & Prevent Duplicates
      |
      v
Generate Invoice
      |
      v
Calculate Taxes & Invoice Totals
      |
      v
Notify Customer
      |
      v
Record & Allocate Payment
      |
      v
Update Invoice Balance & Status
      |
      v
Update Dashboards & Notifications
```

### 7.4 Subscription Lifecycle

```text
Draft → Confirmed → Active → Closed
                    |
                    ├── Pause
                    |
                    └── Resume
```

Paused and closed subscriptions must not be included in normal recurring invoice generation.

Renewal must advance or create a clearly defined billing period without duplicating previous invoices.

## 8. Technology Stack

| Component | Technology |
|---|---|
| Frontend | React + Vite |
| State Management | Redux Toolkit |
| State Persistence | Redux Persist |
| Backend | Node.js + Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Architecture | MVC + Service Layer |
| Authentication | JWT + Secure HTTP-only Cookies |
| Authorization | RBAC + Organization-scoped Permissions |
| Real-time Communication | Socket.IO |
| Invoice Scheduling | node-cron |
| Duplicate Billing Prevention | Unique Indexes + Idempotent Services |
| PDF Generation | PDFKit / Puppeteer |
| Validation | express-validator |
| Email | Nodemailer + SMTP |
| API | REST API |
| Frontend Deployment | Netlify |
| Backend Deployment | Render |
| Database Hosting | MongoDB Atlas |

### Infrastructure Decisions

- Redis is excluded from the MVP.
- Firebase Cloud Messaging is excluded from the MVP.
- Payment gateway integration is excluded from the MVP.
- MongoDB will persist application records and notifications.
- Socket.IO will provide real-time communication.
- node-cron will handle scheduled invoice generation.

Redux Persist will retain appropriate non-sensitive client state. It will not serve as an authentication or authorization boundary.

## 9. Development Roadmap

Development will follow eight sequential phases.

| Phase | Development Area | Expected Deliverable |
|---|---|---|
| 1 | Project setup and database | MERN foundation |
| 2 | Authentication, RBAC and invitations | Secure onboarding |
| 3 | Staff, customer management and permissions | Tenant user management |
| 4 | Product and plan management | Product catalogue |
| 5 | Subscription management | Subscription lifecycle |
| 6 | Invoice management and scheduler | Automated billing |
| 7 | Payment management | Payment tracking |
| 8 | Dashboards and notifications | Complete MVP |

Each phase must include API validation, tenant authorization testing, frontend integration, and end-to-end acceptance testing before moving forward.

## 10. Deployment Scope

The initial deployment will use:

| Component | Deployment |
|---|---|
| Frontend | Netlify |
| Backend | Render |
| Database | MongoDB Atlas |
| Email | Configured SMTP |
| Real-time Communication | Socket.IO |
| Scheduled Billing | node-cron |

Deployment requirements:

- HTTPS communication.
- Secure production cookies.
- Restricted CORS configuration.
- Environment-based configuration.
- Secure storage of application secrets.
- Database backup and recovery procedures.
- Authenticated Socket.IO connections.
- Restart-safe scheduled billing.
- Database-level duplicate invoice protection.

Only one designated backend instance should run the MVP billing scheduler unless a distributed coordination mechanism is introduced.

## 11. Out of Scope – Future Phases

The following features are explicitly excluded from the first release.

| Feature | Planned Future Capability |
|---|---|
| Quotation Management | Quotation creation, acceptance, rejection and conversion |
| Product Variants | Product attributes and variant pricing |
| Discount Management | Fixed and percentage discounts |
| Advanced Tax Management | Multiple tax rules and tax categories |
| Payment Gateway | Razorpay or alternative provider integration |
| Advanced Billing | Daily and weekly billing frequencies |
| Advanced Subscription Policies | Proration, termination fees and advanced pause policies |
| Advanced Reports | Filterable reports and CSV/PDF exports |
| Push Notifications | Browser and mobile push notifications |
| Redis | Distributed Socket.IO, caching and job coordination |
| Advanced SaaS Administration | Audit logs, usage metrics and advanced support tooling |

These features may be considered after the MVP is validated.

## 12. MVP Acceptance Criteria

The MVP will be considered functionally complete when the following conditions are satisfied.

### Organization & Authentication
- [ ] Super Admin can create organizations.
- [ ] Organization owners receive activation invitations.
- [ ] Owner, staff, and customer accounts activate through secure invitations.
- [ ] No public self-registration is available.

### Multi-Tenant Security
- [ ] Organizations cannot access one another's data.
- [ ] All tenant-owned records are organization-scoped.
- [ ] Socket.IO communication is tenant-scoped.
- [ ] Staff cannot perform unauthorized actions.
- [ ] Customers can access only their own records.

### Business Operations
- [ ] Products and monthly/yearly plans can be managed.
- [ ] Customer and staff records can be managed.
- [ ] Staff permissions can be configured.
- [ ] Subscriptions support valid lifecycle transitions.
- [ ] Due subscriptions generate invoices automatically.
- [ ] Repeated scheduler executions do not create duplicate invoices.
- [ ] Invoice calculations and tax calculations are consistent.
- [ ] Multiple partial payments can be allocated to invoices.
- [ ] Invoice PDFs can be generated and downloaded.

### Dashboards & Notifications
- [ ] Dashboards display tenant-scoped data.
- [ ] Notifications are persisted in MongoDB.
- [ ] Real-time notifications reach the intended users when connected.
- [ ] Email notifications work for supported events.

### Testing
- [ ] Core workflows have automated tests.
- [ ] Tenant-isolation tests are implemented.
- [ ] Duplicate-billing tests are implemented.
- [ ] API authorization tests are implemented.

## 13. Open Implementation Decisions

The following details remain to be finalized during technical design:

- Whether organizations support multiple administrators.
- Activation-link expiry duration and password policy.
- Customer identity and profile data model.
- Exact MVP tax calculation model.
- PDF generation library selection.
- Renewal-date, month-end, timezone, and proration rules.
- Whether customers can request subscriptions through the portal or subscriptions are created only by owners and authorized staff.

These decisions must be finalized before implementing the corresponding modules.

## 14. Final Scope Statement

The Subscription Management System MVP will deliver a complete multi-tenant subscription management workflow covering organization provisioning, secure onboarding, customer and staff management, product and plan configuration, subscription lifecycle management, recurring invoice generation, manual payment allocation, dashboards, and notifications.

The project will prioritize reliability, security, tenant isolation, and operational simplicity.

Future capabilities will be introduced incrementally based on actual business requirements and customer feedback.

**Project Scope: Defined – MVP Development Ready.**