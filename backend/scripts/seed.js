const {
  PrismaClient,
  CUISINE,
  MEAL_TYPE,
  RECIPE_SOURCE,
} = require('@prisma/client');
const data = require('./recipes.json');

const prisma = new PrismaClient();

async function main() {
  console.log(`Starting to seed ${data.length} recipes...`);

  let count = 0;
  for (const recipe of data) {
    try {
      await prisma.recipe.updateMany({
        data: {
          source: RECIPE_SOURCE.OFFICIAL,
          tags: [recipe.food_restrictions, recipe.diet_preference],
        },
      });
      count++;
      console.log(`Inserted recipe #${count}: ${recipe.title}`);
    } catch (error) {
      console.error(`Error inserting recipe "${recipe.title}":`, error);
    }
  }

  console.log(`Seeding finished. Total recipes inserted: ${count}`);
}

main()
  .catch((e) => {
    console.error('Error in seeding script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
