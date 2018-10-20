import { BadInputError } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from '../common/app-error';
import { catchError, map } from 'rxjs/operators';
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable()
export class DataService {
  constructor(private url: string, protected http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.url, { observe: 'response', responseType: 'json' })
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );

  }

  get(id) {
    return this.http.get(this.url + '/' + id)
      .pipe(
        map(response => {
          console.log(response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource))
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }))
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id)
      .pipe(
        map(response => response),
        // toPromise(),
        catchError(this.handleError)
      );
  }

  protected handleError(error: Response) {
    if (error.status === 400) {
      return throwError(new BadInputError(error.json()));
    }

    if (error.status === 404) {
      return throwError(new NotFoundError());
    }

    return throwError(new AppError(error));
  }
}
