import { Component } from "@angular/core";
import { GeneralService } from "../services/general.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  moduleId: module.id,
  selector: "[admin]",
  templateUrl: "../../templates/components/admin.component.html",
  styleUrls: [
    "../../styles/components/admin.component.css"
  ]
})

export class AdminComponent {
  general: GeneralService;

  constructor (
    private router: Router,
    private auth: AngularFireAuth,
    general: GeneralService
  ) {
    this.general = general;
    this.general.currentUser.subscribe (user => {
      if (!user) {
        this.router.navigate (["/login"]);
      }
    });
  }

  logout(): void {
    this.auth.auth.signOut();
  }
}
