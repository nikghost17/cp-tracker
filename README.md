# CP Tracker 🏆

A full-stack **Competitive Programming Tracker** built with Next.js — helping you track your progress across Codeforces, LeetCode, and CodeChef all in one place.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)

---

## ✨ Features

- 🔐 **Authentication** — Email & password sign-up/sign-in via NextAuth.js (JWT sessions)
- 🎯 **Goal Tracker** — Set coding goals with a target count & deadline; auto-deletes on completion
- 📝 **Problem Tracker** — Log solved problems with platform, difficulty, tags, and personal notes
- 📊 **Live Ratings** — Fetch real-time ratings from Codeforces, LeetCode & CodeChef APIs
- 👥 **Friends** — Search any coder's profile and save friends for quick access
- 👤 **Profile** — Link all your platform handles in one place

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Database | [MongoDB Atlas](https://www.mongodb.com/atlas) (Free Tier) |
| ODM | [Mongoose](https://mongoosejs.com/) |
| Auth | [NextAuth.js v5](https://authjs.dev/) (Credentials + JWT) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account

### 1. Clone the repository

```bash
git clone https://github.com/nikghost17/cp-tracker.git
cd cp-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Open `.env` and set:

```env
# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/cp-tracker?retryWrites=true&w=majority

# NextAuth secret — generate one with:
# node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
NEXTAUTH_SECRET=your-random-secret

# App URL
NEXTAUTH_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                  # REST API routes
│   │   ├── auth/[...nextauth]/  # NextAuth handler
│   │   ├── goals/            # Goals CRUD
│   │   ├── problems/         # Problems CRUD
│   │   ├── friends/          # Friends CRUD
│   │   ├── profile/          # Profile fetch
│   │   └── me/               # Current user session
│   ├── auth/login/           # Login & signup page
│   ├── goals/                # Goals server actions
│   ├── problems/             # Problems pages & actions
│   ├── profile/              # Profile page & actions
│   ├── ratings/              # Live ratings page
│   └── friends/              # Friends page
├── components/
│   ├── auth/                 # ProfileForm
│   ├── dashboard/            # GoalsSection, AddGoalForm
│   ├── friends/              # FriendCard, FriendSearch, FriendsList
│   ├── platforms/            # Codeforces, LeetCode, CodeChef profile cards
│   └── problems/             # ProblemsTable, AddProblemForm
├── lib/
│   ├── auth.ts               # NextAuth configuration
│   ├── mongodb.ts            # Mongoose singleton connection
│   └── models/               # Mongoose schemas
│       ├── User.ts
│       ├── Goal.ts
│       ├── Problem.ts
│       └── Friend.ts
└── types/
    └── next-auth.d.ts        # Session type augmentation
```

---

## 🌐 Platform APIs Used

| Platform | API |
|---|---|
| Codeforces | [Official API](https://codeforces.com/api/user.info) |
| LeetCode | [Unofficial GraphQL](https://leetcode.com/graphql) |
| CodeChef | [codechef-api.vercel.app](https://codechef-api.vercel.app) (third-party) |

> **Note:** CodeChef uses a community-maintained API. If it appears down, the service may be temporarily unavailable.

---

## 🗄️ MongoDB Collections

| Collection | Description |
|---|---|
| `users` | User accounts + profile + platform handles |
| `goals` | Coding goals with progress tracking |
| `problems` | Solved problems log |
| `friends` | Saved friend profiles |

---

## 📦 Deployment

This app can be deployed to [Vercel](https://vercel.com) with zero config:

1. Push your repo to GitHub
2. Import the project on Vercel
3. Add environment variables in the Vercel dashboard:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (set to your Vercel deployment URL)

---

## 🤝 Contributing

Pull requests are welcome! Please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE)
