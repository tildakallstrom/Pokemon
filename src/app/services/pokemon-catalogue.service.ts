import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.util';

const { apiPokemons } = environment;
const count = 20

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
  
  offset: number = count

  public findAllPokemons(): void {
    function extractIdFromUrl(url: string): string {
      let start = url.length - 2;                       // url always ends with '/' so start at last digit
  
      for (let i = start; url[i] !== '/'; i--)          // find index of first digit
        start = i
      
      return url.substring(start, url.length - 1)       // return pokemon id
    }

    if (this._pokemon.length > 0 || this.loading) 
      return
      
    // try to read pokemon from storage
    const pokemon = StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemon)

    // fetch from api if not present in memory
    if (!pokemon) {
      this._loading = true;

      this.http.get(`${apiPokemons}?limit=${2000}`) // get ALL pokemon
        .pipe(
          finalize(() => {
            this._loading = false;
          })
        )
        .subscribe((response: any) => {
          const { results } = response

          // map results to array of pokemon
          const allPokemon = results.map((pokemon : Pokemon) =>  {
            return {
              ...pokemon,
              id: extractIdFromUrl(pokemon.url)
            }
          })

          this._pokemon = allPokemon.slice(0, count)

          StorageUtil.storageSave<Pokemon[]>(StorageKeys.Pokemon, allPokemon)
        })
    }
    else this._pokemon = pokemon.slice(0, count)  // assign pokemon if found in storage
  }
  
  /* add the next <count> pokemon to pokemon array */
  public loadMorePokemon() :  void {
    const pokemon = StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemon)

    if (!pokemon) return;

    this._pokemon = pokemon.slice(0, this.offset += count)
  }

  // check whether pokemon exists
  public pokemonExists(name: string): boolean {
    return this._pokemon.some((p : Pokemon) => p.name === name);
  }
}