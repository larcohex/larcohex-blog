import { Component } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { GeneralService } from "../services/general.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  moduleId: module.id,
  selector: "[blog-root]",
  templateUrl: "../../templates/components/blog-root.component.html",
  styleUrls: [
    "../../styles/components/blog-root.component.css"
  ]
})
export class BlogRootComponent {
  posts: FirebaseListObservable<any[]>;
  length: number = 0;
  triplet: number[] = [0, 1, 2];
  loading: boolean = true;
  page: number = 0;


  constructor (
    af: AngularFire,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.posts = af.database.list ("/postrefs");
    this.posts.subscribe((posts) => {
      this.length = posts.length;
      this.route.queryParams.subscribe ((params) => {
        this.page = +params["page"] || 0;
        let newTriplet = [0, 1, 2];
        if (newTriplet[0] + 3 * this.page < this.length) {
          for (let i = 0; i < newTriplet.length; ++i) {
            newTriplet[i] += 3 * this.page;
          }
          this.triplet = newTriplet;
          console.log (this.triplet);
        }
        this.loading = false;
      });
    });
  }

  orientation(): string {
    return GeneralService.orientation();
  }

  prev(): void {
    this.router.navigate(["blog"], { queryParams: { page: (this.page - 1 > 0 ? this.page - 1 : 0) } });
  }

  next(): void {
    this.router.navigate(["blog"], { queryParams: { page: ((this.page + 1) * 3 < this.length ? this.page + 1 : this.page) } });
  }
}
