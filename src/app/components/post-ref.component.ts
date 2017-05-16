import { Component, Input } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: "post-ref",
  templateUrl: "../../templates/components/post-ref.component.html",
  styleUrls: [
    "../../styles/components/post-ref.component.css"
  ]
})
export class PostRefComponent {
  @Input() post = {
    ref: "",
    img: "",
    subtitle: "",
    title: ""
  };
  JSON: any;
  constructor() {
    this.JSON = JSON;
  }
}
