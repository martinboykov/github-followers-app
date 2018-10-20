import { Component } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  invalidSignup: boolean;
  constructor(private toastr: ToastrManager,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  signUp(credentials) {
    this.authService.emailSignUp(credentials)
      .then((isSuccess) => {
        console.log(this.authService.currentUserId);
        console.log(this.authService.authenticated);
        if (isSuccess) {
          this.toastr.successToastr('Signup is succesfull!');
          this.invalidSignup = false;
          // returnUrl is used if we try to go to admin, but we are redirected to login to authenticate
          // after succesfull authentication we will be redirected back to where we were
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
          // this.router.navigate(['/']);
        } else {
          this.toastr.errorToastr('Failed to signup!');
          this.invalidSignup = true;
        }
      });

  }
}
