import { combineLatest, map, switchMap } from 'rxjs/operators';
import { GithubFollowersService } from '../services/github-followers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers;
  pages;
  currentPage;
  totalCount;
  totalCountPages;
  followersPerPage = 6;
  followersOnCurrentPage;
  isActive = false;

  constructor(private route: ActivatedRoute, private service: GithubFollowersService) { }

  ngOnInit() {

    this.route.queryParamMap
      .pipe(
        map((params) => params.get('page')),
        switchMap((page) => {
          if (page === null || page === undefined) {
            page = '1';
          }
          this.currentPage = +page;
          console.log('page', page);
          return this.service.getAll();
        })
      )
      .subscribe(followers => {
        console.log(followers);
        console.log(followers.body);
        this.followers = followers.body;
        this.totalCount = this.followers.length;
        this.totalCountPages = Math.round(this.totalCount / this.followersPerPage);
        console.log(this.totalCountPages);

        this.pages = Array.from(Array(this.totalCountPages).keys()).map((number) => number += 1);

        console.log(this.totalCount);
        console.log(this.pages);
        this.followersOnCurrentPage = this.followers
          .slice((this.currentPage - 1) * this.followersPerPage, this.currentPage * this.followersPerPage);
        console.log(this.followersOnCurrentPage);
      });
  }
}
