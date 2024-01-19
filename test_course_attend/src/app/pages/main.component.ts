import { ConfigService } from './../service/config.service';
import { PeriodChooserComponent } from './../modal/period-chooser.component';
import { AlertService } from './../service/alert.service';
import { DebugComponent } from './../modal/debug.component';
import { DSAService, RollCallRecord, SuggestRecord } from './../service/dsa.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'gd-main',
  templateUrl: './main.component.html',
  styleUrls: ['../common.css']
})
export class MainComponent implements OnInit {

  today: string; // 今日。

  suggests: SuggestRecord[]; // 今加建議點名。

  courses: RollCallRecord[]; //課程清單。

  constructor(
    private dsa: DSAService,
    private alert: AlertService,
    private dialog: MatDialog,
    private router: Router,
    private config: ConfigService
  ) { }

  async ngOnInit() {
    try {

      await this.config.ready;
      
      this.today = this.dsa.getToday();

      this.courses = await this.dsa.getCCItems();

      this.suggests = await this.dsa.getSuggestRollCall(this.dsa.getToday());
      // this.suggests = await this.dsa.getSuggestRollCall("2018/4/27");

      // this.alert.json(this.suggests);
      
    } catch (error) {
      this.alert.json(error);
    } finally {
    }
  }

  async openPicker(course: RollCallRecord) {

    this.dialog.open(PeriodChooserComponent, {
      data: { course: course },
    });
  }

  async openSuggest(suggest: SuggestRecord) {

    // await this.alert.json(suggest)
    //   .afterClosed()
    //   .toPromise();

    this.router.navigate(['../pick', 'Course', suggest.CourseID, suggest.Period], {
      queryParams: { DisplayName: suggest.CourseName }
    });
  }
}
