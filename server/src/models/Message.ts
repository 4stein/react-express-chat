import mongoose from "mongoose";
mongoose.plugin((schema: any) => {
  schema.options.usePushEach = true;
});
const Schema = mongoose.Schema;
export interface IMessages extends Document {
  text: {
    type: String;
    require: true;
  };
  dialog: {
    type: any;
    ref: String;
    require: true;
  };
  readed: {
    type: Boolean;
    default: Boolean;
  };
}

const MessageSchema = new Schema(
  {
    text: { type: String, require: Boolean },
    dialog: { type: Schema.Types.ObjectId, ref: "Dialogs", require: true },
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
    readed: {
      type: Boolean,
      default: false,
    },
    attachments: [{ type: Schema.Types.ObjectId, ref: "UploadFile" }],
  },
  {
    timestamps: true,
    // usePushEach: true,
  }
);

const Message = mongoose.model<IMessages>("Messages", MessageSchema);

export default Message;
