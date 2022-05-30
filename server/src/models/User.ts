import mongoose, { Schema } from "mongoose";
import { differenceInMinutes } from "date-fns";
import validator from "validator";
import { IUser } from "../types";
import { generatePasswordHash } from "../utils";

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
    last_seen: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual("isOnline").get(function (this: any) {
  return differenceInMinutes(new Date(), this.last_seen) < 5;
});

UserSchema.set("toJSON", {
  virtuals: true,
});

UserSchema.pre<IUser>("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  user.password = await generatePasswordHash(user.password);
  user.confirm_hash = await generatePasswordHash(new Date().toString());
  next();
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
