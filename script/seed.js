/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db');

const { User, Product, Review } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({ isAdmin: true, email: 'cody@email.com', password: '123' }),
    User.create({ isAdmin: false, email: 'murphy@email.com', password: '123' }),
    User.create({ isAdmin: false, email: 'bernstein@email.com', password: '123' }),
    User.create({ isAdmin: false, email: 'andventuree@email.com', password: '123' }),
    User.create({ isAdmin: false, email: 'mils-1@email.com', password: '123' }),
    User.create({ isAdmin: true, email: 'francesyw@email.com', password: '123' }),
    User.create({ isAdmin: true, email: 'borysonok@email.com', password: '123' })
  ]);
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`);

  const products = await Promise.all([
    Product.create({
      name: 'Apple Jacks',
      description: 'Apples, apples, apples.',
      price: 5.06,
      quantity: 100,
      imgUrl:
        'http://images.kglobalservices.com/www.kelloggs.com/en_us/brand/consumerbrand-3440143/consbrand_img-3599289_applejacks.png',
      categories: []
    }),
    Product.create({
      name: 'Frosted Flakes',
      description: 'Lacks nutritional value. Do not eat.',
      price: 6.09,
      quantity: 100,
      imgUrl:
        'https://www.frostedflakes.com/content/NorthAmerica/frostedflakes/en_US/pages/home/jcr:content/gridSystem/par/inuitgrid_1398179958/par/responsiveimage.img.png/1483464488956.png',
      categories: []
    }),
    Product.create({
      name: 'Pops',
      description: 'Lacks nutritional value.',
      price: 7.90,
      quantity: 100,
      imgUrl:
        'http://images.kglobalservices.com/www.kelloggs.com/en_us/product/product_4508489/kicproductimage-125783_cp_fp.jpg',
      categories: []
    }),
    Product.create({
      name: 'Life',
      description: 'Lacks nutritional value.',
      price: 5.00,
      quantity: 100,
      imgUrl:
        'http://www.quakeroats.com/Sitefinity/WebsiteTemplates/Quaker/Images/Life_Orig.png',
      categories: []
    }),
    Product.create({
      name: 'Peach Cherrios',
      description: 'Each 3/4 cup serving of Peach Cheerios has 110 calories, 1.5 grams total fat (0 saturated and 0 trans), 0 mg cholesterol, 125 mg sodium, 22 grams total carbs, 2 grams dietary fiber, 8 grams sugar and 2 grams protein.',
      price: 7.46,
      quantity: 100,
      imgUrl:
        'https://www.mrbreakfast.com/images/p_333_peach_cheerios_review.jpg',
      categories: ['sweet']
    }),
    Product.create({
      name: 'Kashi Cinnamon French Toast',
      description: 'Each 3/4 cup serving of Kashi Cinnamon French Toast Cereal has 90 calories, 1.5 grams total fat (0 saturated and 0 trans), 0 mg cholesterol, 95 mg sodium, 23 grams total carbs, 5 grams dietary fiber, 6 grams sugar and 2 grams protein. ',
      price: 13.36,
      quantity: 100,
      imgUrl:
        'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTWGTcp-H0KTh44Di3wkBAcbhaJEWCxYuSK8v5BQ0wXfkl-m7pWmDIyJLlsbKnu-KkYjYAcUM1s94rIJsABeYSjpllvHUkLBOOLwJibaqC1Z2bg956pDJA9&usqp=CAE',
      categories: ['sweet', 'wheaty']
    }),
    Product.create({
      name: 'Honey Bunches of Oats Crunch Os',
      description: 'Each serving of Almond Crunch Os has 130 calories, 2 grams total fat (0 saturated and 0 trans), 0mg cholesterol, 160mg sodium, 26 grams total carbs, 2 grams dietary fiber, 7 grams sugar and 2 grams protein. The first 4 ingredients listed on the side panel are corn, whole grain wheat, sugar and oat cereal.',
      price: 5.60,
      quantity: 100,
      imgUrl:
        'https://www.mrbreakfast.com/images/p_304.jpg',
      categories: ['savory', 'wheaty']
    }),
    Product.create({
      name: 'Chex Clusters',
      description: 'Each 3/4 cup serving of Chex Clusters has 100 calories, 2 grams total fat (0 saturated and 0 trans), 0 mg cholesterol, 95 mg sodium, 23 grams total carbs, 5 grams dietary fiber, 6 grams sugar and 2 grams protein. ',
      price: 11.42,
      quantity: 100,
      imgUrl:
        'https://www.mrbreakfast.com/images/p_293.jpg',
      categories: ['crunchy']
    }),
    Product.create({
      name: 'Rice Krispies Treats Cereal',
      description: 'Lacks nutritional value.',
      price: 9.24,
      quantity: 100,
      imgUrl:
        'https://www.mrbreakfast.com/images/p_6.jpg',
      categories: ['sweet']
    })
  ]);
  console.log(`seeded ${products.length} products`);

  const reviews = await Promise.all([
    Review.create({
      content: 'Tastes like bacon.',
      rating: 5
      }).then(createdReview => {
      createdReview.setUser(1);
      createdReview.setProduct(3);
      }),
    Review.create({
      content: 'Does not tastes like bacon.',
      rating: 4
      }).then(createdReview => {
      createdReview.setUser(4);
      createdReview.setProduct(9);
      }),
    Review.create({
      content: 'I like the crunch!',
      rating: 1
      }).then(createdReview => {
      createdReview.setUser(2);
      createdReview.setProduct(7);
      }),
    Review.create({
      content: 'Best way to start a morning.',
      rating: 3
      }).then(createdReview => {
      createdReview.setUser(5);
      createdReview.setProduct(9);
      }),
    Review.create({
      content: 'Best way to start a morning.',
      rating: 3
      }).then(createdReview => {
      createdReview.setUser(5);
      createdReview.setProduct(6);
      }),
    Review.create({
      content: 'Best way to start a morning.',
      rating: 3
      }).then(createdReview => {
      createdReview.setUser(6);
      createdReview.setProduct(3);
      }),
    Review.create({
      content: 'Best way to start a morning.',
      rating: 3
      }).then(createdReview => {
      createdReview.setUser(6);
      createdReview.setProduct(5);
      }),
    Review.create({
      content: 'Best way to start a morning.',
      rating: 3
      }).then(createdReview => {
      createdReview.setUser(1);
      createdReview.setProduct(1);
      })
  ]);
  console.log(`seeded ${reviews.length} reviews`);
  console.log(`seeded successfully`);
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...');
