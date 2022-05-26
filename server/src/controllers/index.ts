import { default as User } from "./UserController";
import { default as Dialogs } from "./DialogsController";
import { default as Messages } from "./MessagesController";

export const UserController = new User();
export const DialogsController = new Dialogs();
export const MessagesController = new Messages();
