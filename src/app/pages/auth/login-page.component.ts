import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loading = false;
  error = '';
  form;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.error = '';
    if (this.form.invalid) return;

    const username = this.form.value.username ?? '';
    const password = this.form.value.password ?? '';

    this.loading = true;
    this.auth.login({ username, password }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/playlists');
      },
      error: (err) => {
        this.loading = false;
        this.error =
          err?.error?.message ||
          'Credenciales inválidas o backend no disponible';
      },
    });
  }
}
