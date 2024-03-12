import express, { Request, Response } from "express";
import Grocery from "../models/Grocery.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";

const app = express();

// View the list of available grocery items
app.get("/groceries", async (req: Request, res: Response) => {
  try {
    const groceries = await Grocery.findAll();
    res.status(200).json({ groceries });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Book multiple grocery items in a single order
app.post("/orders", async (req: Request, res: Response) => {
  const groceries = req.body.groceries;

  if (!Array.isArray(groceries)) {
    return res.status(400).json({ error: "Expected an array of groceries" });
  }

  try {
    const order: any = await Order.create();
    await Promise.all(
      groceries.map(async (grocery) => {
        const item = await Grocery.findByPk(grocery.id);
        if (item) {
          await OrderItem.create({
            orderId: order.id,
            groceryId: grocery.id,
            quantity: grocery.quantity,
          });
        }
      })
    );
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(400).json({ error: "Bad request, check input data" });
  }
});

export default app;
