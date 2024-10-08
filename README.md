# IOD Capstone - Meal Planner - Plan to Plate

This is a [Next.js](https://nextjs.org) project deployed on the the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) and making use of a MongoDB database.


## Getting Started

To run the development on your local machine, follow these steps:

1. Clone this repo to your local

   ```bash
   git clone https://github.com/dmcneill15/mealplanner.git
   ```

2. Navigate into the mealplanner directory

   ```bash
   cd ./mealplanner
   ```

3. Install dependencies
   ```bash
   npm install
   ```
4. To test without any database connection,run

   ```bash
   npm run dev
   ```

The project will start up on [localhost:3000](http://localhost:3000).

If you wish to setup the full functionality with a working database:

1. Install MongoDB Compass or setup a database in Mongo Altas Cloud
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
