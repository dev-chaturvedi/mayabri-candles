# Mayabri Candles

Premium candle e-commerce experience with a modern MERN architecture and an AI-enhancement roadmap.

## Live Demo

- Production: [https://mayabri-candles.vercel.app](https://mayabri-candles.vercel.app)

## Features

### E-commerce Features (Implemented)

- Curated product catalog with category and price sorting
- Responsive storefront built with React + Tailwind CSS
- Add-to-cart flow with quantity controls
- Secure authentication (register/login) with JWT
- Checkout integrations:
  - Razorpay order + payment verification flow
  - Stripe Checkout session + webhook order processing
- Discount code support and gift-wrap/gift-message options
- Corporate gifting inquiry form
- Super-user/admin controls for product management
- Cloudinary-based product image upload pipeline

### AI Features

- `In Progress`: LLM-powered product recommendation layer
- `Planned`: RAG-based semantic product discovery
- `Planned`: Smart customer support chatbot
- `Planned`: Vector database integration (Pinecone/Chroma) via LangChain

## Tech Stack

### Frontend

- React.js
- Tailwind CSS
- Framer Motion (interaction polish)

### Backend

- Node.js
- Express.js
- JWT Authentication
- Nodemailer (transactional email)

### Database

- MongoDB (Mongoose)

### AI Stack

- OpenAI API (`Planned/In Progress`)
- LangChain (`Planned`)
- Pinecone or Chroma Vector DB (`Planned`)

## Screenshots

> Add your latest visuals here for portfolio impact.

### Desktop

- `docs/screenshots/desktop-home.png`
- `docs/screenshots/desktop-gift-guide.png`

### Mobile

- `docs/screenshots/mobile-home.png`
- `docs/screenshots/mobile-checkout.png`

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/dev-chaturvedi/mayabri-candles.git
cd mayabri-candles
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add the required values (see section below).

### 4. Run locally

```bash
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

### 5. Build for production

```bash
npm run build
```

## Environment Variables

Use this as a starter template:

```env
# App
API_PORT=5000
CLIENT_URL=http://localhost:3000
REACT_APP_API_URL=http://localhost:5000/api

# Database
MONGO_URI=

# Auth
JWT_SECRET=
SUPER_USER_EMAILS=

# Payments
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
REACT_APP_RAZORPAY_KEY_ID=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Email
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USER=
SMTP_PASS=
MAIL_FROM=

# Media Uploads
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# AI (Planned / In Progress)
OPENAI_API_KEY=
PINECONE_API_KEY=
```

## Folder Structure

```text
mayabri-candles/
├── public/                  # Static assets
├── src/                     # React frontend
│   ├── App.js               # Main UI and page flows
│   ├── App.css              # Styling and animations
│   └── api.js               # Frontend API client
├── server/
│   ├── server.js            # Express app entry
│   ├── config/              # Cloudinary config
│   └── src/
│       ├── config/          # Discounts, super-user config
│       ├── data/            # Seed product data
│       ├── middleware/      # Auth and access control
│       ├── models/          # Mongoose models
│       ├── routes/          # API routes (auth, products, payments, etc.)
│       └── services/        # Email service
├── package.json
└── README.md
```

## Future Improvements

- AI-driven personalization based on user behavior and preferences
- Agentic AI workflows for support, upsell, and catalog assistance
- Stronger mobile optimization and performance tuning for low-end devices
- Expanded analytics for conversion, retention, and product insights

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## Author

**Abhay Chaturvedi**

- GitHub: [dev-chaturvedi](https://github.com/dev-chaturvedi)
- LinkedIn: [Add your LinkedIn profile link](https://www.linkedin.com/in/)
