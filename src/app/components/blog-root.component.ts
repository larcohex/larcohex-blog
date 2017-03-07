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
  loading: boolean = true;

  constructor (af: AngularFire) {
    this.posts = af.database.list ("/postrefs");
    this.posts.subscribe(() => this.loading = false);
  }

  orientation(): string {
    return GeneralService.orientation();
  }
}
