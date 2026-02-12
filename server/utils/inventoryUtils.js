// Import Schema
const { Base, Sauce, Cheese, Veggie } = require('../schemas/inventorySchema');

// Update inventory quantity for a given item
const updateInventoryQuantity = async (pizza, qty) => {
  console.log("Inventory update triggered for:", pizza.name);
  const { bases, sauces, cheeses, veggies } = pizza;

  const updateQuantity = async (Model, itemName) => {
    const item = await Model.findById(itemName);

    if (!item) {
      throw new Error(`${itemName} not found in inventory!`);
    }

    if (item.quantity < qty) {
      throw new Error(
        `Not enough ${item.name} in inventory! Please update inventory!`
      );
    }

    item.quantity -= qty;
    await item.save();
  };

  for (const base of bases) {
    console.log("Base:", base);
    await updateQuantity(Base, base);
  }

  for (const sauce of sauces) {
    await updateQuantity(Sauce, sauce);
  }

  for (const cheese of cheeses) {
    await updateQuantity(Cheese, cheese);
  }

  for (const veggie of veggies) {
    await updateQuantity(Veggie, veggie);
  }
};

module.exports = { updateInventoryQuantity };
