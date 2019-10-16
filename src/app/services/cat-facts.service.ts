import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CatFactsService {

  API_URL = "https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com";

  constructor(private http: HttpClient) { }

  getFacts() {
    return this.http.get<any[]>(`${this.API_URL}/facts`, {headers: 
      {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })
    .pipe(
      catchError(this.handleError));
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('client side error', error);
      // A client-side or network error occurred. Handle it accordingly.
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log('backend error', error);
    }
    // return an observable with a user-facing error message
    return throwError(
      'API Error: ' + error.message);
  };
}
