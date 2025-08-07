import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthonService } from './../../../core/services/authon/authon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  isErrorMsg: boolean = false;
  isLoading:boolean = false;






  _AuthonService = inject(AuthonService);
  _Router = inject(Router)

  // validators is a static class that why we can't put it as a variable
  registerForm = new FormGroup(
    {
      // instance men class esmo formGroup
      name: new FormControl(null, [
        // el formcontrol has 2 parameteres (initial value, [validations])
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z].{6,15}$/), // pattern here let's me to create RegEx, Regex here : Start with big letter and need to be from 6 to 15 letter
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z].{6,15}$/),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[01245][0-9]{8}$/),
      ]),
    },
    this.confirmPassword
  );

  // Custom Validation
  confirmPassword(f: any) {
    if (f.get('password')?.value === f.get('rePassword')?.value) {
      return null;
    } else {
      return { didntMatch: true };
    }
  }

  getData(form: any) {
    if (form.valid) {

      this.isLoading = true;
      this._AuthonService.signup(form.value).subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.isErrorMsg = false;
          this.isLoading = false;
          this._Router.navigate(['/login']);
        },
        error: (err: any) => {
          console.log(err);
          this.isErrorMsg = true;
          this.isLoading = false;
        },
        complete: () => {},
      });
    } else {
      console.log('form Invalid');
    }
  }
}