import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './pages/app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { PokemonCatalougePage } from './pages/pokemon-catalouge/pokemon-catalouge.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonListItemComponent } from './components/pokemon-list-item/pokemon-list-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CollectButtonComponent } from './components/collect-button/collect-button.component';

@NgModule({
  declarations: [ //components
    AppComponent,
    LoginPage,
    PokemonCatalougePage,
    TrainerPage,
    LoginFormComponent,
    PokemonListComponent,
    PokemonListItemComponent,
    NavbarComponent,
    CollectButtonComponent
  ],
  imports: [ //modules
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
