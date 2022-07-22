import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';

const { apiPokemons } = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemon: string[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  get pokemons(): string[] {
    return this._pokemon;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) { }


  public findAllPokemons(): void {

    if (this._pokemon.length > 0 || this.loading){
      return;
    }

    this._loading = true;

    this.http.get(`${apiPokemons}?limit=${10}`)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe((response: any) => {
        /**
         * TODO: Store results in session storage
         * Extract ID
         */
        console.log(response.results)
      })

  }
   //get pokemon based on name
   public pokemonExists(name: string): boolean {
    return this._pokemon.includes(name);
}
}