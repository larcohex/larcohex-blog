import { NgModule }             from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RootComponent }        from "../components/root.component";
import { BlogRootComponent }    from "../components/blog-root.component";
import { BlogPostComponent } from "../components/blog-post.component";
import { OlympiadRootComponent } from "../components/olympiad-root.component";
import { BlogPostListComponent } from "../components/blog-post-list.component";
import { OlympiadListComponent } from "../components/olympiad-list.component";
import { OlympiadSubjectComponent } from "../components/olympiad-subject.component";
import { LoginComponent } from "../components/login.component";
import { AdminDashboardComponent } from "../components/admin-dashboard.component";
import { AdminComponent } from "app/components/admin.component";
import { EditPostComponent } from "../components/edit-post.component";
import { NotFoundComponent } from "../components/not-found.component";
import { NewPostComponent } from "../components/new-post.component";

const routes: Routes = [
  { path: "blog", component: BlogRootComponent,
    children: [
      { path: "", component: BlogPostListComponent },
      { path: ":ref", component: BlogPostComponent }
    ]
  },
  { path: "olympiad", component: OlympiadRootComponent,
    children: [
      { path: "", component: OlympiadListComponent },
      { path: ":subject", component: OlympiadSubjectComponent }
    ]
  },
  { path: "login", component: LoginComponent },
  { path: "admin", component: AdminComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "dashboard" },
      { path: "dashboard", component: AdminDashboardComponent },
      { path: "post/new", component: NewPostComponent },
      { path: "post/:name", component: EditPostComponent }
    ]
  },
  { path: "404", component: NotFoundComponent },
  { path: "", pathMatch: "full", component: RootComponent },
  { path: "**", redirectTo: "404" }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
