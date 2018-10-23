import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  user: string;

  constructor(private authService: AuthService) {

  }
  get authenticated() {
    return this.authService.authState;
  }
  ngOnInit() {

  }

}
