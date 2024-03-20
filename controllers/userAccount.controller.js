const userAccountModel = require("../models/userAccount");

const addUser = async (req, res) => {
  const { body: userData } = req;
  let userProfile;
  try {
    userProfile = await userAccountModel.createUser(userData);
  } catch (err) {
    console.error(`Error creating user profile ${err}`);
    return res.status(400).json({ error: err });
  }

  return res.render("profile_template", {
    profile: userProfile,
  });
};

const findUser = async (req, res) => {
  const { userId } = req.params;
  let userProfile;

  try {
    userProfile = await userAccountModel.findUserById(userId);
  } catch (err) {
    console.error(`Error getting user profile by Id ${err}`);
    return res.status(400).json({ error: err });
  }

  return res.render("profile_template", {
    profile: userProfile,
  });
};

module.exports = {
  addUser,
  findUser,
};
