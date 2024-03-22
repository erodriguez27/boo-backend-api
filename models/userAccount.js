const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema(
  {
    id: Number,
    name: String,
    description: String,
    mbti: String,
    enneagram: String,
    variant: String,
    tritype: Number,
    socionics: String,
    sloan: String,
    psyche: String,
    image: String
  },
  {
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'updateDate'
    }
  }
);

const counterSchema = new mongoose.Schema({
  _id: String, // Use a String ID to avoid conflicts with user-defined IDs
  seq: { type: Number, default: 0 }
});

// Create a model for the counter schema
const Counter = mongoose.model('Counter', counterSchema);

userSchema.pre('save', async function(next) {
  const doc = this; // This refers to the document being saved
  
  // Check if ID is already set (might be for updates)
  if (doc.id) {
    return next();
  }
  
  try {
    // Find or create the counter document (ensures only one counter exists)
    const counter = await Counter.findOneAndUpdate(
      { _id: 'myCounter' }, // Use a unique identifier for the counter
      { $inc: { seq: 1 } }, // Increment the sequence by 1
      { new: true, upsert: true }  // Return the updated document
    );
    
    // Assign the incremented sequence value as the document's ID
    doc.id = counter.seq;
    next();
  } catch (error) {
    next(error); // Pass any errors to the main save operation
  }
});

/** @memberOf UserAccount# */
userSchema.statics.createUser = function (userData) {
    if(!userData?.name) throw new Error('No name provided');
    
    return this.create({...userData});
}

userSchema.statics.findUserById = function(userId) {
    if(!userId) throw new Error('No userId provided');
    
    return this.findOne({id: userId});
}

/** @class userAccount */
const userAccount = mongoose.model('userAccount', userSchema);
module.exports = userAccount;