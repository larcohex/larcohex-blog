import { NgModule }             from "@angular/core";
import { BrowserModule }        from "@angular/platform-browser";
import { AngularFireModule }    from "angularfire2";
import { AppRoutingModule }     from "./modules/app-routing.module";

import { AppComponent }         from "./app.component";
import { RootComponent }        from "./components/root.component";
import { BlogRootComponent }    from "./components/blog-root.component";
import { RootLogoComponent }    from "./components/root-logo.component";
import { BlogLogoComponent }    from "./components/blog-logo.component";
import { PostRefComponent }     from "./components/post-ref.component";
import { BlogLoadingComponent }     from "./components/blog-loading.component";
import { GeneralService }       from "./services/general.service";
import { BlogPostComponent }    from "./components/blog-post.component";
import { SafeHtmlPipe }         from "./pipes/safeHtml.pipe";
import { NextButtonComponent }  from "./components/next-button.component";
import { PrevButtonComponent } from "./components/prev-button.component";
import { BlogHeaderComponent } from "./components/blog-header.component";
import { OlympiadHeaderComponent } from "./components/olympiad-header.component";
import { OlympiadLoadingComponent } from "./components/olympiad-loading.component";
import { OlympiadLogoComponent } from "./components/olympiad-logo.component";
import { OlympiadRootComponent } from "./components/olympiad-root.component";
import { BlogPostListComponent } from "./components/blog-post-list.component";

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
    OlympiadHeaderComponent,
    OlympiadLoadingComponent,
    OlympiadLogoComponent,
    OlympiadRootComponent,
    BlogHeaderComponent,
    BlogRootComponent,
    BlogPostListComponent,
    RootLogoComponent,
    BlogLogoComponent,
    BlogLoadingComponent,
    BlogPostComponent,
    NextButtonComponent,
    PrevButtonComponent,
    SafeHtmlPipe
  ],
  providers: [
    GeneralService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
