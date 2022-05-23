import mongoose, { Schema } from "mongoose";

export interface IDialog extends Document {
  partner: {
    type: Schema.Types.ObjectId;
    ref: String;
    require: true;
  };
  autor: {
    type: Schema.Types.ObjectId;
    ref: String;
    require: true;
  };
  lastMessage: {
    type: Schema.Types.ObjectId;
    ref: String;
  };
}

const DialogsSchema = new Schema(
  {
    partner: { type: Schema.Types.ObjectId, ref: "User" },
    autor: { type: Schema.Types.ObjectId, ref: "User" },
    lastMessage: { type: Schema.Types.ObjectId, ref: "Messages" },
  },
  {
    timestamps: true,
  }
);

const DialogsModel = mongoose.model<IDialog>("Dialogs", DialogsSchema);

export default DialogsModel;
