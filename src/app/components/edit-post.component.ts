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
    title: "",
    imgRef: ""
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
  disposable: any;
  error: string = "";
  img: string = "";

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
          this.img = post.img;
          this.deferred.resolve (post.text);
        });
      }
      else {
        this.firePost = this.db.object ("/posts/" + params["name"]);
        this.disposable = this.firePost.subscribe((post) => {
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
    this.error = "";
    if (this.fullPost) {
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
    }
    if (this.newImg) {
      let storageRef = firebase.storage().ref();
      storageRef.child (this.postRef.imgRef).delete().then (() => {
        storageRef.child (this.postRef.ref + "-bg." + this.newImg.name.split (".").pop()).put (this.newImg).then ((response) => {
          this.firePostRef.update ({
            ref: this.postRef.ref,
            subtitle: this.postRef.subtitle,
            title: this.postRef.title,
            img: response.downloadURL,
            imgRef: this.postRef.ref + "-bg." + this.newImg.name.split (".").pop()
          }).then (() => {
            if (this.postRef.ref === this.ref) {
              this.firePost.update ({
                text: this.editor.value()
              }).then (() => {
                this.goBack();
              }, (error) => {
                this.error = error.message;
                this.general.loading = false;
              });
            }
            else {
              this.disposable.unsubscribe();
              this.firePost.remove().then (() => {
                this.db.list ("/posts").update (this.postRef.ref, {
                  id: this.postId,
                  text: this.editor.value()
                }).then (() => {
                  this.goBack();
                });
              }, (error) => {
                this.disposable = this.firePost.subscribe((post) => {
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
                });
                this.error = error.message;
                this.general.loading = false;
              });
            }
          });
        });
      }, (error) => {
        this.error = error.message;
        this.general.loading = false;
      });
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
            }).then (() => {
              this.goBack();
            }, (error) => {
              this.error = error.message;
              this.general.loading = false;
            });
          }
          else {
            let storageRef = firebase.storage().ref();
            storageRef.child (this.postRef.imgRef).getDownloadURL().then ((url) => {
              let xhr = new XMLHttpRequest();
              xhr.responseType = "blob";
              xhr.onload = function() {
                let blob = xhr.response;
                storageRef.child (this.postRef.imgRef).delete().then (() => {
                  storageRef.child(this.postRef.ref + "-bg." + this.postRef.imgRef.split (".").pop()).put (blob).then((response) => {
                    this.firePostRef.update ({
                      img: response.downloadURL,
                      imgRef: this.postRef.ref + "-bg." + this.postRef.imgRef.split (".").pop()
                    }).then (() => {
                      this.disposable.unsubscribe();
                      this.firePost.remove().then (() => {
                        this.db.list ("/posts").update (this.postRef.ref, {
                          id: this.postId,
                          text: this.editor.value()
                        }).then (() => {
                          this.goBack();
                        }, (error) => {
                          this.error = error.message;
                          this.general.loading = false;
                        });
                      }, (error) => {
                        this.disposable = this.firePost.subscribe((post) => {
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
                        });
                        this.error = error.message;
                        this.general.loading = false;
                      });
                    }, (error) => {
                      this.error = error.message;
                      this.general.loading = false;
                    });
                  })
                });
              }.bind (this);
              xhr.open("GET", url);
              xhr.send();
            });
          }
        }, (error) => {
          this.error = error.message;
          this.general.loading = false;
        });
      }
      else {
        this.firePost.set ({text: this.editor.value(), img: this.img}).then (() => {
          this.goBack();
        }, (error) => {
          this.error = error.message;
          this.general.loading = false;
        });
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
