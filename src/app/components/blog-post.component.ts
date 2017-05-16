import { Component, OnInit }        from "@angular/core";
import { GeneralService }           from "../services/general.service";
import { ActivatedRoute, Params }   from "@angular/router";
import { Location }                 from '@angular/common';
import { DomSanitizer }             from "@angular/platform-browser";
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
export class BlogPostComponent implements OnInit {
  post: string = "";
  postRef = {
    img: "",
    subtitle: "",
    title: ""
  };
  loading: boolean = true;

  constructor (
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {}

  orientation(): string {
    return GeneralService.orientation();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.db.object ("/posts/" + params["ref"]).subscribe((post) => {
      this.post = converter.makeHtml (post.text);
      this.db.object ("/postrefs/" + post.id).subscribe((postRef) => {
        this.postRef = postRef;
        this.loading = false;
      });
    }));
  }

  goBack(): void {
    this.location.back();
  }
}
