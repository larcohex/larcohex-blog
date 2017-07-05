import { Component } from "@angular/core";
import { GeneralService } from "../services/general.service";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  moduleId: module.id,
  selector: "[olympiad-list]",
  templateUrl: "../../templates/components/olympiad-list.component.html",
  styleUrls: [
    "../../styles/components/olympiad-list.component.css"
  ],
  animations: [
    trigger ("animation", [
      state ("left", style ({
        transform: "translateX(-100vh)",
        opacity: 0
      })),
      state ("right", style ({
        transform: "translateX(100vh)",
        opacity: 0
      })),
      state ("initial", style ({
        transform: "translateX(0)",
        opacity: 1
      })),
      transition ("initial => left", animate ("300ms ease-in")),
      transition ("initial => right", animate ("300ms ease-in")),
      transition ("left => initial", animate ("300ms ease-in")),
      transition ("right => initial", animate ("300ms ease-in")),
      transition ("left => right", animate ("0")),
      transition ("right => left", animate ("0"))
    ]),
  ]
})

export class OlympiadListComponent {
  general: GeneralService;
  item: number = 0;
  state: String = "initial";

  constructor (general: GeneralService) {
    this.general = general;
  }

  prev(): void {
    this.state = "right";
    setTimeout (function() {
      this.item = this.item - 1 >= 0 ? this.item - 1 : 4;
      this.state = "left";
      setTimeout (function() {
        this.state = "initial";
      }.bind (this), 0)
    }.bind (this), 300);
  }

  next(): void {
    this.state = "left";
    setTimeout (function() {
      this.item = (this.item + 1) % 5;
      this.state = "right";
      setTimeout (function() {
        this.state = "initial";
      }.bind (this), 0)
    }.bind (this), 300);
  }
}
