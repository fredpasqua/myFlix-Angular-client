import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
//Declaring the api url that will provide data for the client app
const apiUrl = 'https://fredsflix.herokuapp.com/'
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
// Inject the HttpClient module to the constructor params
// This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 
//Function to handle errors:
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
 // Non-typed response extraction
private extractResponseData(res: any): any {
  const body = res;
  return body || {};
}


  // User registration

   public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

 
  // User login
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
     
    catchError(this.handleError)
    );
  }
  
  
  
  
  //Get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

 
 
  // Get one movie
  getOneMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${title}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
    );
  }
  
  // Get director
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `directors/${directorName}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  // Get genre
  getGenre(genreName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `genre/${genreName}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  // Get user
 getUser(userName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${userName}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  

 
  // Add a movie to favourite Movies
  addFavoriteMovie(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${user}/movies/${movieId}`, null, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // Edit user
  updateUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${userName}`, userDetails, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(map(this.extractResponseData),
    catchError(this.handleError)
    );
  }
  
  
  // Delete user and
  deleteUser(userName: any): Observable<any> {
    return this.http.delete(apiUrl + `users/${userName}`).pipe(
      map(this.extractResponseData),
    catchError(this.handleError)
    );
  }
  
  
  // Delete a movie from the favorite movies
  removeFavoriteMovie(movieId: any): Observable<any>{
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${user}/movies/${movieId}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

}