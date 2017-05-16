import { Component, OnInit } from "@angular/core";
declare let d3:any;

@Component({
  moduleId: module.id,
  selector: "blog-loading",
  templateUrl: "../../templates/components/blog-loading.component.html",
  styleUrls: [
    "../../styles/components/blog-loading.component.css"
  ]
})

export class BlogLoadingComponent implements OnInit {
  ngOnInit() {
    let path = d3.select ("#path1111");
    let rotation = function() {
      path.transition().duration (1000).ease (d3.easeCubic).style ("stroke-dashoffset", (parseInt (path.style ("stroke-dashoffset")) - 41.6) + "%").on ("end", rotation);
    };
    rotation();
  }
}
