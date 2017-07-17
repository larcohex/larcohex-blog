import { NgModule }             from "@angular/core";
import { BrowserModule }        from "@angular/platform-browser";
import { AngularFireModule }    from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AppRoutingModule }     from "./modules/app-routing.module";

import { AppComponent }         from "./app.component";
import { RootComponent }        from "./components/root.component";
import { BlogRootComponent }    from "./components/blog-root.component";
import { RootLogoComponent }    from "./svg/root-logo.component";
import { BlogLogoComponent }    from "./svg/blog-logo.component";
import { PostRefComponent }     from "./components/post-ref.component";
import { BlogLoadingComponent }     from "./svg/blog-loading.component";
import { GeneralService }       from "./services/general.service";
import { BlogPostComponent }    from "./components/blog-post.component";
import { SafeHtmlPipe }         from "./pipes/safeHtml.pipe";
import { BlogHeaderComponent } from "./components/blog-header.component";
import { OlympiadHeaderComponent } from "./components/olympiad-header.component";
import { OlympiadLoadingComponent } from "./svg/olympiad-loading.component";
import { OlympiadLogoComponent } from "./svg/olympiad-logo.component";
import { OlympiadRootComponent } from "./components/olympiad-root.component";
import { BlogPostListComponent } from "./components/blog-post-list.component";
import { environment } from "../environments/environment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MathLogoComponent } from "./svg/math-logo.component";
import { PhysicsLogoComponent } from "./svg/physics-logo.component";
import { BiologyLogoComponent } from "./svg/biology-logo.component";
import { ChemistryLogoComponent } from "./svg/chemistry-logo.component";
import { CSLogoComponent } from "./svg/cs-logo.component";
import { OlympiadListComponent } from "./components/olympiad-list.component";
import { OlympiadSubjectComponent } from "./components/olympiad-subject.component";
import { BlogNextButtonComponent } from "./svg/blog-next-button.component";
import { BlogPrevButtonComponent } from "./svg/blog-prev-button.component";
import { OlympiadPrevButtonComponent } from "./svg/olympiad-prev-button.component";
import { OlympiadNextButtonComponent } from "./svg/olympiad-next-button.component";
import { AdminDashboardComponent } from "./components/admin-dashboard.component";
import { AngularFireAuthModule } from "angularfire2/auth";
import { LoginComponent } from "./components/login.component";
import { FormsModule } from "@angular/forms";
import { AdminComponent } from "./components/admin.component";
import { EditPostComponent } from "./components/edit-post.component";
import { NotFoundComponent } from "./components/not-found.component";
import { NewPostComponent } from "./components/new-post.component";

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    RootComponent,
    PostRefComponent,
    OlympiadHeaderComponent,
    OlympiadLoadingComponent,
    OlympiadLogoComponent,
    OlympiadRootComponent,
    OlympiadListComponent,
    OlympiadSubjectComponent,
    BlogHeaderComponent,
    BlogRootComponent,
    BlogPostListComponent,
    RootLogoComponent,
    BlogLogoComponent,
    BlogLoadingComponent,
    BlogPostComponent,
    BlogNextButtonComponent,
    BlogPrevButtonComponent,
    OlympiadPrevButtonComponent,
    OlympiadNextButtonComponent,
    MathLogoComponent,
    PhysicsLogoComponent,
    BiologyLogoComponent,
    ChemistryLogoComponent,
    CSLogoComponent,
    SafeHtmlPipe,
    AdminComponent,
    AdminDashboardComponent,
    LoginComponent,
    NewPostComponent,
    EditPostComponent,
    NotFoundComponent
  ],
  providers: [
    GeneralService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
