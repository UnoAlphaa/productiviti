import { Router } from "express";
import * as productController from "../controllers/productController"
import { requireAuth } from "@clerk/express";

const router = Router();

//Route to get all products, without authentication
router.get("/", productController.getAllProducts)
//GET /api/products/my - Get current users product
router.get("/my", requireAuth(), productController.getMyProducts);
//GET /api/products/:id - Get single product by ID (public)
router.get("/:id", productController.getProductById);

//POST /api/products/ - Create a new Product (protected)
router.post("/", requireAuth() ,productController.createProduct);

//PUT /api/products/:id - Update a new Product (protected)
router.put("/:id", requireAuth() ,productController.updateProduct);

//DELETE /api/products/:id - Delete a new Product (protected)
router.delete("/:id", requireAuth() ,productController.deleteProduct);

export default router;