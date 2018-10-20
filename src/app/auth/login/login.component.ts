import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean;
  constructor(private toastr: ToastrManager, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  signIn(credentials) {
    this.authService.emailLogin(credentials)
      .then((isSuccess) => {
        console.log(this.authService.currentUserId);
        console.log(this.authService.authenticated);
        if (isSuccess) {
          this.toastr.successToastr('Logged in succesfull!');
          this.invalidLogin = false;
          // returnUrl is used if we try to go to admin, but we are redirected to login to authenticate
          // after succesfull authentication we will be redirected back to where we were
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
          // this.router.navigate(['/']);
        } else {
          this.toastr.errorToastr('Failed to login!');
          this.invalidLogin = true;
        }
      });

  }


}
