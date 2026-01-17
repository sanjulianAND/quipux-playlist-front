import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginPageComponent } from './pages/auth/login-page.component';
import { PlaylistsListPageComponent } from './pages/playlists/playlists-list-page.component';
import { PlaylistCreatePageComponent } from './pages/playlists/playlist-create-page.component';
import { PlaylistDetailPageComponent } from './pages/playlists/playlist-detail-page.component';
import { GenresPageComponent } from './pages/genres/genres-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'playlists' },
      { path: 'playlists', component: PlaylistsListPageComponent },
      { path: 'playlists/new', component: PlaylistCreatePageComponent },
      { path: 'playlists/:name', component: PlaylistDetailPageComponent },
      { path: 'genres', component: GenresPageComponent },
    ],
  },

  { path: '**', redirectTo: '' },
];
