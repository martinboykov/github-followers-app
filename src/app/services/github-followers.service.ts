import { DataService } from './data.service';
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class GithubFollowersService extends DataService {

  constructor(http: HttpClient) {
    super('https://api.github.com/users/mosh-hamedani/followers', http);
  }
  get(name) {
    return this.http.get(`https://api.github.com/users/${name}`)
      .pipe(
        map(response => {
          console.log(response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

}
