import { NgModule }           from "@angular/core";
import { BrowserModule }      from "@angular/platform-browser";

import { AppRoutingModule }   from "./modules/app-routing.module";

import { AppComponent }       from "./app.component";
import { RootComponent }      from "./components/root.component";
import { BlogRootComponent }  from "./components/blog-root.component";
import { LogoComponent } from "./components/logo.component";


@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    RootComponent,
    BlogRootComponent,
    LogoComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
