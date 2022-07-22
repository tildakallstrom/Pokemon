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

  //dependency injection
  constructor(private readonly http: HttpClient) { }

  //Modules, HttpClient, observables, and RxJS operators
  public login(username: string): Observable<Trainer> {
    return this.checkUsername(username)
    .pipe(
      switchMap((user: Trainer | undefined) => {
         if (user === undefined) { //user doesnt exist
          return this.createUser(username);
         }
         return of(user);
      })
    )
  }

  //login

  //check if user exists
  private checkUsername(username: string): Observable<Trainer | undefined> {
    return this.http.get<Trainer[]>(`${apiTrainers}?username=${username}`)
     .pipe(
      //Rxjs operators
      map((response: Trainer[]) => response.pop())
     )
  }

  //if user doesnt exist - create user
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

    //POST - create items on the server
  }
  
  //if user exists or is created - store user
}
