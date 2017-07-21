import { Component, OnDestroy } from "@angular/core";
import { GeneralService }           from "../services/general.service";
import { ActivatedRoute, Params }   from "@angular/router";
import { Location }                 from '@angular/common';
import { Meta } from "@angular/platform-browser";
import { AngularFireDatabase } from "angularfire2/database";
declare let converter:any;

@Component({
  moduleId: module.id,
  selector: "[blog-post]",
  templateUrl: "../../templates/components/blog-post.component.html",
  styleUrls: [
    "../../styles/components/blog-post.component.css"
  ]
})
export class BlogPostComponent implements OnDestroy {
  post: string = "";
  postRef = {
    img: "",
    subtitle: "",
    title: ""
  };
  general: GeneralService;

  constructor (
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private location: Location,
    private meta: Meta,
    general: GeneralService
  ) {
    this.general = general;
    this.general.loading = true;
    this.route.params.subscribe((params: Params) => this.db.object ("/posts/" + params["ref"]).subscribe((post) => {
      this.post = converter.makeHtml (post.text);
      this.db.object ("/postrefs/" + post.id).subscribe((postRef) => {
        this.postRef = postRef;
        this.meta.updateTag({ name: "og:url", content: window.location.href });
        this.meta.updateTag({ name: "og:title", content: postRef.title});
        this.meta.updateTag({ name: "og:description", content: postRef.subtitle });
        this.meta.updateTag({ name: "og:image", content: postRef.img });
        this.general.loading = false;
      });
    }));
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.meta.updateTag({ name: "og:url", content: "larcohex.github.io" });
    this.meta.updateTag({ name: "og:title", content: "Larcohex"});
    this.meta.updateTag({ name: "og:description", content: "Блог-портфолио" });
    this.meta.updateTag({ name: "og:image", content: "https://raw.githubusercontent.com/larcohex/larcohex.github.io/develop/src/assets/images/background/background.jpg" });
  }
}
