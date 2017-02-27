export class GeneralService {
  static orientation(): string {
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
