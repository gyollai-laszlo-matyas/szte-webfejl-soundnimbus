import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TracksComponent } from './pages/tracks/tracks.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UploadComponent } from './pages/upload/upload.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard, publicGuard } from './shared/guards/auth-guard.guard';

export const routes: Routes = [
    // Statikus elérési útvonalak
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    },
    // Lazy loading a Tasks komponens
    {
        path: 'tracks',
        loadComponent: () => import('./pages/tracks/tracks.component').then(m => m.TracksComponent),
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
        canActivate: [publicGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
        canActivate: [publicGuard]
    },
    {
        path: 'upload',
        loadComponent: () => import('./pages/upload/upload.component').then(m => m.UploadComponent),
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
    },

    // Paraméterezett útvonalak
    // { path: 'task-edit/:id', component: TaskEditComponent },

    // Üres elérési út - alapértelmezett útvonal
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },

    // Wildcard útvonal - ha egyik útvonal sem egyezik
    //{ path: '**', component: HomeComponent }
    // { path: '**', component: PageNotFoundComponent },

    // Útvonalak egymásba ágyazása
    /*
    {
        path: 'tasks',
        title: 'Tasks',
        component: TasksComponent,
        children: [
            { path: 'completed', component: CompletedComponent },
        ]
    },
    */
];