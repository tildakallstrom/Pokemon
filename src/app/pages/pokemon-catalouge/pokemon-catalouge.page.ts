import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from '../../services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokemon-catalouge',
  templateUrl: './pokemon-catalouge.page.html',
  styleUrls: ['./pokemon-catalouge.page.css']
})
export class PokemonCatalougePage implements OnInit {

  get pokemon(): string[] {
    return this.pokemonCatalogueService.pokemons;
  }

  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  get error(): string {
    return this.pokemonCatalogueService.error;
  }

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService
  ) { }

  ngOnInit(): void {
    this.pokemonCatalogueService.findAllPokemons();
  }

}