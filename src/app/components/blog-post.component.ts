import { Component, OnDestroy } from "@angular/core";
import { GeneralService }           from "../services/general.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Location }                 from '@angular/common';
import { AngularFireDatabase } from "angularfire2/database";
declare let converter:any;
declare let FB:any;

@Component({
  moduleId: module.id,
  selector: "[blog-post]",
  templateUrl: "../../templates/components/blog-post.component.html",
  styleUrls: [
    "../../styles/components/blog-post.component.css"
  ]
})
export class BlogPostComponent {
  post: string = "";
  postRef = {
    img: "",
    subtitle: "",
    title: ""
  };
  general: GeneralService;
  currentUrl: string = window.location.href;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase,
    private location: Location,
    general: GeneralService
  ) {
    this.general = general;
    this.general.loading = true;
    this.route.params.subscribe((params: Params) => this.db.object ("/posts/" + params["ref"]).subscribe((post) => {
      if (post.hasOwnProperty("$value") && !post["$value"]) {
        this.general.loading = false;
        this.router.navigate (["/404"]);
        return;
      }
      this.post = converter.makeHtml (post.text);
      this.db.object ("/postrefs/" + post.id).subscribe((postRef) => {
        this.postRef = postRef;
        this.general.loading = false;
      });
    }));
  }

  shareFB(): void {
    FB.ui({
      method: "share",
      href: window.location.href
    }, function(response){});
  }

  shareTwitter(): void {
    window.open ("https://twitter.com/intent/tweet?text=" + this.postRef.title + "&url=" + window.location.href, "Твитнуть", "width=480,height:360");
  }

  shareVK(): void {
    window.open ("https://vk.com/share.php?title=" + this.postRef.title + "&url=" + window.location.href + "&img=" + this.postRef.img, "Поделиться", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=480,height:360");
  }

  goBack(): void {
    this.location.back();
  }
}
