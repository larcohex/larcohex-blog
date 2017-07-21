import { MdDialogRef } from "@angular/material";
import { Component } from "@angular/core";

@Component({
  selector:"confirm-dialog",
  template: `
    <p>{{ title }}</p>
    <p>{{ message }}</p>
    <button class="dialog-button dark-button w-40 h-50" (click)="dialogRef.close(true)">Да</button>
    <button class="dialog-button light-button w-40 h-50" (click)="dialogRef.close()">Нет</button>
  `,
  styles: [`
    .dialog-button
    {
      padding: 10px 15px;
    }
  `]
})
export class ConfirmDialog {

  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<ConfirmDialog>) {

  }
}
