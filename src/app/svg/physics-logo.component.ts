import { Component, OnInit } from "@angular/core";
declare let d3:any;

@Component({
  moduleId: module.id,
  selector: "[physics-logo]",
  templateUrl: "../../templates/svg/physics-logo.component.html"
})
export class PhysicsLogoComponent implements OnInit {
  ngOnInit() {
    let e1 = d3.select ("#electron-1");
    let e2 = d3.select ("#electron-2");
    let e3 = d3.select ("#electron-3");
    let rotation = function() {
      e1.transition().duration (2000).ease (d3.easeLinear).style ("stroke-dashoffset", (parseInt (e1.style ("stroke-dashoffset")) - 400) + "px");
      e2.transition().duration (2000).ease (d3.easeLinear).style ("stroke-dashoffset", (parseInt (e2.style ("stroke-dashoffset")) - 400) + "px");
      e3.transition().duration (2000).ease (d3.easeLinear).style ("stroke-dashoffset", (parseInt (e3.style ("stroke-dashoffset")) - 400) + "px").on ("end", rotation);
    };
    rotation();
  }
}

// e1.transition().duration (2000).ease (d3.easeLinear).style ("stroke-dashoffset", (parseInt (e1.style ("stroke-dashoffset")) - 400) + "px").on ("end", rotation);
