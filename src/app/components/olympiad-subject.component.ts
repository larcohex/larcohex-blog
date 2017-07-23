import { Component } from "@angular/core";
import { Location }                 from '@angular/common';
import { GeneralService } from "../services/general.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AngularFireDatabase } from "angularfire2/database";
declare let converter:any;
declare let FB:any;

@Component({
  moduleId: module.id,
  selector: "[olympiad-subject]",
  templateUrl: "../../templates/components/olympiad-subject.component.html",
  styleUrls: [
    "../../styles/components/olympiad-subject.component.css"
  ]
})

export class OlympiadSubjectComponent {
  post: string = "";
  img: string = "";
  general: GeneralService;
  subject: String;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase,
    private location: Location,
    general: GeneralService
  ) {
    this.general = general;
    this.general.loading = true;
    this.route.params.subscribe((params: Params) => {
      this.subject = params["subject"];
      this.db.object ("/olympiad/" + params["subject"]).subscribe((post) => {
        if (post.hasOwnProperty("$value") && !post["$value"]) {
          this.general.loading = false;
          this.router.navigate (["/404"]);
          return;
        }
        this.post = converter.makeHtml (post.text);
        this.img = post.img;
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

  shareFB(): void {
    FB.ui({
      method: "share",
      href: window.location.href
    }, function(response){});
  }

  shareTwitter(): void {
    window.open ("https://twitter.com/intent/tweet?text=" + this.subjectName() + "&url=" + window.location.href, "Твитнуть", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=480,height:360");
  }

  shareVK(): void {
    window.open ("https://vk.com/share.php?title=" + this.subjectName() + "&url=" + window.location.href + "&img=" + this.img, "Поделиться", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=480,height:360");
  }

  goBack(): void {
    this.location.back();
  }
}
