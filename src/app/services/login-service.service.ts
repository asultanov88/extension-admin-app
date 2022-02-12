
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginResult } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  public token = '';
  public tokenType = '';

  private apiEndpoint = environment.APIEndpoint;

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'}),
  };

  constructor(private http: HttpClient) { }

  public adminAuthenticate(email:string, password:string): Observable<LoginResult>{
    const url = this.apiEndpoint+'/auth/login';
    const payload = {
      email: email,
      password: password
    }
    return this.http.post<LoginResult>(url, payload, this.httpOptions)
    .pipe(
          map((response: LoginResult)=> {return response;}),
          catchError(err=>{
            // Clears the 401 error from browser console.
            if(err.status == 401){
              console.clear();
            }
            return throwError(err);
          })
          );
  }
}
