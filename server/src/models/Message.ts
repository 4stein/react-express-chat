import mongoose, { Schema } from "mongoose";

export interface IMessages extends Document {
  text: {
    type: String;
    require: true;
  };
  dialog: {
    type: Schema.Types.ObjectId;
    ref: String;
    require: true;
  };
  unread: {
    type: Boolean;
    default: Boolean;
  };
}

// TODO Make Attachments for files
// attachments:
const MessageSchema = new Schema(
  {
    text: { type: String, require: Boolean },
    dialog: { type: Schema.Types.ObjectId, ref: "Dialogs", require: true },
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
    unread: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model<IMessages>("Messages", MessageSchema);

export default Message;
