This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# IOD Capstone - Meal Planner - Plan to Plate

## Getting Started

To run the development on your local machine, follow these steps:

1. Clone this repo to your local.
   ```bash
   git clone https://xxx
   ```

2. Navigate into the mealplanner directory.
   ```bash
   cd ./mealplanner
   ```

3. Install dependencies.
   ```bash
   npm install
   ```

Before running the server, you will need to set up a MongoDB database:

1. Install MongoDB Compass or work from Atlas.
2. Create a `.env.local` file in the root of the project and include your MongoDB connection string.
   ```bash
   MONGODB_URI=
   ```

3. Set up schemas & dummy data.

Head back into the project and run:
```bash
npm run dev
```

The project will start up on [localhost:3000](http://localhost:3000).
