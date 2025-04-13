import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TracksComponent } from './pages/tracks/tracks.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

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
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
    },

    // Paraméterezett útvonalak
    // { path: 'task-edit/:id', component: TaskEditComponent },

    // Üres elérési út - alapértelmezett útvonal
    { path: '', redirectTo: 'home', pathMatch: 'full' },

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