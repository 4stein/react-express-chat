import mongoose, { Schema } from "mongoose";
import validator from "validator";

//TODO Last Visit as defoult
const UserSchema = new Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "invalid Email"],
      required: "Email is required",
    },
    fullname: {
      type: String,
      required: "Fullname is required",
    },
    password: {
      type: String,
      required: "Password is required",
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    avatar: String,
    confirm_hash: String,
    last_seen: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
