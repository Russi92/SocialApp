import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { BtnLang } from '../../shared/ui/btn-lang/btn-lang';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe, BtnLang],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly authService = inject(AuthService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);

  msgError: string = '';
  title: string = 'Friendora';
  loading: boolean = false;
  registerSubscribe: Subscription = new Subscription();

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required), //
      dateOfBirth: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ]),
      rePassword: new FormControl('', Validators.required),
    },
    { validators: [this.confirmPassword] },
  ); //, {updateOn:"submit"}

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    if (rePassword !== password && rePassword !== '') {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  showPassword(el: HTMLInputElement): void {
    if (el.type === 'password') {
      el.type = 'text';
    } else {
      el.type = 'password';
    }
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.loading = true;

      this.registerSubscribe.unsubscribe();

      this.registerSubscribe = this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            console.log(res);
            this.cdr.detectChanges();
            this.router.navigate(['/login']);
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
      this.registerForm.markAllAsTouched();
    }
  }
}
