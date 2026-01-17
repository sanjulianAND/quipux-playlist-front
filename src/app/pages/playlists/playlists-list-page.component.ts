import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlaylistsService } from '../../core/services/playlists.service';
import { PlaylistResponse } from '../../core/models/playlist.model';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './playlists-list-page.component.html',
  styleUrls: ['./playlists-list-page.component.css'],
})
export class PlaylistsListPageComponent {
  private readonly playlistsApi = inject(PlaylistsService);

  loading = true;
  error = '';
  playlists: PlaylistResponse[] = [];

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.loading = true;
    this.error = '';
    this.playlistsApi.findAll().subscribe({
      next: (data) => {
        this.playlists = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'No se pudo cargar playlists';
        this.loading = false;
      },
    });
  }
}
