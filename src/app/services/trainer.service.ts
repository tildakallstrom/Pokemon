import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
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
    
     // collected var satt som pokemon - men ska vara istället för favourites 

     public inCollection(pokemonId: string): boolean {
      if (this._trainer) {
        return Boolean(this.trainer?.pokemon.find((pokemonName: string) => pokemonName === pokemonName));
      }
      return false;
     }
  
     public addToCollection(pokemonName: string): void {
      if (this._trainer) {
        this._trainer.pokemon.push(pokemonName);
      }
     }

     public removeFromCollection(pokemonName: string): void {
      if (this._trainer) {
        
        this._trainer.pokemon = this._trainer.pokemon.filter((name: string) => name !== pokemonName);
      }
     }
}
