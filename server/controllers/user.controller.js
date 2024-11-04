import { User } from "../models/user.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const createUser = async (req, res) => {
  try {
    if (!req.auth || !req.auth.payload) {
      return res.status(400).json({ message: "Authentication payload not found" });
    }

    const { sub } = req.auth.payload;
    const { name, avatar, email } = req.body;
    let existingUser = await User.findOne({ $or: [{ auth0Id: sub }, { email: email }] });

    if (existingUser) {
      return res.status(409).json({
        "message": "User already exists"
      });
    }
    let user = await User.findOne({ auth0Id: sub });

    if (user) {
      return res.status(409).json(user);
    }
    user = new User({
      properties: [],
      auth0Id: sub,
      name: name || "Anonymous",
      email: email,
      avatar: avatar || null,
    });

    await user.save();

    return res.status(200).json(user);
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }

}
const getUserById = async (req, res) => {

  const id = req.params.id;
  const user = await User.findOne({ auth0Id: id });

  if (!user) {
    res.status(404).json({
      "message": "user not found"
    }
    );
  }
  res.status(201).json({ user });
}
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ auth0Id: id });
    if (!user) {
      res.status(404).json({
        "message": "user not found"
      }
      );
    }
    const { name, avatar, email } = req.body;
    user.name = name || user.name;
    user.avatar = avatar || user.avatar;
    user.email = email || user.email;
    await user.save();
    res.status(200).json(user);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export {
  getAllUsers,
  createUser,
  getUserById,
  updateUser
}