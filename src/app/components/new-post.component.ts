import { AfterViewInit, Component } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { GeneralService } from "../services/general.service";
import * as firebase from "firebase";
declare let SimpleMDE:any;
declare let shortid:any;

@Component({
  moduleId: module.id,
  selector: "[new-post]",
  templateUrl: "../../templates/components/new-post.component.html",
  styleUrls: [
    "../../styles/components/new-post.component.css"
  ]
})

export class NewPostComponent implements AfterViewInit {
  post: Promise<any>;
  postRef = {
    ref: "",
    img: "",
    subtitle: "",
    title: ""
  };
  editor: any;
  general: GeneralService;
  ref: "";
  postId: number;
  newImg: File = null;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase,
    general: GeneralService
  ) {
    this.general = general;
    this.general.loading = false;
  }

  ngAfterViewInit(): void {
    this.editor = new SimpleMDE({
      blockStyles: {
        italic: "_"
      },
      spellChecker: false
    });
  }

  addPost(): void {
    if (["math", "physics", "chemistry", "biology", "cs"].indexOf (this.postRef.ref) > -1) {
      return;
    }
    if (this.newImg) {
      let storage = firebase.storage() as any;
      let storageRef = storage.ref();
      storageRef.child (this.postRef.ref + "-bg.jpg").put (this.newImg).then ((response) => {
        let id = this.general.generateUID();
        this.db.list ("/postrefs/").update (id, {
          ref: this.postRef.ref,
          subtitle: this.postRef.subtitle,
          title: this.postRef.title,
          img: response.downloadURL
        }).then (() => {
          this.db.list ("/posts/").update (this.postRef.ref, {
            id: id,
            text: this.editor.value()
          });
          this.goBack();
        }).catch ((error) => {
          console.log (error);
        });
      });
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
