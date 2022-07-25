import { Component, Input, OnInit } from '@angular/core';
import { CollectService } from 'src/app/services/collect.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from 'src/app/services/trainer.service';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-collect-button',
  templateUrl: './collect-button.component.html',
  styleUrls: ['./collect-button.component.css']
})
export class CollectButtonComponent implements OnInit {

  public loading: boolean = false;

  public isCollected: boolean = false;

  @Input() pokemon!: Pokemon;

  constructor(
    private trainerService: TrainerService,
    private readonly favouriteService: CollectService
  ) { }

  ngOnInit(): void {
    //inputs are resolved
    this.isCollected = this.trainerService.inCollection(this.pokemon.name);
  }

  onCollectClick(): void {
    this.loading = true;
    //add guitar to the favourites
    this.favouriteService.addToCollection(this.pokemon)
    .subscribe({
      next: (trainer: Trainer) => {
        this.loading = false;
        this.isCollected = this.trainerService.inCollection(this.pokemon.name);
      },
      error: (error: HttpErrorResponse) => {
       console.log("Error", error.message);
      }
    })
  }

}
