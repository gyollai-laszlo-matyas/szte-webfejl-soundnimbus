import { Component } from '@angular/core';
import { Track } from '../../model/Track';
import { User } from '../../model/User';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule, MatDividerModule, MatIconModule
  ],
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss'
})
export class TracksComponent {
  test_user: User = {
    name: "testuser",
    email: "test@email.com",
    password: "123456",
    bio: "This is a test user."
  }

  tracks: Track[] = [
    {
      name: "Test Track 1",
      filename: '',
      author: this.test_user,
      comments: [],
      tags: ["edm", "hardcore", "epic"]
    },
    {
      name: "Test Track 2",
      filename: '',
      author: this.test_user,
      comments: [],
      tags: ["jazz", "smooth", "soul"]
    },
    {
      name: "Test Track 3",
      filename: '',
      author: this.test_user,
      comments: [],
      tags: ["nature", "rain", "ambient"]
    }
  ]

  trackById(index: string, item: Track): string {
    return item.name;
  }
}
