import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dataBaseConnection } from "./db.js";
import { userRouter } from "./routes/user.js";
import { contentRouter } from "./routes/content.js";
import { isAuthorized } from "./middlewares/auth.js";

//config the env variables
dotenv.config()

//server setup
const app = express();
const PORT = process.env.PORT;

//Middlewares
app.use(express.json())
app.use(cors())

//Database Connection
dataBaseConnection();

//routes
app.use("/api/user", userRouter);
app.use("/api/content", isAuthorized, contentRouter);

//Listen the server
app.listen(PORT, () => {
    console.log(`server started in localhost: ${PORT}`);
})