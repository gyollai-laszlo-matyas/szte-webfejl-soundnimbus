import { AfterViewInit, Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, AfterViewInit{

  @Input() sidenav!: MatSidenav;
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Input() isLoggedIn: boolean = false;
  @Output() logoutEvent = new EventEmitter<void>();
  
  private authSubscription?: Subscription;

  constructor(private authService: AuthService) {
    console.log("constructor called");
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
      localStorage.setItem('isLoggedIn', this.isLoggedIn ? 'true' : 'false');
    });
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  closeMenu() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  logout() {
    this.authService.signOut().then(() => {
      this.logoutEvent.emit();
      this.closeMenu();
    });
  }
}