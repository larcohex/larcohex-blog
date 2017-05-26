import { Component, OnInit } from "@angular/core";
declare let d3:any;

@Component({
  moduleId: module.id,
  selector: "cs-logo",
  templateUrl: "../../templates/svg/cs-logo.component.html",
  styleUrls: [
    "../../styles/svg/cs-logo.component.css"
  ]
})
export class CSLogoComponent implements OnInit {
  ngOnInit() {
    let randInt = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    };
    let appear = function (e) {
      setTimeout (function() {
        e.transition().duration (1000).ease (d3.easeCubic).style ("opacity", 1).on ("end", function() {
          disappear (e);
        });
      }, randInt (0, 1000));
    };
    let disappear = function (e) {
      setTimeout (function() {
        e.transition().duration (1000).ease (d3.easeCubic).style ("opacity", 0).on ("end", function() {
          appear (e);
        });
      }, randInt (0, 1000));
    };
    let l = document.getElementsByClassName ("prog-language");
    for (let i = 0; i < l.length; ++i) {
      let elem = d3.select ("#" + l[i].id);
      appear (elem);
    }
  }
}
