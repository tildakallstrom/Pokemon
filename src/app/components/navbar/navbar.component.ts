import { Component, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from '../../services/trainer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  get user(): Trainer | undefined {
    return this.trainerService.trainer;
  }

  constructor(
    private readonly trainerService: TrainerService
  ) { }

}
