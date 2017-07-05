import { Component } from "@angular/core";
import { GeneralService } from "../services/general.service";


@Component({
  moduleId: module.id,
  selector: "[blog-root]",
  templateUrl: "../../templates/components/blog-root.component.html",
  styleUrls: [
    "../../styles/components/blog-root.component.css"
  ]
})

export class BlogRootComponent {
  loading: boolean = true;
  general: GeneralService;

  constructor (general: GeneralService) {
    this.general = general;
  }
}
