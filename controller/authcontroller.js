const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/userSchema");

const signUpController = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const { firstName, email, password, age, gender } = body;
    if (!firstName || !email || !password || !age || !gender) {
      res.json({
        status: false,
        message: "Required fields are missing",
        data: null,
      });
      return;
    }
    console.log("Real Password", password);
    const hashpass = await bycrypt.hash(password, 10);
    const objToSend = {
      first_name: firstName,
      email,
      password: hashpass,
      age,
      gender,
    };
    const emailExists = await UserModel.findOne({ email });
    console.log(emailExists, "email Exists");
    if (emailExists) {
      res.json({
        status: false,
        message: "This Email Already Exists Please Try Different Email",
        data: null,
      });
      return;
    }

    const userDataSave = await UserModel.create(objToSend);
    res.json({
      status: true,
      message: "user succesfully created",
      data: userDataSave,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password, "email, password");

  const emailExist = await UserModel.findOne({ email });
  console.log(emailExist, "email Exist");
  if (!emailExist) {
    res.json({
      message: "Invalid Credential",
      status: false,
      data: null,
    });
    return;
  }

  const comparePass = await bycrypt.compare(password, emailExist.password);
  if (comparePass) {
    var token = jwt.sign({ email: emailExist.email }, "Private Key");
    console.log("token", token);
    res.json({
      message: "User Login SuccessFully",
      status: true,
      data: emailExist,
      token,
    });
    return;
  } else {
    res.json({
      message: "Invalid Credential",
      status: false,
      data: null,
    });
    return;
  }
};

module.exports = {
  signUpController,
  loginController,
};
