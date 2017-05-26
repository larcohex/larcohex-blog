import { Component, Output, EventEmitter } from "@angular/core";
import { GeneralService } from "../services/general.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  moduleId: module.id,
  selector: "blog-post-list",
  templateUrl: "../../templates/components/blog-post-list.component.html",
  styleUrls: [
    "../../styles/components/blog-post-list.component.css"
  ],
  animations: [
    trigger ("animation", [
      state ("left", style ({
        transform: "translateX(-100vh)",
        opacity: 0
      })),
      state ("right", style ({
        transform: "translateX(100vh)",
        opacity: 0
      })),
      state ("initial", style ({
        transform: "translateX(0)",
        opacity: 1
      })),
      transition ("initial => left", animate ("300ms ease-in")),
      transition ("initial => right", animate ("300ms ease-in")),
      transition ("left => initial", animate ("300ms ease-in")),
      transition ("right => initial", animate ("300ms ease-in")),
      transition ("left => right", animate ("0")),
      transition ("right => left", animate ("0"))
    ]),
  ]
})

export class BlogPostListComponent {
  posts: FirebaseListObservable<any[]>;
  length: number = 0;
  triplet: number[] = [0, 1, 2];
  page: number = 0;
  state: String = "initial";
  general: GeneralService;

  constructor (
    db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    general: GeneralService
  ) {
    this.general = general;
    this.general.loading = true;
    this.posts = db.list ("/postrefs");
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
        }
        this.general.loading = false;
        this.location.replaceState ("/blog?page=" + this.page);
      });
    });
  }

  prev(): void {
    if (this.page - 1 >= 0) {
      this.state = "right";
      --this.page;
      setTimeout (function() {
        this.state = "left";
        this.router.navigate([], { queryParams: { page: this.page } });
      }.bind (this), 500)
    }
  }

  next(): void {
    if ((this.page + 1) * 3 < this.length) {
      this.state = "left";
      ++this.page;
      setTimeout (function() {
        this.state = "right";
        this.router.navigate([], { queryParams: { page: this.page } });
      }.bind (this), 500);
    }
  }

  onChange(): void {
    setTimeout (function() {
      this.state = "initial";
    }.bind (this), 1);
  }
}
