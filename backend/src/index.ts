import express from "express";
import cors from "cors"

import {ENV} from "./config/env"
import { clerkMiddleware } from '@clerk/express';


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

app.listen(ENV.PORT, () => console.log(`server is running on port ${ENV.PORT}`));