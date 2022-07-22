import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { PokemonCatalougePage } from "./pokemon-catalouge/pokemon-catalouge.page";
import { LoginPage } from "./login/login.page";
import { TrainerPage } from "./trainer/trainer.page";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "/login"
    },
    {
        path: "login",
        component: LoginPage
    }, 
    {
        path: "pokemons",
        component: PokemonCatalougePage,
        canActivate: [ AuthGuard ]
    },
    {
        path: "trainer",
        component: TrainerPage,
        canActivate: [ AuthGuard ]
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ], //import a module
    exports: [
        RouterModule
    ]  //expose module and its features
})
export class AppRoutingModule {

}