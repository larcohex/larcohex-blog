import { NgModule }             from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RootComponent }        from "../components/root.component";
import { BlogRootComponent }    from "../components/blog-root.component";
import { BlogPostComponent } from "../components/blog-post.component";

const routes: Routes = [
  { path: "posts/:ref", component: BlogPostComponent },
  { path: "blog", component: BlogRootComponent },
  { path: "", component: RootComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
