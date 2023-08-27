import mongoose from "mongoose";
import Event from "../model/Event.js";
import User from "../model/User.js";

export const getAllEvents = async (req, res, next) => {
  let events;

  try {
    events = await Event.find().populate("user");
  } catch (error) {
    console.log(error);
  }
  if (!events) {
    return res.status(404).json({ message: "No Event Found!" });
  }
  return res.status(200).json({ events });
};





export const addEvent = async (req, res, next) => {
  const { title, content, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to Find user by this Id" });
  }

  const event = new Event({
    title,
    content,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();

    session.startTransaction();
    await event.save({ session });
    existingUser.events.push(event);
    await existingUser.save({ session });
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
  return res.status(200).json({ event });
};




export const updateEvent = async (req, res, next) => {
  const { title, content, image } = req.body;

  const blogId = req.params.id;

  let blog;
  try {
    blog = await Event.findByIdAndUpdate(blogId, {
      title,
      content,
      image,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update Event" });
  }
  return res.status(200).json({ blog });
};





export const getEventById = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Event.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: "No blog found!" });
  }
  return res.status(200).json({ blog });
};





export const deleteEvent = async (req, res, next) => {
  let blog;
  try {
    blog = await Event.findByIdAndRemove(req.params.id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Delete" });
};





export const getUserById = async (req, res, next) => {
  let userEvents;
  try {
    userEvents = await User.findById(req.params.id).populate("events");
  } catch (error) {
    console.log(error);
  }
  if (!userEvents) {
    return res.status(400).json({ message: "No blogs found!" });
  }
  return res.status(200).json({ user : userEvents });
};
