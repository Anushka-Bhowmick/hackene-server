



import express from 'express'
import eventRouter from "./routes/event_routes.js";
import router from "./routes/user_routes.js";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", router);
app.use("/api/blog", eventRouter);

const PORT = process.env.PORT || 8000;
// const PORT = 8000;

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() =>{
    app.listen(PORT,()=>{
      console.log('running')
      console.log(`Connected To Database and listening at PORT ${PORT}`)
    })
  }
    
  )
  .catch((err) => console.log(err));


