import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { GithubFollowersComponent } from './github-followers/github-followers.component';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GithubFollowersService } from './services/github-followers.service';
import { AppErrorHandler } from './common/app-error-handler';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthGuardService } from './services/auth-guard.service';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    GithubFollowersComponent,
    GithubProfileComponent,
    NotFoundComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    // HttpModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      {
        path: 'followers/:id/:name',
        component: GithubProfileComponent,
        canActivate: [AuthGuardService]
      },
      { path: 'followers', component: GithubFollowersComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'login', component: LoginComponent },
      { path: '**', component: NotFoundComponent },
    ])
  ],
  providers: [
    AngularFireDatabase,
    AuthGuardService,
    AngularFireAuth,
    AuthService,
    GithubFollowersService,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
