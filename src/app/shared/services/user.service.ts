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
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getUserProfile(): Observable<{
    user: User | null,
    tracks: Track[],
    stats: {
      tracks: number,
      comments: number
    }
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({
            user: null,
            tracks: [],
            stats: {
              tracks: 0,
              comments: 0
            }
          });
        }
        console.log(authUser.uid);
        return from(this.fetchUserWithTracks(authUser.uid));
      })
    );
  }

  updateUser(newName: string, newBio: string): Observable<{
    user: User | null,
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({
            user: null
          });
        }
        console.log(authUser.uid);
        return from(this.updateUser_priv(authUser.uid, newName, newBio));
      })
    );
  }

  private async updateUser_priv(userId: string, newName: string, newBio: string): Promise<{
    user: User | null
  }> {
    const userDocRef = doc(this.firestore, 'Users', userId);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    const userData = userSnapshot.data() as User;
    console.log(userData);
    const user = { ...userData, id: userId };

    await updateDoc(userDocRef, {
      name: newName,
      bio: newBio
    });
    return {
      user
    };
  }

  private async fetchUserWithTracks(userId: string): Promise<{
    user: User | null,
    tracks: Track[],
    stats: {
      tracks: number,
      comments: number
    }
  }> {
    try {
      // Felhasználó adatainak lekérése
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);
      console.log(userSnapshot);
      
      if (!userSnapshot.exists()) {
        return {
          user: null,
          tracks: [],
          stats: {
            tracks: 0,
            comments: 0
          }
        };
      }

      const userData = userSnapshot.data() as User;
      console.log(userData);
      const user = { ...userData, id: userId };

      // Feladatok lekérése a Tasks kollekcióból
      const tracksCollection = collection(this.firestore, 'Tracks');
      const q = query(tracksCollection, where('authorId', '==', user.id));
      const tracksSnapshot = await getDocs(q);
      
      const tracks: Track[] = [];
      tracksSnapshot.forEach(doc => {
        tracks.push({ ...doc.data()} as Track);
      });

      // Statisztikák kiszámítása
      const total = tracks.length;

      return {
        user,
        tracks,
        stats: {
          tracks: total,
          comments: 0
        }
      };
    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error);
      return {
        user: null,
        tracks: [],
        stats: { tracks: 0, comments: 0 }
      };
    }
  }
}