import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TokenStorageService } from '../../../core/services/token-storage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="nav">
      <div class="brand">Playlist</div>
      <nav class="links">
        <a routerLink="/playlists" routerLinkActive="active">Playlists</a>
        <a routerLink="/genres" routerLinkActive="active">Géneros</a>
      </nav>
      <button class="btn" (click)="logout()">Salir</button>
    </header>
  `,
  styles: [
    `
      .nav {
        display: flex;
        gap: 16px;
        align-items: center;
        padding: 12px 16px;
        border-bottom: 1px solid #e6e6e6;
      }
      .brand {
        font-weight: 700;
      }
      .links {
        display: flex;
        gap: 12px;
        margin-left: auto;
        margin-right: 12px;
      }
      .active {
        text-decoration: underline;
      }
      .btn {
        padding: 8px 12px;
        border: 1px solid #ddd;
        background: #fff;
        cursor: pointer;
        border-radius: 8px;
      }
    `,
  ],
})
export class NavbarComponent {
  constructor(private tokenStorage: TokenStorageService) {}

  logout() {
    this.tokenStorage.clear();
    window.location.href = '/login';
  }
}
