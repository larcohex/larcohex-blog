import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireDatabase } from "angularfire2/database";
import { GeneralService } from "../services/general.service";
import * as firebase from "firebase";
declare let SimpleMDE:any;

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
  newImg: File = null;
  error: string = "";

  constructor (
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
    this.error = "";
    if (["math", "physics", "chemistry", "biology", "cs", "new"].indexOf (this.postRef.ref) > -1) {
      this.error = "Недопустимая ссылка";
      return;
    }
    if (!this.postRef.title) {
      this.error = "Пожалуйста, введите название";
      return;
    }
    if (!this.postRef.ref) {
      this.error = "Пожалуйста, введите ссылку";
      return;
    }
    if (!this.editor.value()) {
      this.error = "Пожалуйста, введите текст";
      return;
    }
    if (this.newImg) {
      this.general.loading = true;
      let storageRef = firebase.storage().ref();
      storageRef.child (this.postRef.ref + "-bg." + this.newImg.name.split (".").pop()).put (this.newImg).then ((response) => {
        let id = this.general.generateUID();
        this.db.list ("/postrefs/").update (id, {
          ref: this.postRef.ref,
          subtitle: this.postRef.subtitle,
          title: this.postRef.title,
          img: response.downloadURL,
          imgRef: this.postRef.ref + "-bg." + this.newImg.name.split (".").pop()
        }).then (() => {
          this.db.list ("/posts/").update (this.postRef.ref, {
            id: id,
            text: this.editor.value()
          }).then (() => {
            this.goBack();
          }, (error) => {
            this.error = error.message;
            this.general.loading = false;
          });
        }, (error) => {
          this.error = error.message;
          this.general.loading = false;
        });
      }, (error) => {
        this.error = error.message;
        this.general.loading = false;
      });
    }
    else {
      this.error = "Пожалуйста, загрузите изображение";
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
