import express from "express";
import io from "socket.io";
import { DialogsModel, MessagesModel } from "../models";

class MessagesController {
  io: io.Socket;
  constructor(io: io.Socket) {
    this.io = io;
  }

  index = (req: express.Request, res: express.Response) => {
    const dialogId: String = req.params.id;
    MessagesModel.find({ dialog: dialogId })
      .populate(["dialog"])
      .exec(function (err, messages) {
        if (err) {
          return res.status(404).json({
            message: "Messages not found",
          });
        }
        res.json(messages);
      });
  };
  create = (req: any, res: express.Response) => {
    const userId: String = req.user._id;
    const postData = {
      text: req.body.text,
      dialog: req.body.dialog_id,
      user: userId,
    };
    const messages = new MessagesModel(postData);
    messages
      .save()
      .then((obj: any) => {
        obj.populate(["dialog"], (err: any, message: any) => {
          if (err) {
            return res.status(404).json({
              message: err,
            });
          }

          DialogsModel.findOneAndUpdate(
            { _id: postData.dialog },
            { lastMessage: message._id },
            { upsert: true },
            (err) => {
              return res.status(500).json({
                status: "error",
                message: err,
              });
            }
          );

          res.json(message);
          this.io.emit("SERVER:NEW_MESSAGE", message);
        });
      })
      .catch((reason: any) => res.json(reason));
  };
  delete = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    MessagesModel.findByIdAndRemove(id, (err: any, messages: any) => {
      if (err) {
        return res.status(404).json({
          message: "Message not found",
        });
      }
      res.json({
        message: `Message deleted`,
      });
    });
  };
}

export default MessagesController;
