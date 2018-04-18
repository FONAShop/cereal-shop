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
const db = require("../server/db");
const { User, Product } = require("../server/db/models");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({ email: "cody@email.com", password: "123" }),
    User.create({ email: "murphy@email.com", password: "123" }),
    User.create({ email: "bernstein@email.com", password: "123" }),
    User.create({ email: "andventuree@email.com", password: "123" }),
    User.create({ email: "mils-1@email.com", password: "123" }),
    User.create({ email: "francesyw@email.com", password: "123" }),
    User.create({ email: "borysonok@email.com", password: "123" })
  ]);
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`);

  const products = await Promise.all([
    Product.create({
      name: "Apple Jacks",
      description: "This should be a description",
      price: 500,
      quantity: 100,
      img:
        "http://images.kglobalservices.com/www.kelloggs.com/en_us/brand/consumerbrand-3440143/consbrand_img-3599289_applejacks.png",
      categories: []
    }),
    Product.create({
      name: "Frosted Flakes",
      description: "This should be a description",
      price: 500,
      quantity: 100,
      img:
        "https://www.frostedflakes.com/content/NorthAmerica/frostedflakes/en_US/pages/home/jcr:content/gridSystem/par/inuitgrid_1398179958/par/responsiveimage.img.png/1483464488956.png",
      categories: []
    }),
    Product.create({
      name: "Pops",
      description: "This should be a description",
      price: 500,
      quantity: 100,
      img:
        "http://images.kglobalservices.com/www.kelloggs.com/en_us/product/product_4508489/kicproductimage-125783_cp_fp.jpg",
      categories: []
    }),
    Product.create({
      name: "Life",
      description: "This should be a description",
      price: 500,
      quantity: 100,
      img:
        "http://www.quakeroats.com/Sitefinity/WebsiteTemplates/Quaker/Images/Life_Orig.png",
      categories: []
    }),
    Product.create({
      name: "Raisin Bran",
      description: "This should be a description",
      price: 500,
      quantity: 100,
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNH6bm58fPUwfKu1LB_rWH38CD8ZE1oMqth7Srk5CF2PTs8v12j9V9xFo",
      categories: []
    })
  ]);
  console.log(`seeded ${products.length} products`);
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
    console.log("closing db connection");
    db.close();
    console.log("db connection closed");
  });

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log("seeding...");
