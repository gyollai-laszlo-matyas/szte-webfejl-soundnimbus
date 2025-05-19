import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, collection, query, where, getDocs, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../model/User';
import { Track } from '../../model/Track';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  listTracks(): Observable<{
    tracks: Track[],
  }> {
    return from(this.fetchTracks(null, null));
  }

  private async fetchTracks(authorFilter: null, tagFilter: null): Promise<{
    tracks: Track[]
  }> {
    try {
      const tracksCollection = collection(this.firestore, 'Tracks');
      const tracks: Track[] = [];
      if(authorFilter != null){
        const q = query(tracksCollection, where('authorId', '==', authorFilter));
        const tracksSnapshot = await getDocs(q);
        tracksSnapshot.forEach(doc => {
          tracks.push({ ...doc.data()} as Track);
        });
      }else if(tagFilter != null){
          const tracksSnapshot = await getDocs(tracksCollection);
          const tracksPreFilter: Track[] = [];
          tracksSnapshot.forEach(doc => {
            tracksPreFilter.push({ ...doc.data()} as Track);
          });
          tracksPreFilter.forEach(track => {
            if(track.tags.split(",").indexOf(tagFilter) != -1){
              tracks.push(track);
            }
          });
      }else{
        const tracksSnapshot = await getDocs(tracksCollection);
        tracksSnapshot.forEach(doc => {
          tracks.push({ ...doc.data()} as Track);
        });
      }
      return {
        tracks,
      };
    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error);
      return {
        tracks: [],
      };
    }
  }
}