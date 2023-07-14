import { Document } from "mongoose";

export interface UserInterface extends Document {
  username?: string;
  password?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  private?: boolean;
  lastLogin?: Date;
} 