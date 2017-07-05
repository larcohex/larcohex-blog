import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { GeneralService } from "./services/general.service";
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";

@Component({
  moduleId: module.id,
  selector: "[app]",
  templateUrl: "../templates/app.component.html",
  styleUrls: [
    "../styles/app.component.css"
  ]
})
export class AppComponent  {
  currentUrl: string;

  constructor(
    private router: Router,
    private general: GeneralService
  ) {
    this.router.events.subscribe((nav:any) => this.currentUrl = nav.url);
  }
}
