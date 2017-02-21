import { NgModule }           from "@angular/core";
import { BrowserModule }      from "@angular/platform-browser";

import { AppRoutingModule }   from "./modules/app-routing.module";

import { AppComponent }       from "./app.component";
import { RootComponent }      from "./components/root.component";
import { BlogRootComponent }  from "./components/blog-root.component";
import { RootLogoComponent }  from "./components/root-logo.component";
import { BlogLogoComponent }  from "./components/blog-logo.component";


@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    RootComponent,
    BlogRootComponent,
    RootLogoComponent,
    BlogLogoComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
