import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-cancel',
  templateUrl: './confirm-cancel.component.html',
  styles: []
})
export class ConfirmCancelComponent implements OnInit {

  reason: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmCancelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
   this.reason = this.data.reason;
  }

  onNoClick(): void {
    this.dialogRef.close({
      reason: '',
      confirm: false,
    });
  }

  onYesClick(): void {
    this.dialogRef.close({
      reason: this.reason,
      confirm: true,
    });
  }
}
