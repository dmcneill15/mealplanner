# IOD Capstone - Meal Planner - Plan to Plate

Plan to Plate is a meal planning and recipe storage application.
Some key features:
- **Create your own user account to save your recipes & meal plans.
- **Customise your own recipes, adding as much detail to each recipe as you need.
- **Easily drag and drop your recipes on to a calendar to create your personalised meal plan.
- **Switch your calendar between month or week view.
- **Edit recipes when you see room for improvement.

## About the tech

This is a [Next.js](https://nextjs.org) project deployed on the the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) and making use of a [MongoDB database](https://www.mongodb.com/products/platform/atlas-database).


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
3. Set up schemas & dummy data to begin meal planning.

Head back into the project and run:

```bash
npm run dev
```

The project will start up on [localhost:3000](http://localhost:3000).
