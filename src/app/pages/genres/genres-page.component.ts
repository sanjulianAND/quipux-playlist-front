import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenresService } from '../../core/services/genres.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './genres-page.component.html',
  styleUrls: ['./genres-page.component.css'],
})
export class GenresPageComponent {
  private readonly api = inject(GenresService);

  loading = true;
  error = '';
  genres: string[] = [];

  ngOnInit(): void {
    this.api.getGenres().subscribe({
      next: (data) => {
        this.genres = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'No se pudo cargar géneros';
        this.loading = false;
      },
    });
  }
}
