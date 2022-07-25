import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private _trainer?: Trainer;

  public get trainer(): Trainer | undefined {
    return this._trainer;
  }

  set trainer(trainer: Trainer | undefined) {
    StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer;
  }

  constructor() {
    this._trainer = StorageUtil.storageRead<Trainer>(StorageKeys.Trainer);
  }
  
  /* Check if pokemon is collected */
  public inCollection(pokemonName: string): boolean {
    if (this._trainer) {
      return Boolean(this.trainer?.pokemon.find((name: string) => name === pokemonName));
    }

    return false;
  }
  
  /* Add pokemon to collection */
  public addToCollection(pokemon: Pokemon): void {
    if (this._trainer) {
      this._trainer.pokemon.push(pokemon.name);
    }
  }

  /* Remove pokemon from collection */
  public removeFromCollection(pokemonName: string): void {
    if (this._trainer) {
      this._trainer.pokemon = this._trainer.pokemon.filter(name => name !== pokemonName);
    }
  }
}
