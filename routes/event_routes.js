import express from "express";
import {
  getAllEvents,
  addEvent,
  updateEvent,
  getEventById,
  deleteEvent,
  getUserById,
} from "../Controller/Event_controller.js";

const eventRouter = express.Router();

eventRouter.get("/", getAllEvents);
eventRouter.post("/add", addEvent);
eventRouter.put("/update/:id", updateEvent);
eventRouter.get("/:id", getEventById);
eventRouter.delete("/:id", deleteEvent);
eventRouter.get("/user/:id", getUserById);

export default eventRouter;