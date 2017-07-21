import { Observable } from "rxjs/Rx";
import { MdDialogRef, MdDialog } from "@angular/material";
import { Injectable } from "@angular/core";
import { ConfirmDialog } from "../objects/confirm-dialog.component";

@Injectable()
export class DialogService {

  constructor(private dialog: MdDialog) { }

  public confirm(title: string, message: string): Observable<boolean> {

    let dialogRef: MdDialogRef<ConfirmDialog>;

    dialogRef = this.dialog.open(ConfirmDialog);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
}
