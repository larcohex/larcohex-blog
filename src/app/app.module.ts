import { NgModule }           from "@angular/core";
import { BrowserModule }      from "@angular/platform-browser";
import { AngularFireModule }  from "angularfire2";
import { AppRoutingModule }   from "./modules/app-routing.module";

import { AppComponent }       from "./app.component";
import { RootComponent }      from "./components/root.component";
import { BlogRootComponent }  from "./components/blog-root.component";
import { RootLogoComponent }  from "./components/root-logo.component";
import { BlogLogoComponent }  from "./components/blog-logo.component";
import { PostRefComponent } from "./components/post-ref.component";
import { LoadingComponent } from "./components/loading.component";
import { GeneralService } from "./services/general.service";

export const firebaseConfig = {
  apiKey: "AIzaSyAVsjYldatrx_T2J3gr53qqhmG6l8Bl8r0",
  authDomain: "github-page-6a1d7.firebaseapp.com",
  databaseURL: "https://github-page-6a1d7.firebaseio.com",
  storageBucket: "github-page-6a1d7.appspot.com",
  messagingSenderId: "578829824495"
};

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    RootComponent,
    PostRefComponent,
    BlogRootComponent,
    RootLogoComponent,
    BlogLogoComponent,
    LoadingComponent
  ],
  providers: [
    GeneralService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
