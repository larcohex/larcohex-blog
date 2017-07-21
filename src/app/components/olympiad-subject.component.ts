import { Component, OnDestroy } from "@angular/core";
import { Location }                 from '@angular/common';
import { GeneralService } from "../services/general.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Meta } from "@angular/platform-browser";
import { AngularFireDatabase } from "angularfire2/database";
declare let converter:any;

@Component({
  moduleId: module.id,
  selector: "[olympiad-subject]",
  templateUrl: "../../templates/components/olympiad-subject.component.html",
  styleUrls: [
    "../../styles/components/olympiad-subject.component.css"
  ]
})

export class OlympiadSubjectComponent implements OnDestroy {
  post: string = "";
  general: GeneralService;
  subject: String;

  constructor (
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private location: Location,
    private meta: Meta,
    general: GeneralService
  ) {
    this.general = general;
    this.general.loading = true;
    this.route.params.subscribe((params: Params) => {
      this.subject = params["subject"];
      this.db.object ("/olympiad/" + params["subject"]).subscribe((post) => {
        this.post = converter.makeHtml (post.text);
        this.general.loading = false;
        this.meta.updateTag({ name: "og:url", content: window.location.href });
        this.meta.updateTag({ name: "og:title", content: this.subjectName() });
        this.meta.updateTag({ name: "og:description", content: "Материал для подготовки к олимпиаде" });
        this.meta.updateTag({ name: "og:image", content: post.img });
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

  ngOnDestroy(): void {
    this.meta.updateTag({ name: "og:url", content: "larcohex.github.io" });
    this.meta.updateTag({ name: "og:title", content: "Larcohex"});
    this.meta.updateTag({ name: "og:description", content: "Блог-портфолио" });
    this.meta.updateTag({ name: "og:image", content: "https://raw.githubusercontent.com/larcohex/larcohex.github.io/develop/src/assets/images/background/background.jpg" });
  }
}
