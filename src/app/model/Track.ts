import { User } from "./User";
import { Comment } from "./Comment";

export interface Track {
    name: string;
    url: string;
    authorId: string;
    tags: string;
    uploadDate: Date;
  }