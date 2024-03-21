const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

const { Schema } = mongoose

autoIncrement.initialize(mongoose.connection);

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
      createdAt: 'creation_date',
      updatedAt: 'update_date'
    }
  }
);

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
userSchema.plugin(autoIncrement.plugin, { model: 'userAccount', field: 'id' });
const userAccount = mongoose.model('userAccount', userSchema);
module.exports = userAccount;