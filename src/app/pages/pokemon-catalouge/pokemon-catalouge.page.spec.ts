import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCatalougePage } from './pokemon-catalouge.page';

describe('PokemonCatalougePage', () => {
  let component: PokemonCatalougePage;
  let fixture: ComponentFixture<PokemonCatalougePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonCatalougePage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonCatalougePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
