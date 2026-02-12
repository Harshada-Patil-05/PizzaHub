const asyncHandler = require('express-async-handler');

// Import Schema
const Pizza = require('../schemas/pizzaSchema');
const Admin = require('../schemas/adminUserSchema');
const User = require('../schemas/userSchema');
const { updateInventoryQuantity } = require('../utils/inventoryUtils');

// Initialize Controllers

// @desc    Get all Pizzas
// @route   GET /api/pizzas
// @access  Public

const getAllPizzas = asyncHandler(async (req, res) => {
  const pizzas = await Pizza.find({});

  if (pizzas) {
    res.status(200).json(pizzas);
  } else {
    res.status(404);
    throw new Error('Pizzas Not Found!');
  }
});

// @desc    Get Pizza by Id
// @route   GET /api/pizzas/:id
// @access  Private/Public

const getPizzaById = asyncHandler(async (req, res) => {
  const pizza = await Pizza.findById(req.params.id);

  if (pizza) {
    res.status(200).json(pizza);
  } else {
    res.status(404);
    throw new Error('Pizza Not Found!');
  }
});

// @desc Create Pizza
// @route POST /api/pizzas
// @access Private/Admin
const createPizza = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    bases,
    sauces,
    cheeses,
    veggies,
    price,
    size,
    imageUrl,
  } = req.body;

  if (
    !name || !description || !bases || !sauces ||
    !cheeses || !veggies || !price || !size || !imageUrl
  ) {
    res.status(400);
    throw new Error('Please Fill All Fields!');
  }

  const pizza = new Pizza({
    name,
    description,
    bases,
    sauces,
    cheeses,
    veggies,
    price,
    size,
    createdBy: 'admin', // since only admin creates here
    imageUrl,
  });

  const createdPizza = await pizza.save();

  console.log("🔥 Calling inventory update...");
  await updateInventoryQuantity(createdPizza, 1);
  console.log("✅ Inventory updated!");

  res.status(201).json({
    ...createdPizza._doc,
    message: 'Pizza Created Successfully!',
  });
});


// @desc    Update Pizza By Id
// @route   PUT /api/Pizzas/:id
// @access  Private/Admin

const updatePizzaById = asyncHandler(async (req, res) => {
  const pizza = await Pizza.findById(req.params.id);

  if (pizza) {
    pizza.name = req.body.name || pizza.name;
    pizza.description = req.body.description || pizza.description;
    pizza.base = req.body.base || pizza.base;
    pizza.sauces = req.body.sauces || pizza.sauces;
    pizza.cheeses = req.body.cheeses || pizza.cheeses;
    pizza.veggies = req.body.veggies || pizza.veggies;
    pizza.price = req.body.price || pizza.price;
    pizza.size = req.body.size || pizza.size;
    pizza.imageUrl = req.body.imageUrl || pizza.imageUrl;

    const updatedPizza = await pizza.save();

    if (updatedPizza) {
      res.status(200).json({
        _id: updatedPizza._id,
        name: updatedPizza.name,
        description: updatedPizza.description,
        base: updatedPizza.base,
        sauces: updatedPizza.sauces,
        cheeses: updatedPizza.cheeses,
        veggies: updatedPizza.veggies,
        price: updatedPizza.price,
        size: updatedPizza.size,
        imageUrl: updatedPizza.imageUrl,
        message: 'Pizza Updated Successfully!',
      });
    } else {
      res.status(500);
      throw new Error('Internal Server Error!');
    }
  } else {
    res.status(404);
    throw new Error('Pizza Not Found!');
  }
});

// @desc    Delete a Pizza By Id
// @route   DELETE /api/Pizzas/:id
// @access  Private/Admin

const deletePizzaById = asyncHandler(async (req, res) => {
  const pizza = await Pizza.findByIdAndDelete(req.params.id);

  if (pizza) {
    res.status(200).json({ message: 'Pizza Removed Successfully!' });
  } else {
    res.status(404);
    throw new Error('Pizza Not Found!');
  }
});

// Export Controllers
module.exports = {
  getAllPizzas,
  getPizzaById,
  createPizza,
  updatePizzaById,
  deletePizzaById,
};
