const mongoose = require("mongoose");

const { Schema } = mongoose;

const mbtiOptions = [
  "INFP",
  "INFJ",
  "ENFP",
  "ENFJ",
  "INTJ",
  "INTP",
  "EΕΝΤΡ",
  "ENTJ",
  "ISFP",
  "ISFJ",
  "ESFP",
  "ESFJ",
  "ISTP",
  "ISTJ",
  "ESTP",
  "ESTJ",
];
const enneagramOptions = [
  "1w2",
  "2w3",
  "3w2",
  "3w4",
  "4w3",
  "4w5",
  "5w4",
  "5w6",
  "6w5",
  "6w7",
  "7w6",
  "7w8",
  "8w7",
  "8w9",
  "9w8",
  "9wl",
];
const zodiacOptions = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const commentSchema = new Schema(
  {
    title: String,
    description: String,
    likes: {
      type: Number,
      default: 0,
    },
    userId: Number,
    commentedUser: Number, // this is the id of the profile which is being commented. ie: Elon musk
    mbti: {
      type: String,
      enum: mbtiOptions,
    },
    enneagram: {
      type: String,
      enum: enneagramOptions,
    },
    zodiac: {
      type: String,
      enum: zodiacOptions,
    },
  },
  {
    timestamps: {
      createdAt: "creationDate",
      updatedAt: "updateDate",
    },
  }
);

/** @memberOf comment# */
commentSchema.statics.addComment = function (commentData) {
  if (!commentData?.title || !commentData?.description || !commentData?.userId)
    throw new Error("No enough information");

  return this.create({ ...commentData });
};

const sortingCriteria = {
  recent: { creationDate: -1 },
  best: { likes: -1 },
};

const filterQuery = {
  mbti: { mbti: { $exists: true } },
  enneagram: { enneagram: { $exists: true } },
  zodiac: { zodiac: { $exists: true } },
};

/** @memberOf comment#
 * this function get the comments made related to the profile of an user
 * i.e All the comments made about Elon musk
 */
commentSchema.statics.getComments = async function (filter, sort, userId) {
  let query = {};
  let sorting = {};

  if (userId) {
    query.commentedUser = userId;
  }

  if (sort) {
    sorting = { ...sortingCriteria[sort.toLowerCase()] };
  }

  if (filter && filter !== "all") {
    query = { ...query, ...filterQuery[filter.toLowerCase()] }; // I keep the current query and add the options for the current filter
  }

  return await this.find(query).sort(sorting);
};

commentSchema.statics.likeAComment = async function (commentId) {
  if(!commentId) throw new Error(`error liking comment, commentId wasn't provided`);
  
  const objectId = new mongoose.Types.ObjectId(commentId);
  return this.findOneAndUpdate({_id : objectId}, {$inc : {likes : 1}}, { new: true });
}

/** @class comment */
const comment = mongoose.model("comments", commentSchema);
module.exports = comment;
