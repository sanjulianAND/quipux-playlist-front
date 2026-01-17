export interface SongDto {
  titulo: string;
  artista?: string | null;
  album?: string | null;
  anno?: number | null;
  genero?: string | null;
}

export interface CreatePlaylistRequest {
  nombre: string;
  descripcion?: string | null;
  canciones?: SongDto[] | null;
}

export interface PlaylistResponse {
  nombre: string;
  descripcion?: string | null;
  canciones: SongDto[];
}
