import mongoose from "mongoose";
import Blog from "../model/Event.js";
import User from "../model/User.js";



export const getAllEvents = async (req, res, next) => {
  let events;

  try {
    events = await Blog.find().populate("user");
  } catch (error) {
    console.log(error);
  }
  if (!events) {
    return res.status(404).json({ message: "No Blog Found!" });
  }
  return res.status(200).json({ events });
};






export const addEvent = async (req, res, next) => {
  const { title, content, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
    // console.log(existingUser)
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to Find user by this Id" });
  }

  const blog = new Blog({
    title,
    content,
    image,
    user,
  });


  try {
    const session = await mongoose.startSession();

    session.startTransaction();
    await blog.save({ session });
    existingUser.events.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {

    console.log(error);
    return res.status(500).json({ message: error });


  }

  return res.status(200).json({ blog });
};






export const updateEvent = async (req, res, next) => {
  const { title, content, image } = req.body;

  const blogId = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      content,
      image,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update Blog" });
  }
  return res.status(200).json({ blog });
};







export const getEventById = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findById(id);
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
    blog = await Blog.findByIdAndRemove(req.params.id).populate("user");
    console.log(blog)
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
  let userBlogs;
  try {
    userBlogs = await User.findById(req.params.id).populate("events");
  } catch (error) {
    console.log(error);
  }
  if (!userBlogs) {
    return res.status(400).json({ message: "No blogs found!" });
  }
  return res.status(200).json({ user: userBlogs });
};