import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { PlaylistsService } from '../../core/services/playlists.service';
import { PlaylistResponse } from '../../core/models/playlist.model';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './playlist-detail-page.component.html',
  styleUrls: ['./playlist-detail-page.component.css'],
})
export class PlaylistDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(PlaylistsService);
  private readonly router = inject(Router);

  name = this.route.snapshot.paramMap.get('name') ?? '';
  loading = true;
  error = '';
  playlist: PlaylistResponse | null = null;
  deleting = false;

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.loading = true;
    this.error = '';
    this.api.findByName(this.name).subscribe({
      next: (data) => {
        this.playlist = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'No se pudo cargar la playlist';
        this.loading = false;
      },
    });
  }

  delete(): void {
    if (!this.playlist || this.deleting) return;

    this.deleting = true;
    this.api.delete(this.playlist.nombre).subscribe({
      next: () => {
        this.deleting = false;
        this.router.navigateByUrl('/playlists');
      },
      error: (err) => {
        this.deleting = false;
        this.error = err?.error?.message || 'No se pudo eliminar';
      },
    });
  }
}
