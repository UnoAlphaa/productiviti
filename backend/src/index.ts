import express from "express";
import cors from "cors"

import {ENV} from "./config/env"
import { clerkMiddleware } from '@clerk/express';

import userRoutes from "./routes/userRoutes"
import productRoutes from "./routes/productRoutes"
import commentRoutes from "./routes/commentRoutes"


const app = express();

app.use(cors({origin :  ENV.FRONTEND_URL, credentials : true}))
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.json({message: "welcome to productivity API - powered by postgress, Drizzle, and Clerk Auth",
        endpoint : {
            users : "/api/users",
            products : "/api/products",
            comments : "/api/comments",
        },

    });
})

app.get("/api/users", userRoutes);
app.get("/api/products", productRoutes);
app.get("/api/comment", commentRoutes);

app.listen(ENV.PORT, () => console.log(`server is running on port ${ENV.PORT}`));