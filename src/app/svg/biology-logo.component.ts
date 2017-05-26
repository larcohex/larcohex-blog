import { Component, OnInit } from "@angular/core";
declare let d3:any;

@Component({
  moduleId: module.id,
  selector: "biology-logo",
  templateUrl: "../../templates/svg/biology-logo.component.html"
})
export class BiologyLogoComponent implements OnInit{
  ngOnInit() {
    let zoomed = d3.selectAll (".zoomed");
    let zoomIn = function() {
      zoomed.transition().duration (1000).ease (d3.easeCubic).style ("fill", "#0e6d0f").attr ("transform", "scale (1.02, 1.02)").on ("end", zoomOut);
    };
    let zoomOut = function() {
      zoomed.transition().duration (1000).ease (d3.easeCubic).style ("fill", "#ffffff").attr ("transform", "scale (1, 1)").on ("end", zoomIn);
    };
    zoomIn();
  }
}
