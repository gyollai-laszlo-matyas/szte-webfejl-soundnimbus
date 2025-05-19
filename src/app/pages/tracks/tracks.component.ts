import { Component } from '@angular/core';
import { Track } from '../../model/Track';
import { User } from '../../model/User';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { DateFormatterPipe } from '../../shared/pipes/date.pipe';
import { TrackService } from '../../shared/services/track.service';

@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    DateFormatterPipe
  ],
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss'
})
export class TracksComponent {
  test_user: User = {
    id: "asdfasdfasdf",
    name: "testuser",
    email: "test@email.com",
    bio: "This is a test user."
  }

  tracks: Track[] = [
    {
      name: "Test Track 1",
      url: '',
      authorId: this.test_user.id,
      tags: "edm,hardcore,epic",
      uploadDate: new Date(2000, 1, 1, 23, 59)
    },
    {
      name: "Test Track 2",
      url: '',
      authorId: this.test_user.id,
      tags: "jazz,smooth,soul",
      uploadDate: new Date(2353, 7, 6, 12, 45)
    },
    {
      name: "Test Track 3",
      url: '',
      authorId: this.test_user.id,
      tags: "nature,rain,ambient",
      uploadDate: new Date(1768, 1, 1, 23, 59)
    }
  ]

  trackById(index: string, item: Track): string {
    return item.name;
  }
}
