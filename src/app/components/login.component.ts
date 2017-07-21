import { Component } from "@angular/core";
import { GeneralService } from "../services/general.service";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";

@Component({
  moduleId: module.id,
  selector: "[login]",
  templateUrl: "../../templates/components/login.component.html",
  styleUrls: [
    "../../styles/components/login.component.css"
  ]
})

export class LoginComponent {
  general: GeneralService;
  email: string;
  password: string;
  error: boolean;

  constructor (
    general: GeneralService,
    private auth: AngularFireAuth,
    private router: Router
  ) {
    this.general = general;
    this.general.loading = false;
    this.general.currentUser.subscribe (user => {
      if (user) {
        this.router.navigate (["/admin"]);
      }
    });
  }

  login(): void {
    this.error = false;
    this.auth.auth.signInWithEmailAndPassword (this.email, this.password).then (user => this.router.navigate (["/admin"]), err => this.error = true);
  }

  validEmail(): boolean {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test (this.email);
  }
}
