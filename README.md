 Subscription Management System
LicenseNode.jsReactExpressMySQLStatus

📖 Overview
The Subscription Management System is a full-stack web application designed to automate the complete subscription lifecycle for businesses that offer products or services on a recurring billing model.

The platform helps organizations manage:

Products & Variants
Subscription Plans
Quotations
Customer Subscriptions
Recurring Billing
Invoices
Payments
Discounts
Taxes
Revenue Analytics
The system eliminates manual spreadsheet management and provides a centralized platform for subscription operations.

🎯 Business Problem
Many subscription businesses struggle with:

Manual customer tracking
Missed subscription renewals
Incorrect invoice generation
Payment reconciliation issues
Lack of revenue visibility
Poor customer self-service options
This project solves these problems through complete subscription lifecycle automation.

👥 User Roles
1. Admin
Full access to the platform.

Responsibilities
Manage staff members
Manage customers
Manage products
Manage product variants
Manage subscription plans
Manage taxes
Manage discount rules
Monitor invoices
Monitor payments
View analytics & reports
2. Staff
Handles day-to-day business operations.

Responsibilities
Manage customers
Create quotations
Convert quotations into subscriptions
Manage subscriptions
Generate invoices
Record payments
Track outstanding invoices
3. Customer
Accesses a self-service portal.

Responsibilities
Manage profile
View subscriptions
View invoices
Download invoices
View payment history
Track renewals
🔐 Authentication & Authorization
Features
User Registration
Secure Login
Logout
Forgot Password
Password Reset
Change Password
JWT Authentication
Role-Based Access Control (RBAC)
Password Rules
Minimum 8+ characters
At least one uppercase letter
At least one lowercase letter
At least one special character
📦 Product Management Module
Features
Add Product
Update Product
Delete Product
Product Categories
Product Variants
Dynamic Pricing
Product Fields
Product Name
Product Type
Sales Price
Cost Price
Description
Status
🏷️ Product Variant Management
Supports product variants with additional pricing.

Example
ERP Software

Brand: Odoo
Additional Cost: +560
📅 Plan Management Module
Billing Cycles
Daily
Weekly
Monthly
Yearly
Features
Create Plans
Edit Plans
Delete Plans
Set Plan Availability
Auto Expiry
Renewal Configuration
Pause Plans
Resume Plans
Plan Fields
Plan Name
Billing Frequency
Price
Minimum Quantity
Start Date
End Date
Status
📄 Quotation Management
Features
Create Quotations
Quotation Templates
Edit Quotations
Send Quotations
Expiry Management
Convert to Subscription
Quotation Workflow
Draft
 ↓
Sent
 ↓
Accepted
 ↓
Subscription Created
🔄 Subscription Management
Features
Create Subscription
Update Subscription
Pause Subscription
Resume Subscription
Renew Subscription
Close Subscription
Subscription Fields
Subscription Number
Customer
Plan
Start Date
Expiry Date
Payment Terms
Status
Subscription Lifecycle
Draft
  ↓
Quotation
  ↓
Confirmed
  ↓
Active
  ↓
Closed
🧾 Invoice Management
Features
Auto Invoice Generation
Tax Calculation
Discount Application
Invoice Printing
PDF Export
Email Invoice
Cancel Invoice
Invoice Workflow
Draft
  ↓
Confirmed
  ↓
Paid
Invoice Details
Invoice Number
Customer
Issue Date
Due Date
Products
Taxes
Discounts
Grand Total
Status
💳 Payment Management
Features
Record Payments
Track Outstanding Balances
Partial Payments
Full Payments
Payment Notes
Payment Methods
Credit Card
Debit Card
UPI
Net Banking
Bank Transfer
Cash
Payment Fields
Payment ID
Invoice ID
Payment Method
Amount
Date
Note
🏷️ Discount Management
Supported Discounts
Fixed Discount
₹500 Off
Percentage Discount
10% Off
Rules
Start Date
End Date
Minimum Quantity
Minimum Purchase
Usage Limits
Scope
Product-Level Discount
Subscription-Level Discount
🧮 Tax Management
Features
Create Tax Rules
Configure Tax Rates
Automatic Tax Calculation
Tax Reporting
Tax Fields
Tax Name
Tax Percentage
Status
Effective Date
📊 Dashboard & Analytics
Admin Dashboard
Total Customers
Total Products
Active Subscriptions
Monthly Revenue
Annual Revenue
Outstanding Revenue
Overdue Invoices
Staff Dashboard
Recent Customers
Pending Quotations
Active Subscriptions
Due Renewals
Customer Dashboard
Active Plan
Renewal Date
Outstanding Amount
Recent Payments
📈 Reports
Available Reports
Subscription Report
Revenue Report
Customer Report
Product Report
Invoice Report
Payment Report
Overdue Invoice Report
Filters
Date Range
Customer
Plan
Product
Status
🛎️ Notification System
Email Notifications
Account Registration
Password Reset
Invoice Generated
Payment Confirmation
Subscription Renewal Reminder
Subscription Expiry Reminder
🗂️ Database Schema
Main Tables
users
roles

staff
customers

products
product_variants

plans

quotation_templates
quotations
quotation_items

subscriptions
subscription_items

taxes
discounts

invoices
invoice_items

payments

notifications

audit_logs
🏗️ System Architecture
┌───────────────────┐
│   React Frontend  │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Express REST API  │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│      MySQL DB     │
└───────────────────┘
📁 Project Structure
subscription-management-system/

│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── routes/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── services/
│   ├── config/
│   └── utils/
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── docs/
│
├── .env
├── package.json
└── README.md
⚙️ Tech Stack
Frontend
React.js
Tailwind CSS
Axios
React Router
Backend
Node.js
Express.js
Database
MySQL
Authentication
JWT
bcrypt
Other Tools
Nodemailer
PDFKit
Multer
🔧 Installation
Clone Repository
git clone https://github.com/your-username/subscription-management-system.git
cd subscription-management-system
Install Frontend Dependencies
cd frontend
npm install
Install Backend Dependencies
cd backend
npm install
🔑 Environment Variables
Create a .env file inside backend:

PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=subscription_db

JWT_SECRET=your_secret_key

EMAIL_USER=exampleon

## Backend

```bash
npm run dev
Frontend
npm start
🌐 API Modules
Authentication APIs
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password
Customer APIs
GET    /api/customers
POST   /api/customers
PUT    /api/customers/:id
DELETE /api/customers/:id
Product APIs
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
Subscription APIs
GET    /api/subscriptions
POST   /api/subscriptions
PUT    /api/subscriptions/:id
Invoice APIs
GET    /api/invoices
POST   /api/invoices
PUT    /api/invoices/:id
Payment APIs
GET    /api/payments
POST   /api/payments
📸 Screenshots
Login Page
Add Screenshot Here

Admin Dashboard
Add Screenshot Here

Customer Dashboard
Add Screenshot Here

Subscriptions Page
Add Screenshot Here

Invoice Management Page
Add Screenshot Here

🚀 Future Enhancements
Online Payment Gateway Integration
Stripe Integration
Razorpay Integration
Multi-Tenant Architecture
Mobile Application
AI-Based Revenue Forecasting
Automated Churn Analysis
Multi-Currency Support
GST Reports
Advanced BI Dashboard
👨‍💻 Contributors
Project Team
Krushnendu Hota
Team Members
📜 License
This project is licensed under the MIT License.

⭐ Support
If you find this project useful, please consider giving it a ⭐ on GitHub.

Subscription Management System Automating the Complete Subscription Lifecycle 🚀