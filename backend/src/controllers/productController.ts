import type { Request, Response } from "express";
import * as queries from "../db/queries"
import { getAuth } from "@clerk/express";


// Get all Products (Public)
export const getAllProducts = async (req:Request, res:Response) =>{
    try {
        const products = await queries.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error while fetching products", error);
        res.status(500).json({error : "Failed to fetch products"});
    }
}

//Get all my Products (Protected Route)
export const getMyProducts = async (req:Request,res:Response)=>{
    try {
        const {userId} = getAuth(req);
        if(!userId) return res.status(401).json({error : "Unauthorized"});

        const product = await queries.getProductById(userId);
        return res.status(200).json(product);
    } catch (error) {
        console.error("Failed to fetch Products", error);
        res.status(500).json({error : "Failed to fetch your produts"})
    }
}
//Get product by ID public route
export const getProductById = async (req:Request, res:Response)=> {
    try {
        const {id} = req.params;
        const productId = Array.isArray(id) ? id[0] : id;
        const product = await queries.getProductById(productId);
        if(!product) return res.status(404).json({error : "Product not found"});
        return res.status(200).json(product);
    } catch (error) {
        console.log("failed to fetch product with this id", error)
        res.status(500).json({error : "Failed to fetch the product with this ID"})
    }
}

// Create a new Product (Protected Route)
export const createProduct  = async (req:Request, res:Response)=> {
    try {
        const {userId} = getAuth(req);
        if(!userId) return res.status(401).json({error : "Unauthorized"});

        const {title, description, imageUrl} = req.body;

        if(!title || !description || !imageUrl) {
            res.status(400).json({error :  "Title, description, imageUrl are required"});
            return;
        }

        const product = await queries.createProduct({
            title,
            description,
            imageUrl,
            userId,
        })
        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating a product:", error );
        res.status(500).json({error : "Failed to create Product"});
    }
}

export const updateProduct = async (req:Request, res:Response)=>{
    try {
    const {userId} = getAuth(req);
    if(!userId) return res.status(401).json({error : "Unauthorized"});

    const {id} = req.params;
    const {title, description, imageUrl} = req.body;

    //check if product exists and belongs to user 
    const productId = Array.isArray(id) ? id[0] : id;
    const existingProduct = await queries.getProductById(productId)
    if(!existingProduct) {
        res.status(404).json({error : "Product not found"})
        return;
    }

    if(existingProduct.userId !== userId){
        res.status(403).json({error : "You can only update your own products"});
        return;
    }

    const product = await queries.updateProduct(productId, {
        title,
        description,
        imageUrl
    });
    res.status(201).json(product)
    } catch (error) {
        console.error("Error Updating Product", error);
        res.status(500).json({error : "Failed to update Product"});       
    }
}

export const deleteProduct = async (req:Request, res:Response) => {
    try {
        const {userId} = getAuth(req);
    if(!userId) return res.status(401).json({error : "Unauthorized"});

    const {id} = req.params;
    const productId = Array.isArray(id) ? id[0] : id;

    const existingProduct = await queries.getProductById(productId);
    if(!existingProduct){
        res.status(404).json({error : "product not found"});
        return;
    }

    if(existingProduct.userId !== userId){
        res.status(403).json({error : "You can only Delete your own product "});
    }
    await queries.deleteProduct(productId);
    res.status(200).json({message : "Product Deleted Successfully"})
    } catch (error) {
        console.error("Error deleting product", error)
        res.status(500).json({error : "Failed to Delete Product"})
    }
}