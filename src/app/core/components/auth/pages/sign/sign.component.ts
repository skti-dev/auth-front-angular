import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent {
  public formAuth: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  public errorMessage!: string

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  public submitForm() {
    if (!this.formAuth.valid) return
    this.authService.signIn(this.formAuth.value).subscribe({
      next: res => res,
      error: err => this.errorMessage = err
    })
  }
}
