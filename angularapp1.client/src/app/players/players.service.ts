import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Player } from "./player";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private apiURL = "https://localhost:7218/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.httpClient.get<Player[]>(this.apiURL + '/Players')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getPlayer(id: number): Observable<Player> {
    return this.httpClient.get<Player>(this.apiURL + '/Players/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  createPlayer(player: Player): Observable<Player> {
    return this.httpClient.post<Player>(this.apiURL + '/Players/', JSON.stringify(player), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updatePlayer(id: number, player: Player): Observable<Player> {
    return this.httpClient.put<Player>(this.apiURL + '/players/' + id, JSON.stringify(player), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  deletePlayer(id: number) {
    return this.httpClient.delete<Player>(this.apiURL + '/Players/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: any) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
