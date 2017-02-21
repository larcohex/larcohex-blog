import { NgModule }             from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RootComponent }        from "../components/root.component";
import { BlogRootComponent }    from "../components/blog-root.component";

const routes: Routes = [
  // { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  // { path: "worlds",  component: WorldsComponent },
  // { path: "sincity", component: SincityComponent },
  // { path: "shamir", component: ShamirComponent },
  // { path: "nurtai", component: NurtaiComponent },
  // { path: "nurgazy", component: NurgazyComponent },
  { path: "blog", component: BlogRootComponent },
  { path: "", component: RootComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
