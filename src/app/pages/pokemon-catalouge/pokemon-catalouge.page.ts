import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from '../../services/pokemon-catalogue.service';


@Component({
  selector: 'app-pokemon-catalouge',
  templateUrl: './pokemon-catalouge.page.html',
  styleUrls: ['./pokemon-catalouge.page.css']
})
export class PokemonCatalougePage implements OnInit {

  get pokemon(): Pokemon[] {
    return this.pokemonCatalogueService.pokemon;
  }

  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  get error(): string {
    return this.pokemonCatalogueService.error;
  }

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly scroll: ViewportScroller
  ) { }

  ngOnInit(): void {
    this.pokemonCatalogueService.findAllPokemons()
  }

  loadMorePokemon(): void {
    this.pokemonCatalogueService.loadMorePokemon()
  }

  scrollToTop(): void {
    this.scroll.scrollToPosition([0,0])
  }
}
