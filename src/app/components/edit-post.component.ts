import { AfterViewInit, Component } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { GeneralService } from "../services/general.service";
import * as firebase from "firebase";
declare let SimpleMDE:any;

@Component({
  moduleId: module.id,
  selector: "[edit-post]",
  templateUrl: "../../templates/components/edit-post.component.html",
  styleUrls: [
    "../../styles/components/edit-post.component.css"
  ]
})

export class EditPostComponent implements AfterViewInit {
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
  firePost: FirebaseObjectObservable<any>;
  firePostRef: FirebaseObjectObservable<any>;
  ref: "";
  postId: number;
  newImg: File = null;
  fullPost: boolean = false;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase,
    general: GeneralService
  ) {
    this.general = general;
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
              this.fullPost = true;
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
    });
  }

  editPost(): void {
    if (["math", "physics", "chemistry", "biology", "cs"].indexOf (this.postRef.ref) > -1) {
      return;
    }
    if (this.newImg) {
      let storage = firebase.storage() as any;
      let storageRef = storage.ref();
      storageRef.child (this.postRef.ref + "-bg.jpg").delete().then (() => {
        storageRef.child (this.postRef.ref + "-bg.jpg").put (this.newImg).then ((response) => {
          this.firePostRef.update ({
            ref: this.postRef.ref,
            subtitle: this.postRef.subtitle,
            title: this.postRef.title,
            img: response.downloadURL
          }).then (() => {
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
            this.goBack();
          }).catch ((error) => {
            console.log (error);
          });
        });
      }, (error) => console.log (error));
    }
    else {
      if (this.firePostRef) {
        this.firePostRef.update ({
          ref: this.postRef.ref,
          subtitle: this.postRef.subtitle,
          title: this.postRef.title
        }).then (() => {
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
          this.goBack();
        }).catch ((error) => {
          console.log (error);
        });
      }
      else {
        this.firePost.set (this.editor.value());
        this.goBack();
      }
    }
  }

  getImage (event: any): void {
    this.newImg = event.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
      this.postRef.img = reader.result;
    }.bind (this);
    if (this.newImg) {
      reader.readAsDataURL (this.newImg);
    }
  }

  goBack(): void {
    this.router.navigate (["/admin/dashboard"]);
  }
}
