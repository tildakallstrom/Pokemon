import { Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService} from 'src/app/services/trainer.service';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-profile',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage{

  get trainer(): Trainer | undefined {
    return this.trainerService.trainer;
  }

  get pokemon(): Pokemon[] {
    if(this.trainerService.trainer) {
      return StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemon)!.filter(pokemon => {
        return this.trainerService.trainer?.pokemon.includes(pokemon.name)
      })
    }

    return [];  // no pokemon
  }

  /* Log out current user and refresh page (redirecting to login page) */
  public logout(): void {
    StorageUtil.storageDelete(StorageKeys.Trainer)
    location.reload()
  }

  constructor(
    private trainerService: TrainerService
  ) { }
}
