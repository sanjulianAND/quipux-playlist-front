import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GenresService {
  private readonly http = inject(HttpClient);

  getGenres() {
    return this.http.get<string[]>('/genres');
  }
}
