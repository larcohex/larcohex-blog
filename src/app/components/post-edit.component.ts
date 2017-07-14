import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
import { GeneralService } from "../services/general.service";
import { FirebaseApp } from "angularfire2";
declare let SimpleMDE:any;

@Component({
  moduleId: module.id,
  selector: "[post-edit]",
  templateUrl: "../../templates/components/post-edit.component.html",
  styleUrls: [
    "../../styles/components/post-edit.component.css"
  ]
})

export class PostEditComponent implements OnInit, AfterViewInit {
  post: Promise<any>;
  postRef = {
    ref: "",
    img: "",
    subtitle: "",
    title: ""
  };
  editor: any;
  general: GeneralService;
  deferred: any;
  fullEdit: boolean = false;
  postText: string = "";
  firePost: FirebaseObjectObservable<any>;
  firePostRef: FirebaseObjectObservable<any>;
  ref: "";
  postId: number;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase,
    private location: Location,
    private firebase: FirebaseApp,
    general: GeneralService
  ) {
    this.general = general;
  }

  ngOnInit(): void {
    this.general.loading = true;
    this.post = new Promise ((resolve) => {
      this.deferred = {resolve: resolve};
    });
    this.route.params.subscribe((params: Params) => {
      this.ref = params["name"];
      if (["math", "physics", "chemistry", "biology", "cs"].indexOf (params["name"]) > -1) {
        this.firePost = this.db.object ("/olympiad/" + params["name"]);
        this.firePost.subscribe ((post) => {
          this.general.loading = false;
          this.deferred.resolve (post.$value);
        });
      }
      else {
        this.firePost = this.db.object ("/posts/" + params["name"]);
        this.firePost.subscribe((post) => {
          this.postId = post.id;
          if (post.hasOwnProperty("$value") && !post["$value"]) {
            this.general.loading = false;
            this.router.navigate (["/404"]);
          }
          else {
            this.general.loading = false;
            this.deferred.resolve (post.text);
            this.firePostRef = this.db.object ("/postrefs/" + post.id);
            this.firePostRef.subscribe((postRef) => {
              this.postRef = postRef;
              this.fullEdit = true;
            });
          }
        })
      }
    });
  }

  ngAfterViewInit(): void {
    this.post.then ((result) => {
      this.editor = new SimpleMDE({
        blockStyles: {
          italic: "_"
        },
        spellChecker: false
      });
      this.editor.value (result);
      this.postText = result;
    });
  }

  editPost(): void {
    this.firePostRef.update ({
      ref: this.postRef.ref,
      subtitle: this.postRef.subtitle,
      title: this.postRef.title
    });
    if (this.postRef.ref === this.ref) {
      this.firePost.update ({
        text: this.editor.value()
      });
    }
    else {
      this.firePost.remove();
      let temp = {};
      temp[this.postRef.ref] = {id: this.postId, text: this.editor.value()};
      this.db.object ("/posts/").set (temp);
    }
  }

  getImage (event: any): void {
    console.log (event.target.files[0]);
  }

  goBack(): void {
    this.location.back();
  }
}
