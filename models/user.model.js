const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const Schema = mongoose.Schema


const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    username : String,
    email : {
        type: String,
        required: true
    },
    password : {
        type : String,
        required : true
    },
    profile_img: {
        type : String,
    },
    spendingTags : {
        type : Object
    }
}, {timestamps: true});


userSchema.methods.matchPassword = async function (enteredPassword){
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
  }
  
  userSchema.pre("save", async function (next) {
      if (!this.isModified("password")) {
        return next();
      }
      try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
      } catch (error) {
        return next(error);
      }
    }); 

const User = mongoose.model("User", userSchema)
module.exports = User