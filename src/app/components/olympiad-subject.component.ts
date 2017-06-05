import { Component } from "@angular/core";
import { Location }                 from '@angular/common';
import { GeneralService } from "../services/general.service";
import { ActivatedRoute, Params } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { AngularFireDatabase } from "angularfire2/database";
declare let converter:any;

@Component({
  moduleId: module.id,
  selector: "[olympiad-list]",
  templateUrl: "../../templates/components/olympiad-subject.component.html",
  styleUrls: [
    "../../styles/components/olympiad-subject.component.css"
  ]
})

export class OlympiadSubjectComponent {
  post: string = "";
  general: GeneralService;
  subject: String;

  constructor (
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private location: Location,
    general: GeneralService
  ) {
    this.general = general;
    this.general.loading = true;
    this.route.params.subscribe((params: Params) => {
      this.subject = params["subject"];
      this.db.object ("/olympiad/" + params["subject"]).subscribe((post) => {
        this.post = converter.makeHtml (post.$value);
        this.general.loading = false;
      });
    });
  }

  subjectName(): string {
    switch (this.subject) {
      case "math":
        return "МАТЕМАТИКА";
      case "physics":
        return "ФИЗИКА";
      case "chemistry":
        return "ХИМИЯ";
      case "biology":
        return "БИОЛОГИЯ";
      case "cs":
        return "ИНФОРМАТИКА";
      default:
        return "u w0t m8?";
    }
  }

  goBack(): void {
    this.location.back();
  }
}
