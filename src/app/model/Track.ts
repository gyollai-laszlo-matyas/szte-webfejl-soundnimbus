import { User } from "./User";
import { Comment } from "./Comment";

export interface Track {
    name: string;
    filename: string;
    author: User;
    comments: Comment[];
    tags: string[];
  }