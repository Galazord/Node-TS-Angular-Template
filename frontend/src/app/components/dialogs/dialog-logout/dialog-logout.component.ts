import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  text: string;
}

@Component({
  selector: 'app-dialog-logout',
  templateUrl: './dialog-logout.component.html',
  styleUrls: ['./dialog-logout.component.scss']
})
export class DialogLogoutComponent {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogLogoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  openDialog() {
    this.dialog.open(DialogLogoutComponent);
  }

  onClickNo(): void {
    this.dialogRef.close();
  }
}
