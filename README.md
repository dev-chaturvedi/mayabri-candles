# MayAbri Candles Storefront

<p align="center">
  <img src="./public/mayabri-logo.jpeg" alt="MayAbri Candles Logo" width="180" />
</p>

Full-stack candle e-commerce app with premium UI, authentication, Stripe checkout, super-user admin controls, and post-payment order email confirmations.

## Tech Stack

- React (customer storefront UI)
- Node.js + Express (API)
- MongoDB (users, products, orders)
- Stripe Checkout + Stripe Webhooks (payments)
- Nodemailer SMTP (order confirmation emails)

## Features Included

- Customer registration/login with JWT authentication
- Protected profile endpoint (`/api/auth/me`)
- Super-user roles with promotion endpoint
- Super-user product management (add/remove)
- Product catalog from MongoDB (seeded at startup)
- Cart and quantity management in frontend
- Discount code support (`MAYA10`, `GIFT15`, `CORPORATE20`)
- Gift wrap + gift message support in checkout
- Corporate gifting inquiry form + API
- Stripe Checkout session creation on backend
- Stripe webhook handling for paid orders
- Automatic order confirmation email with payment receipt link
- Admin UI section visible only to super users
- Client links to Instagram + YouTube Shorts

## Default Super Users

These emails are treated as super users by default:

- `abhaychaturvedi2312@gmail.com`
- `mayankabriti@gmail.com`

You can add more in `SUPER_USER_EMAILS`.

## Project Structure

```text
.
├── server/
│   ├── server.js
│   └── src/
│       ├── config/superUsers.js
│       ├── data/products.js
│       ├── middleware/auth.js
│       ├── middleware/superUser.js
│       ├── models/
│       │   ├── User.js
│       │   ├── Product.js
│       │   └── Order.js
│       └── routes/
│           ├── auth.js
│           ├── checkout.js
│           └── products.js
│       └── services/email.js
└── src/
    ├── App.js
    ├── App.css
    └── api.js
```

## 1. Install Dependencies

```bash
npm install
```

## 2. Configure Environment

```bash
cp .env.example .env
```

Update `.env` values:

- `MONGO_URI`: your MongoDB connection string
- `JWT_SECRET`: long random secret
- `SUPER_USER_EMAILS`: comma-separated super-user emails
- `STRIPE_SECRET_KEY`: Stripe test or live secret key
- `STRIPE_WEBHOOK_SECRET`: webhook signing secret from Stripe dashboard/CLI
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`: SMTP credentials for order emails
- `CLIENT_URL`: frontend URL (default `http://localhost:3000`)
- `REACT_APP_API_URL`: backend API URL (default `http://localhost:5000/api`)

## 3. Run App (Frontend + Backend)

```bash
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## 4. API Quick Reference

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (Bearer token required)
- `POST /api/auth/make-super-user` (Bearer + super user required)
- `GET /api/products`
- `POST /api/products` (Bearer + super user required)
- `DELETE /api/products/:id` (Bearer + super user required)
- `POST /api/checkout/create-session` (Bearer token required)
- `POST /api/checkout/webhook` (Stripe webhook endpoint)
- `POST /api/inquiries/corporate`

## Super-User Operations

After logging in as a super user, the frontend shows a **Super User Panel** where you can:

- Add a new product
- Remove an existing product
- Promote another user to super user by email

## Stripe Webhook (Local)

Run Stripe CLI and forward events to local API:

```bash
stripe listen --forward-to localhost:5000/api/checkout/webhook
```

Copy the shown webhook signing secret (`whsec_...`) into `.env` as `STRIPE_WEBHOOK_SECRET`.

## Order Confirmation Emails

When Stripe sends `checkout.session.completed`:

1. Order details are stored in MongoDB (`Order` model)
2. Receipt URL is fetched from Stripe payment intent/charge
3. Confirmation email is sent to customer via SMTP

## Next Production Steps

- Add image upload + CDN (Cloudinary/S3)
- Add shipping and tax handling
- Add order history page for customers and owners
