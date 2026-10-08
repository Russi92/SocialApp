import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  msgError: string = '';
  title: string = 'Friendora';
  loading: boolean = false;
  registerSubscribe: Subscription = new Subscription();

  loginForm: FormGroup = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(3)]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ],
    ],
  });

  showPassword(el: HTMLInputElement): void {
    if (el.type === 'password') {
      el.type = 'text';
    } else {
      el.type = 'password';
    }
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.loading = true;

      this.registerSubscribe.unsubscribe();

      this.registerSubscribe = this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            console.log(res);
            this.cdr.detectChanges();
            localStorage.setItem('socialToken', res.data.token);
            localStorage.setItem('socialUser', JSON.stringify(res.data.user));
            this.router.navigate(['/feed']);
            // this.router.navigateByUrl('/login')
          }
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          this.loading = false;
          this.cdr.detectChanges();
        },
        complete: () => {
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
