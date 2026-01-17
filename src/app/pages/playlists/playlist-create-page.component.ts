import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PlaylistsService } from '../../core/services/playlists.service';

type SongForm = FormGroup<{
  titulo: FormControl<string>;
  artista: FormControl<string>;
  album: FormControl<string>;
  anno: FormControl<number | null>;
  genero: FormControl<string>;
}>;

type PlaylistForm = FormGroup<{
  nombre: FormControl<string>;
  descripcion: FormControl<string>;
  canciones: FormArray<SongForm>;
}>;

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './playlist-create-page.component.html',
  styleUrls: ['./playlist-create-page.component.css'],
})
export class PlaylistCreatePageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(PlaylistsService);
  private readonly router = inject(Router);

  loading = false;
  error = '';

  form: PlaylistForm = this.fb.group({
    nombre: this.fb.nonNullable.control('', [Validators.required]),
    descripcion: this.fb.nonNullable.control(''),
    canciones: this.fb.array<SongForm>([]),
  });

  get canciones(): FormArray<SongForm> {
    return this.form.controls.canciones;
  }

  private buildSongForm(): SongForm {
    return this.fb.group({
      titulo: this.fb.nonNullable.control('', [Validators.required]),
      artista: this.fb.nonNullable.control(''),
      album: this.fb.nonNullable.control(''),
      anno: this.fb.control<number | null>(null),
      genero: this.fb.nonNullable.control(''),
    });
  }

  addSong(): void {
    this.canciones.push(this.buildSongForm());
  }

  removeSong(index: number): void {
    this.canciones.removeAt(index);
  }

  submit(): void {
    this.error = '';
    if (this.form.invalid) return;

    this.loading = true;

    const payload = this.form.getRawValue();

    this.api
      .create({
        nombre: payload.nombre.trim(),
        descripcion: payload.descripcion?.trim() || null,
        canciones: payload.canciones.map((s) => ({
          titulo: s.titulo.trim(),
          artista: s.artista?.trim() || null,
          album: s.album?.trim() || null,
          anno: s.anno ?? null,
          genero: s.genero?.trim() || null,
        })),
      })
      .subscribe({
        next: (created) => {
          this.loading = false;
          this.router.navigate(['/playlists', created.nombre]);
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.error?.message || 'No se pudo crear la playlist';
        },
      });
  }
}
