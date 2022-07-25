import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent  {

  @Input() pokemon!: Pokemon;

  // set default to '?' icon from api
  setDefaultImage(event: Event) {
    (event.target as HTMLImageElement).src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
  }

  constructor() { }
}
