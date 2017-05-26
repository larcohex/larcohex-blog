import { NgModule }             from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RootComponent }        from "../components/root.component";
import { BlogRootComponent }    from "../components/blog-root.component";
import { BlogPostComponent } from "../components/blog-post.component";
import { OlympiadRootComponent } from "../components/olympiad-root.component";
import { BlogPostListComponent } from "../components/blog-post-list.component";
import { OlympiadListComponent } from "../components/olympiad-list.component";
import { OlympiadSubjectComponent } from "../components/olympiad-subject.component";

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
  { path: "", component: RootComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
