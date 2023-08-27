import express from "express";
import { getAllUser, signUp, signIn } from "../Controller/User_controller.js";

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;