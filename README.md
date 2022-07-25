# Pokemon

Pokémon trainer app with a login, a pokémon catalouge page where the user can see all the pokémons and a trainer page where the user can see all the pokémons that he has collected.

# Contributors

This app was created by @tildakallstrom (Tilda Källström) and @emil-h-uhlin (Emil Uhlin).

# Pokemon

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.6.

## Environment
To get this project working, you need to first add a folder in the "src"-folder named "environments".
To this folder, add two files in the environment folder: environment.prod.ts and environment.ts.

### environment.prod.ts
This file should have the following:
export const environment = {
  production: true,
  apiTrainers: "<link>",
  apiPokemons: "<link>",
};

### environment.ts
This file should have the following:
export const environment = {
  production: false,
  apiTrainers: "<link>",
  apiPokemons: "<link>",
  apiKey: "<key>"
};

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
