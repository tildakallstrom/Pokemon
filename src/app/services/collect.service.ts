import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { TrainerService } from './trainer.service';

const { apiKey, apiTrainers } = environment;

@Injectable({
  providedIn: 'root'
})
export class CollectService {

  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonCatalogueService,
    private readonly trainerService: TrainerService,
  ) { }
 

  public addToCollection(pokemonName: string): Observable<Trainer>{
    if(!this.trainerService.trainer) {
      throw new Error("There is no trainer.");
    }

    const trainer: Trainer = this.trainerService.trainer;

    if (!this.pokemonService.pokemonExists(pokemonName)) {
      throw new Error("addToCollection: No pokemon with name: " + pokemonName)
    
    }
    
    if (this.trainerService.inCollection(pokemonName)) {
      this.trainerService.removeFromCollection(pokemonName);
      } else {
        this.trainerService.addToCollection(pokemonName);
      }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    })


    return this.http.patch<Trainer>(`${apiTrainers}/${trainer.id}`, {
      pokemon: [...trainer.pokemon] //already updated
    }, {
      headers
    })
    .pipe(
      tap((updatedTrainer: Trainer) => {
        this.trainerService.trainer = updatedTrainer;
      })
    )
  }

}
