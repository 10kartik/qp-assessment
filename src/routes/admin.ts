import { Router } from "express";
import Grocery from "../models/Grocery.js";
import { Request, Response } from "express";

const router = Router();

router.post("/groceries", async (req: Request, res: Response) => {
  const groceries = req.body.groceries;

  console.log(groceries);

  if (!Array.isArray(groceries)) {
    return res.status(400).json({ error: "Expected an array of groceries" });
  }

  try {
    const newGroceries = await Grocery.bulkCreate(groceries);
    res.status(201).json(newGroceries);
  } catch (error) {
    res.status(400).json({ error: "Bad request, check input data" });
  }
});

router.get("/groceries", async (req: Request, res: Response) => {
  try {
    const groceries = await Grocery.findAll();
    res.status(200).json({ groceries });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/groceries", async (req: Request, res: Response) => {
  const groceryIds = req.query.groceryIds;

  if (!Array.isArray(groceryIds)) {
    return res.status(400).json({ error: "Expected an array of grocery IDs" });
  }

  try {
    await Grocery.destroy({
      where: {
        id: groceryIds,
      },
    });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: "Bad request, check input data" });
  }
});

router.put("/groceries", async (req: Request, res: Response) => {
  const groceries = req.body.groceries;

  if (!Array.isArray(groceries)) {
    return res.status(400).json({ error: "Expected an array of groceries" });
  }

  try {
    await Promise.all(
      groceries.map(async (grocery) => {
        await Grocery.update(grocery, {
          where: {
            id: grocery.id,
          },
        });
      })
    );
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: "Bad request, check input data" });
  }
});

router.put("/inventory", async (req: Request, res: Response) => {
  const groceries = req.body.groceries;

  if (!Array.isArray(groceries)) {
    return res.status(400).json({ error: "Expected an array of groceries" });
  }

  try {
    await Promise.all(
      groceries.map(async (grocery) => {
        await Grocery.update(
          { quantity: grocery.quantity },
          {
            where: {
              id: grocery.id,
            },
          }
        );
      })
    );
    res.status(200).json({ message: "Inventory levels updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "Bad request, check input data" });
  }
});

export default router;
