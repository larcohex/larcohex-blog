import { Component, OnInit } from "@angular/core";
declare let d3:any;

@Component({
  moduleId: module.id,
  selector: "olympiad-loading",
  templateUrl: "../../templates/components/olympiad-loading.component.html",
  styleUrls: [
    "../../styles/components/olympiad-loading.component.css"
  ]
})
export class OlympiadLoadingComponent implements OnInit {
  ngOnInit() {
    let path = d3.select ("#path1111");
    let rotation = function() {
      path.transition().duration (1000).ease (d3.easeCubic).style ("stroke-dashoffset", (parseInt (path.style ("stroke-dashoffset")) - 41.6) + "%").on ("end", rotation);
    };
    rotation();
  }
}
