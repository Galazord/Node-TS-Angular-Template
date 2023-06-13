import { Component, inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { MatTableDataSource } from '@angular/material/table';

export interface Topic {
  topic: string;
  date: string;
  message: string
}

export interface UploadData {
  date: string;
  name: string;
  message: string
}

export interface UploadDataTable {
  date: string;
  topic: string;
  message: string
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-logs-analyzer',
  templateUrl: './logs-analyzer.component.html',
  styleUrls: ['./logs-analyzer.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class LogsAnalyzerComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  allListTopics: Topic[] = [];
  uploadForm: FormGroup
  public files: NgxFileDropEntry[] = [];
  allDataTable: UploadDataTable[] = [];
  displayedColumns: string[] = ['date', 'topic', 'message'];
  dataSource = new MatTableDataSource(this.allDataTable);

  announcer = inject(LiveAnnouncer);
  

  constructor(
    private _builderUpload: FormBuilder,
    public dialog: MatDialog,
    public translate: TranslateService,
    private _http: HttpClient,
  ){
    this.uploadForm = this._builderUpload.group({
      files: ["", Validators.required]
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our topic
    if (value) {
      this.allListTopics.push({topic: value, date: '', message: ''});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(listTopic: Topic): void {
    const index = this.allListTopics.indexOf(listTopic);

    if (index >= 0) {
      this.allListTopics.splice(index, 1);

      this.announcer.announce(`Removed ${listTopic}`);
    }
  }

  edit(listTopic: Topic, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove topic if it no longer has a name
    if (!value) {
      this.remove(listTopic);
      return;
    }

    // Edit existing fruit
    const index = this.allListTopics.indexOf(listTopic);
    if (index >= 0) {
      this.allListTopics[index].topic = value;
    }
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
  }

  public fileOver(event: any){
    console.log(event);
  }

  public fileLeave(event: any){
    console.log(event);
  }
  public compareDates(){
    //
  }
}
