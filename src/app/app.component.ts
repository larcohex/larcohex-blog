import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { GeneralService } from "./services/general.service";

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
    private router: Router
  ) {
    this.router.events.subscribe((nav:any) => this.currentUrl = nav.url);
  }

  orientation(): string {
    return GeneralService.orientation();
  }
}
