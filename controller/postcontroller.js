const PostModel = require("../model/postSchema");

const createPostController = async (req, res) => {
  try {
    const body = req.body;
    const objToSend = {
      title: body.title,
      desc: body.desc,
      user_id: body.userId,
    };
    const data = await PostModel.create(objToSend);
    res.json({
      message: "Succesfully Created The Post",
      status: true,
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

const getPostController = async (req, res) => {
  try {
    const query = {};
    const userRecords = await PostModel.find({});
    console.log(userRecords);
    res.json({
      message: "Data Get",
      status: true,
      data: userRecords,
    });
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

const singlePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const userRecords = await PostModel.findById(id);
    console.log(userRecords);
    res.json({
      message: "Single Post Get",
      status: true,
      data: userRecords,
    });
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

const updatePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const userRecords = await PostModel.findByIdAndUpdate(id, body);
    console.log(userRecords);
    res.json({
      message: "update  user",
      status: true,
      data: userRecords,
    });
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const userRecords = await PostModel.findByIdAndDelete(id);
    console.log(userRecords);
    res.json({
      message: "delete  user",
      status: true,
      data: userRecords,
    });
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

module.exports = {
  createPostController,
  getPostController,
  singlePostController,
  updatePostController,
  deletePostController,
};
