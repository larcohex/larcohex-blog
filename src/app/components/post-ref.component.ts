import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: "post-ref",
  templateUrl: "../../templates/components/post-ref.component.html",
  styleUrls: [
    "../../styles/components/post-ref.component.css"
  ]
})
export class PostRefComponent implements OnChanges {
  @Input() post = {
    ref: "",
    img: "",
    subtitle: "",
    title: ""
  };
  @Input() tvalue = 1;
  @Output() onChange = new EventEmitter <boolean>();
  JSON: any;
  constructor() {
    this.JSON = JSON;
  }

  ngOnChanges (changes: SimpleChanges) {
    if (this.tvalue % 3 === 0) {
      this.onChange.emit (true);
    }
  }
}
