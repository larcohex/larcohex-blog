import { Injectable } from "@angular/core";

@Injectable()
export class GeneralService {
  loading: boolean = true;

  public orientation(): string {
    if (window.innerHeight > window.innerWidth) {
      return "portrait";
    }
    else if (window.innerHeight < window.innerWidth) {
      return "landscape";
    }
    else {
      return "square";
    }
  }
}
