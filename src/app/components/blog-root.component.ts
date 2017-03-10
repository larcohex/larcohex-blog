import { Component } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { GeneralService } from "../services/general.service";

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

  constructor (af: AngularFire) {
    this.posts = af.database.list ("/postrefs");
    this.posts.subscribe((posts) => {
      this.length = posts.length;
      this.loading = false
    });
  }

  orientation(): string {
    return GeneralService.orientation();
  }

  prev(): void {
    if (this.triplet[0] - 3 >= 0) {
      for (let i = 0; i < this.triplet.length; ++i) {
        this.triplet[i] -= 3;
      }
    }
  }

  next(): void {
    if (this.triplet[0] + 3 < this.length) {
      for (let i = 0; i < this.triplet.length; ++i) {
        this.triplet[i] += 3;
      }
    }
  }
}
