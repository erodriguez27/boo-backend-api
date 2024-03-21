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

const getUser = async (req, res) => {
  const { 0: userId } = req.params; // as the get was implemented with a wildcard it leaved me no choice but to get the Id this way
  let userProfile;

  if (userId) {
    try {
      userProfile = await userAccountModel.findUserById(userId);
    } catch (err) {
      console.error(`Error getting user profile by Id ${err}`);
      return res.status(400).json({ error: err });
    }
  } else {
    userProfile = {
      id: 1,
      name: "A Martinez",
      description: "Adolph Larrue Martinez III.",
      mbti: "ISFJ",
      enneagram: "9w3",
      variant: "sp/so",
      tritype: 725,
      socionics: "SEE",
      sloan: "RCOEN",
      psyche: "FEVL",
      image: "https://soulverse.boo.world/images/1.png",
    };
  }

  if (!userProfile) return res.sendStatus(404);

  return res.render("profile_template", {
    profile: userProfile,
  });
};

const findUser = async (req, res) => {
  const { userId } = req.params;
  let userProfile;

  try {
    userProfile = await userAccountModel.findUserById(userId);
    console.log(userProfile);
  } catch (err) {
    console.error(`Error getting user profile by Id ${err}`);
    return res.status(400).json({ error: err });
  }

  if (!userProfile) return res.sendStatus(404);

  return res.render("profile_template", {
    profile: userProfile,
  });
};

module.exports = {
  addUser,
  getUser,
  findUser,
};
