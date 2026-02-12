const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDb = require('./config/db');

const colors = require('colors');


const Admin = require('./schemas/adminUserSchema');
const User = require('./schemas/userSchema');
const Pizza = require('./schemas/pizzaSchema');
const Order = require('./schemas/orderSchema');
const { Base, Sauce, Cheese, Veggie } = require('./schemas/inventorySchema');

const { users, admins } = require('./data/users');
const pizzas = require('./data/pizzas');
const { base, sauce, cheese, veggie } = require('./data/inventory');


// Connect to MongoDB
connectDb();

// Helper function to map ingredient names to ObjectIds safely
const mapIngredients = (namesArray, inventoryDocs) => {
  if (!Array.isArray(namesArray)) return [];
  return namesArray
    .map((name) => inventoryDocs.find((doc) => doc.name === name)?._id)
    .filter(Boolean);
};

const importData = async () => {
  try {
    // Clear collections first to prevent duplicates
    await Admin.deleteMany();
    await Order.deleteMany();
    await Pizza.deleteMany();
    await User.deleteMany();
    await Base.deleteMany();
    await Sauce.deleteMany();
    await Cheese.deleteMany();
    await Veggie.deleteMany();

    // Insert Users and Admins
    await User.insertMany(users);
    await Admin.insertMany(admins);

    // Insert Inventory
    const basesDocs = await Base.insertMany(base);
    const saucesDocs = await Sauce.insertMany(sauce);
    const cheesesDocs = await Cheese.insertMany(cheese);
    const veggiesDocs = await Veggie.insertMany(veggie);

    // Map pizza ingredient names to ObjectIds and add createdBy
    const pizzasWithIds = pizzas.map((pizza) => ({
      ...pizza,
      bases: mapIngredients(pizza.bases, basesDocs),
      sauces: mapIngredients(pizza.sauces, saucesDocs),
      cheeses: mapIngredients(pizza.cheeses, cheesesDocs),
      veggies: mapIngredients(pizza.veggies, veggiesDocs),
      createdBy: 'admin',
    }));

    // Insert pizzas
    await Pizza.insertMany(pizzasWithIds);

    console.log('Dummy Data Created!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Admin.deleteMany();
    await Order.deleteMany();
    await Pizza.deleteMany();
    await User.deleteMany();
    await Base.deleteMany();
    await Sauce.deleteMany();
    await Cheese.deleteMany();
    await Veggie.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Run seeder or destroy based on argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
