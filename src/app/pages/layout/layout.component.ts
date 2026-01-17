import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  template: `
    <app-navbar />
    <main class="container">
      <router-outlet />
    </main>
  `,
  styles: [
    `
      .container {
        max-width: 980px;
        margin: 0 auto;
        padding: 16px;
      }
    `,
  ],
})
export class LayoutComponent {}
