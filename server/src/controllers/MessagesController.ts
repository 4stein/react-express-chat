import express from "express";
import io from "socket.io";
import { DialogsModel, MessagesModel } from "../models";

class MessagesController {
  io: io.Socket;
  constructor(io: io.Socket) {
    this.io = io;
  }

  updateReadStatus = (
    res: express.Response,
    userId: string,
    dialogId: string
  ): void => {
    MessagesModel.updateMany(
      { dialog: dialogId, user: { $ne: userId } },
      { $set: { readed: true } },
      (err: any): void => {
        if (err) {
          res.status(500).json({
            status: "error",
            message: err,
          });
        } else {
          this.io.emit("SERVER:MESSAGES_READED", {
            userId,
            dialogId,
          });
        }
      }
    );
  };

  index = (req: any, res: express.Response): void => {
    const dialogId: string = req.params.id;
    const userId: string = req.user._id;

    this.updateReadStatus(res, userId, dialogId);

    MessagesModel.find({ dialog: dialogId })
      .populate(["dialog", "user"])
      .exec(function (err, messages) {
        if (err) {
          return res.status(404).json({
            status: "error",
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
        obj.populate(["dialog", "user"], (err: any, message: any) => {
          if (err) {
            return res.status(404).json({
              message: err,
            });
          }

          DialogsModel.findOneAndUpdate(
            { _id: postData.dialog },
            { lastMessage: message._id },
            { upsert: true },
            function (err) {
              if (err) {
                return res.status(500).json({
                  status: "error",
                  message: err,
                });
              }
            }
          );

          res.json(message);
          this.io.emit("SERVER:MESSAGE_CREATED", message);
        });
      })
      .catch((reason: any) => res.json(reason));
  };
  delete = (req: any, res: express.Response): void => {
    const id: string = req.params.id;
    const userId: string = req.user._id;
    console.log(userId);
    MessagesModel.findById(id, (err: any, message: any) => {
      if (err || !message) {
        return res.status(404).json({
          status: "error",
          message: "Message not found",
        });
      }

      if (message.user.toString() === userId) {
        const dialogId = message.dialog;
        message.remove();

        MessagesModel.findOne(
          { dialog: dialogId },
          {},
          { sort: { created_at: -1 } },
          (err, lastMessage) => {
            if (err) {
              res.status(500).json({
                status: "error",
                message: err,
              });
            }

            DialogsModel.findById(dialogId, (err: any, dialog): any => {
              if (err) {
                res.status(500).json({
                  status: "error",
                  message: err,
                });
              }

              if (!dialog) {
                return res.status(404).json({
                  status: "not found",
                  message: err,
                });
              }

              dialog.lastMessage = lastMessage ? lastMessage.toString() : "";
              dialog.save();
            });
          }
        );

        return res.json({
          status: "success",
          message: "Message deleted",
        });
      } else {
        return res.status(403).json({
          status: "error",
          message: "Not have permission",
        });
      }
    });
  };
}

export default MessagesController;
