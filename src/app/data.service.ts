import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {GameSystem} from './gameSystem';
import {Game} from './game';

@Injectable()
export class DataService {

  apiURL = 'https://miproyecto2-254822.appspot.com';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      Accept : 'application/json'
    })
  };

  getGameSystems(): Observable<GameSystem> {
    return this.http.get<GameSystem>(this.apiURL + '/gamesystems').pipe(retry(1), catchError(this.handleError));
  }

  postGameSystem(body) {
    return this.http.post(this.apiURL + '/gamesystems', body, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteGameSystem(id) {
    return this.http.delete(this.apiURL + '/gamesystems/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getGames(): Observable<Game> {
    return this.http.get<Game>(this.apiURL + '/videogames').pipe(retry(1), catchError(this.handleError));
  }

  postGame(body) {
    return this.http.post(this.apiURL + '/videogames', body, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteGame(id) {
    return this.http.delete(this.apiURL + '/videogames/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    window.alert(errorMessage);

    return throwError(errorMessage);
  }
}
