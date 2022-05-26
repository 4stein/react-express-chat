import express from "express";
import { MessagesModel } from "../models";

class MessagesController {
  index(req: express.Request, res: express.Response) {
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
  }
  create(req: any, res: express.Response) {
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
        res.json(obj);
      })
      .catch((reason: any) => res.json(reason));
  }
  delete(req: express.Request, res: express.Response) {
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
  }
}

export default MessagesController;
