import { Component } from "@angular/core";
import { GeneralService } from "../services/general.service";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";

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
    db: AngularFireDatabase,
    private auth: AngularFireAuth,
    private router: Router
  ) {
    this.general = general;
    this.general.loading = true;
    this.posts = db.list ("/postrefs");
    this.posts.subscribe(() => {
      this.general.loading = false;
    });
  }

  goTo (path: string): void {
    this.router.navigate (["/admin/post/" + path]);
  }
}
