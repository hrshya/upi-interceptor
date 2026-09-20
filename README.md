# UPI Interceptor 🛡️
**AI-Powered Real-Time UPI Fraud Detection & Receipt Audit System**

[![AWS Bedrock](https://img.shields.io/badge/AWS_Bedrock-Claude_3.5_Sonnet-orange?logo=amazon-aws)](https://aws.amazon.com/bedrock/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![DynamoDB](https://img.shields.io/badge/DynamoDB-NoSQL-blue?logo=amazondynamodb)](https://aws.amazon.com/dynamodb/)
[![Amplify](https://img.shields.io/badge/Deployment-AWS_Amplify-FF9900?logo=awsamplify)](https://aws.amazon.com/amplify/)

---

## 🚨 Problem Statement

With the widespread adoption of UPI in India (PhonePe, Google Pay, Paytm, and BHIM), offline merchants face an increasing threat from **fake UPI payment receipt generators**. Fraudulent apps and web tools allow bad actors to forge transaction screenshots with fake UTRs, mismatched fonts, and altered timestamps in seconds. Cashiers in high-traffic queues often lack the time to manually check bank statements for every small transaction.

## ✨ Solution Overview

**UPI Interceptor** is a real-time, multimodal fraud analysis system designed for instant point-of-sale verification.

By combining **Claude 3.5 Sonnet on AWS Bedrock** with rule-bound domain analysis, UPI Interceptor inspects customer receipt screenshots to catch UI font alterations, invalid transaction ID formats, and missing metadata before logging verified or flagged scans to a live merchant dashboard.

## ⚙️ Architecture Flow

```text
┌─────────────────┐        ┌─────────────────────┐        ┌──────────────────┐
│  Next.js UI     │ ─────> │   Next.js API       │ ─────> │   DynamoDB       │
│  (Upload/Feed)  │        │   (/api/scans)      │        │ (MerchantScans)  │
└─────────────────┘        └─────────────────────┘        └──────────────────┘
		 │                           │
		 └──────────────> AWS Bedrock / Claude multimodal analysis
```

1. **Client Upload:** A merchant or cashier uploads or captures a payment screenshot through the Next.js app.
2. **Multimodal Analysis:** The receipt is checked against UPI domain audit guidelines.
3. **Audit Checks:** The system evaluates transaction ID formats, typography, alignment, pixelation, and timestamp consistency.
4. **Storage & Live Dashboard:** Scan metadata is stored in DynamoDB and displayed in the merchant dashboard through the `/api/scans` route.

## 🚀 Tech Stack

- **Frontend:** Next.js App Router, React, Tailwind CSS
- **Serverless API:** Next.js Route Handlers on Node.js
- **AI Core:** Amazon Bedrock with Anthropic Claude
- **Database:** Amazon DynamoDB (`MerchantTransactions` table)
- **UI:** Framer Motion and Lucide React
- **Hosting:** AWS Amplify Hosting or Vercel

## 🛠️ Key Features

- 🔍 **Multimodal Visual Audit:** Detects micro-edits, font discrepancies, and invalid template structures.
- ⚡ **Fast Verification:** Designed for quick decisions in high-volume merchant queues.
- 📊 **Real-Time Feed:** The merchant dashboard surfaces recent and flagged transactions.
- 📋 **Extracted Metadata:** Captures UTR numbers and transaction amounts for ledger accounting.
- 🛡️ **Defensive Fallbacks:** Uses hardened analysis prompts and flexible DynamoDB records.

## 📂 Project Structure

```text
├── app/
│   ├── api/
│   │   └── scans/route.ts       # DynamoDB-backed scan API
│   ├── dashboard/page.tsx       # Merchant transaction dashboard
│   ├── dashboard/scanner/       # Scanner route and types
│   ├── layout.tsx
│   └── page.tsx                 # Receipt upload interface
├── components/
│   ├── dashboard/               # Dashboard visualizations and panels
│   ├── scanner/                 # Scanner interface components
│   └── ui/                      # Shared UI components
├── public/
├── .env.local.example           # Environment variable template
├── package.json
└── README.md
```

## 🚦 Local Setup & Installation

### Prerequisites

- Node.js 18+ and npm
- AWS CLI configured with appropriate credentials
- An AWS account with access to the required DynamoDB table and Amazon Bedrock model

### 1. Repository Setup

```bash
git clone https://github.com/<your-username>/upi-interceptor-web.git
cd upi-interceptor-web
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the project root:

```env
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=us-east-1
DYNAMODB_TRANSACTIONS_TABLE=MerchantTransactions
```

Do not commit credentials. The repository ignores `.env*` files by default.

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Other Commands

```bash
npm run lint
npm run build
npm run start
```

---

## 🗺️ Roadmap & Production Vision

- [x] **Layer 1:** Multimodal receipt audit for visual fraud detection.
- [x] **Layer 1.5:** Extraction and display of UTR and transaction amounts.
- [ ] **Layer 2:** Asynchronous bank account reconciliation through PhonePe Business or Razorpay webhooks.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
