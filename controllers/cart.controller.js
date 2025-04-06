// // controllers/cartController.js

// import { Cart } from "../models/purchase.js";

// // POST /api/cart/add
// const addToCart = async (req, res) => {
//   try {
//     const { userId, testIds, testNames, testPrices } = req.body;

//     if (!userId || !testIds || !testNames || !testPrices) {
//       return res.status(400).json({ message: "All fields are required." });
//     }
//     if (
//       testIds.length !== testNames.length ||
//       testNames.length !== testPrices.length
//     ) {
//       return res
//         .status(400)
//         .json({ message: "Mismatch in array lengths of test details." });
//     }

//     const totalPrice = testPrices.reduce((acc, curr) => acc + parseFloat(curr), 0);

//     const cart = await Cart.create({
//       userId,
//       testIds,
//       testNames,
//       testPrices,
//       totalPrice,
//     });

//     return res.status(201).json({
//       message: "Tests added to cart successfully.",
//       cart,
//     });
//   } catch (error) {
//     console.error("Add to cart error:", error);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// };

// // GET /api/cart/:userId
// const getCart = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const cart = await Cart.findOne({ where: { userId } });

//     if (!cart) return res.status(404).json({ error: "Cart not found" });

//     res.status(200).json({
//       userId: cart.userId,
//       testIds: cart.testIds,
//       testNames: cart.testNames,
//       testPrices: cart.testPrices,
//       totalPrice: cart.totalPrice,
//     });
//   } catch (error) {
//     console.error("Fetch cart error:", error);
//     res.status(500).json({ error: "Error fetching cart" });
//   }
// };

// export { addToCart, getCart };

import { Cart } from "../models/cart.model.js";

export const addToCart = async (req, res) => {
  try {
    const { testIds, testNames, testPrices } = req.body;
    const totalPrice = testPrices.reduce((acc, price) => acc + price, 0);

    const cart = await Cart.create({
      userId: req.user.id,
      testIds,
      testNames,
      testPrices,
      totalPrice,
    });

    res.status(201).json({ message: "Added to cart", cart });
  } catch (error) {
    console.error("Cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findAll({ where: { userId: req.user.id } });

    res.status(200).json({ cart });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartId } = req.params;

    const cartItem = await Cart.findOne({ where: { id: cartId, userId } });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await cartItem.destroy();
    res.status(200).json({ message: "Cart item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
