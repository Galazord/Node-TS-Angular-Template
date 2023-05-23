import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  title: string;
}

@Component({
  selector: 'app-dialog-loader',
  templateUrl: './dialog-loader.component.html',
  styleUrls: ['./dialog-loader.component.scss']
})
export class DialogLoaderComponent {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogLoaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  openDialog() {
    this.dialog.open(DialogLoaderComponent);
  }

  onClickClose(): void {
    this.dialogRef.close();
  }
}
