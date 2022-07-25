import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';

const { apiTrainers, apiKey } = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private readonly http: HttpClient) { }

  public login(username: string): Observable<Trainer> {
    return this.checkUsername(username)           // check if user exists
    .pipe(
      switchMap((user: Trainer | undefined) => {
         if (user === undefined) {             
          return this.createUser(username);       // create new user if not
         }
         return of(user);
      })
    )
  }

  /* Check if user exists */
  private checkUsername(username: string): Observable<Trainer | undefined> {
    return this.http.get<Trainer[]>(`${apiTrainers}?username=${username}`)
     .pipe(
        map((response: Trainer[]) => response.pop())
     )
  }

  /* Create new user and post to api */
  private createUser(username: string): Observable<Trainer> {
    // user
    const trainer = {
      username,
      pokemon: []
    };
    
    //headers -> API key
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    });

    return this.http.post<Trainer>(apiTrainers, trainer, {
      headers
    })
  }
}
