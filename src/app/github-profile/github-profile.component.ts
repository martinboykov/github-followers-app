import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubFollowersService } from '../services/github-followers.service';
import { switchMap, map, combineLatest } from 'rxjs/operators';
@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {
  id;
  profile;
  constructor(private route: ActivatedRoute, private service: GithubFollowersService) {

  }

  ngOnInit() {
    console.log('GitHub Profile on Init');
    this.route.paramMap
      .pipe(
        map((params) => params.get('name')),
        switchMap((name) => {
          console.log('name', name);
          return this.service.get(name);
        })
      )
      .subscribe((profile) => {
        console.log(profile);
        this.profile = profile;
      });
  }
  // ngOnInit() {
  //   console.log('GitHub Profile on Init');
  //   this.route.paramMap
  //     .pipe(
  //       switchMap((params) => {
  //         console.log('params.keys', params.keys);
  //         return this.service.get(params.keys);
  //       })
  //     )
  //     .subscribe((profile) => {
  //       console.log(profile);
  //       this.profile = profile;
  //     })
  // }
}
