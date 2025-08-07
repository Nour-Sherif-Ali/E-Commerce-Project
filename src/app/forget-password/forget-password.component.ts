import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  imports: [CommonModule, FormsModule,]
})
export class ForgetPasswordComponent {
  emailID: string = '';
  isResetFromVisible: boolean = false;
  resetObj: any = {
    "Email": "",
    "Otp": "",
    "NewPassword": ""
  };

  constructor(private http: HttpClient) {}

  sendotp() {
    this.http.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", { email: this.emailID })
      .subscribe((res: any) => {
        alert("OTP sent on Email Successfully");
        this.isResetFromVisible = true;
      }, error => {
        console.error('Error sending OTP', error);
      });
  }

  resetPassword() {
   
    console.log('Reset Object:', this.resetObj); // Log the resetObj to verify its structure
    this.http.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", this.resetObj)
      .subscribe((res: any) => {
        alert("Password has been reset successfully");
      }, error => {
        console.error('Error verifying OTP', error); // Log the error for debugging
        alert("OTP doesn't match");
      });
  }
}