export default interface IUser extends Document {
  email: String;
  fullname: String;
  password: any;
  confirmed: Boolean;
  avatar?: String;
  confirm_hash?: String;
  last_seen?: Date;
  reduse?: string[];
  isModified?: any;
}
