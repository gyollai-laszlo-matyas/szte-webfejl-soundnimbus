import { User } from "./User";
import { Track } from "./Track";

export interface Playlist {
    name: string;
    tracks: Track[];
    author: User;
  }