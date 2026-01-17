import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  templateUrl: './playlist-detail-page.component.html',
  styleUrls: ['./playlist-detail-page.component.css'],
})
export class PlaylistDetailPageComponent {
  name: string;

  constructor(private route: ActivatedRoute) {
    this.name = this.route.snapshot.paramMap.get('name') ?? '';
  }
}
