import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.util';

const { apiPokemons } = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemon: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  get pokemon(): Pokemon[] {
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
    function extractIdFromUrl(url: string): string {
      let start = url.length - 2;                       // url always ends with '/' so start at last digit

      for (let i = start; url[i] !== '/'; i--)          // find index of first digit
        start = i
      
      return url.substring(start, url.length - 1)       // return pokemon id
    }

    if (this._pokemon.length > 0 || this.loading){
      return;
    }

    this._loading = true;

    // fetch pokemon from api if not already present in storage
    if (!StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemon)) {
      this.http.get(`${apiPokemons}?limit=${2000}`)
        .pipe(
          finalize(() => {
            this._loading = false;
          })
        )
        .subscribe((response: any) => {
          const { results } = response
          this._pokemon = results.map((pokemon : Pokemon) =>  {
            return {
              ...pokemon,
              id: extractIdFromUrl(pokemon.url)
            }
          })

          StorageUtil.storageSave<Pokemon[]>(StorageKeys.Pokemon, this._pokemon)
        })
      }
  }
  
  //get pokemon based on name
  public pokemonExists(name: string): boolean {
    return this._pokemon.some((p : Pokemon) => p.name === name);
  }
}