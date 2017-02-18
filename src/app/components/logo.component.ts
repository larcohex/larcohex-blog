import { Component, OnInit } from "@angular/core";
declare let d3:any;

@Component({
  moduleId: module.id,
  selector: "logo",
  templateUrl: "../../templates/components/logo.component.html"
})
export class LogoComponent implements OnInit {
  ngOnInit() {
    let path = d3.select ("#path3342");
    let rotation = function() {
      path.transition().duration (2000).ease (d3.easeLinear).style ("stroke-dashoffset", (parseInt (path.style ("stroke-dashoffset")) + 1000) + "px").on ("end", rotation);
    };
    rotation();
  }
}
