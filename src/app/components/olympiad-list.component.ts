import { Component } from "@angular/core";
import { GeneralService } from "../services/general.service";

@Component({
  moduleId: module.id,
  selector: "[olympiad-list]",
  templateUrl: "../../templates/components/olympiad-list.component.html",
  styleUrls: [
    "../../styles/components/olympiad-list.component.css"
  ]
})

export class OlympiadListComponent {
  general: GeneralService;
  item: number = 0;

  constructor (general: GeneralService) {
    this.general = general;
  }

  prev(): void {
    // animation
    this.item = this.item - 1 >= 0 ? this.item - 1 : 4;
    // animation
  }

  next(): void {
    // animation
    this.item = (this.item + 1) % 5;
    // animation
  }
}
