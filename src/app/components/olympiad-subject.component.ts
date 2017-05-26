import { Component } from "@angular/core";
import { GeneralService } from "../services/general.service";

@Component({
  moduleId: module.id,
  selector: "[olympiad-list]",
  templateUrl: "../../templates/components/olympiad-subject.component.html",
  styleUrls: [
    "../../styles/components/olympiad-root.component.css"
  ]
})

export class OlympiadSubjectComponent {
  general: GeneralService;

  constructor (general: GeneralService) {
    this.general = general;
  }
}
