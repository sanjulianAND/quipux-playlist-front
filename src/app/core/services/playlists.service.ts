import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreatePlaylistRequest,
  PlaylistResponse,
} from '../models/playlist.model';

@Injectable({ providedIn: 'root' })
export class PlaylistsService {
  private readonly http = inject(HttpClient);

  findAll() {
    return this.http.get<PlaylistResponse[]>('/lists');
  }

  findByName(name: string) {
    return this.http.get<PlaylistResponse>(
      `/lists/${encodeURIComponent(name)}`,
    );
  }

  create(req: CreatePlaylistRequest) {
    return this.http.post<PlaylistResponse>('/lists', req);
  }

  delete(name: string) {
    return this.http.delete<void>(`/lists/${encodeURIComponent(name)}`);
  }
}
