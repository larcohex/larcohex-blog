import { Component } from "@angular/core";
import { GeneralService } from "../services/general.service";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Router } from "@angular/router";
import "rxjs/add/operator/map";
import * as firebase from "firebase";
import { DialogService } from "../services/confirm-dialog.service";

// TODO: responsive

@Component({
  moduleId: module.id,
  selector: "[admin-dashboard]",
  templateUrl: "../../templates/components/admin-dashboard.component.html",
  styleUrls: [
    "../../styles/components/admin-dashboard.component.css"
  ]
})

export class AdminDashboardComponent {
  general: GeneralService;
  tab: boolean = false;
  posts: FirebaseListObservable<any[]>;

  constructor (
    general: GeneralService,
    private db: AngularFireDatabase,
    private router: Router,
    private dialogService: DialogService
  ) {
    this.general = general;
    this.general.loading = true;
    this.posts = this.db.list ("/postrefs").map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    this.posts.subscribe(() => {
      this.general.loading = false;
    });
  }

  confirmDelete (post): void {
    this.dialogService
      .confirm("Подтверждение", "Вы действительно хотите удалить этот пост?")
      .subscribe(res => {
        if (res) {
          this.deletePost (post);
        }
      });
  }

  deletePost (post): void {
    this.general.loading = true;
    let storageRef = firebase.storage().ref();
    storageRef.child (post.imgRef).delete().then (() => {
      this.db.object ("/posts/" + post.ref).remove().then (() => {
        this.db.object ("/postrefs/" + post.$key).remove().then (() => this.general.loading = false, (error) => {
          console.log (error);
          this.general.loading = false;
        });
      }, (error) => {
        console.log (error);
        this.general.loading = false;
      });
    }, (error) => {
      console.log (error);
      this.general.loading = false;
    });
  }

  goTo (path: string): void {
    this.router.navigate (["/admin/post/" + path]);
  }
}
