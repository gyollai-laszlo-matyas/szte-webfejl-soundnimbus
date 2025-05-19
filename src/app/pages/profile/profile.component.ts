import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../model/User';
import { Track } from '../../model/Track';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  tracks: Track[] = [];
  stats = {
    tracks: 0,
    comments: 0
  };
  isLoading = true;

  updateForm = new FormGroup({
    newName: new FormControl('', [Validators.required]),
    newBio: new FormControl(''),
  });
  
  private subscription: Subscription | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.subscription = this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data.user;
        this.tracks = data.tracks;
        this.stats = data.stats;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Hiba a felhasználói profil betöltésekor:', error);
        this.isLoading = false;
      }
    });
  }

  updateProfile(): void {
    const nameV = this.updateForm.get('newName')?.value || '';
    const bioV = this.updateForm.get('newBio')?.value || '';
    console.log("Updating: " + nameV + " " + bioV);
    this.userService.updateUser(nameV, bioV).subscribe({
      next: (data) => {
        this.user = data.user;
        this.loadUserProfile();
      },
      error: (error) => {
        console.error('Hiba a felhasználói profil betöltésekor:', error);
      }
    });
  }
}