import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxFileDropEntry } from 'ngx-file-drop';
import config from "../../../config.json";
import { DialogErrorComponent } from '../dialogs/dialog-error/dialog-error.component';
import { DialogLoaderComponent } from '../dialogs/dialog-loader/dialog-loader.component';
import { DialogSuccessComponent } from '../dialogs/dialog-success/dialog-success.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

export interface UploadData {
  date: string;
  name: string;
  message: string
}
@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.scss']

})
export class DataUploadComponent {
  urldataUpload: string = config.host + config.apiUrl + config.dataUpload
  public files: NgxFileDropEntry[] = [];
  uploadForm: FormGroup
  resDialogTitle: string = ''
  resDialogText: string = ''
  resLoadingTitle: string = ''
  respFileContent = []
  allDataTable: UploadData[] = [];
  displayedColumns: string[] = ['date', 'name', 'message'];
  dataSource = new MatTableDataSource(this.allDataTable);

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

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
  }

  public fileOver(event: any){
    console.log(event);
  }

  public fileLeave(event: any){
    console.log(event);
  }

  sendForm(values: any){
    console.log("Enviar formulario: ", this.files);

    if(this.files != null && this.files.length > 0){
      for (const droppedFile of this.files) {

        // Is it a file?
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {

            // Here you can access the real file
            console.log("FILE >> ", droppedFile.relativePath, file);

            let nameFile = String(file.name);
            let extension = nameFile.split(".")[1];
            if(extension == 'xlsx' || extension == 'xlsb'){
              this.processFile();
            }else{
              this.resDialogTitle = this.translate.instant('incompatibleFile')
              this.resDialogText = this.translate.instant('formatFileError')
              this.openGeneralError(this.resDialogTitle, this.resDialogText);
            }

          });
        } else {
          // It was a directory (empty directories are added, otherwise only files)
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
          console.error("ERROR: ", droppedFile.relativePath, fileEntry);

          this.resDialogTitle = this.translate.instant('notFoundFile')
          this.resDialogText = this.translate.instant('textSelectFile')
          this.openGeneralError(this.resDialogTitle, this.resDialogText);
        }
      }      
    }
  }
  processFile(){
    /**
    // Podría cargarlo así:
    const formData = new FormData()
    formData.append('logo', file, relativePath)

    // Headers
    const headers = new HttpHeaders({
      'security-token': 'mytoken'
    })

    this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
    .subscribe(data => {
      // Sanitized logo returned from backend
    })
    **/

    this.resLoadingTitle = this.translate.instant('loading')
    this.openLoaderScreen(this.resDialogTitle, this.resDialogText);

    for (const droppedFile of this.files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          let formData = new FormData();
          formData.append('file', file);
          this._http.post(this.urldataUpload, formData, 
          {
            headers: {'Content-Type': 'blob'}
          }).subscribe({
            next: this.resultUploadFile.bind(this),
            error: this.errorPostUploadFile.bind(this)
          });

        });
      }
    }
  }
  resultUploadFile(data: any){
    this.dialog.closeAll();
    
    this.respFileContent = []
    for (const item of data) {
      /* this.respFileContent.push({
        date: moment(item.date).format("DD/MM/YYYY hh:mm:ss"),
        name: item.name,
        message: item.description
      }) */
    }

    this.resDialogTitle = this.translate.instant('uploadComplete')
    this.resDialogText = this.translate.instant('fileSavedSuccessfully')
    this.openSuccess(this.resDialogTitle, this.resDialogText);

  }

  errorPostUploadFile(err: HttpErrorResponse){
    this.dialog.closeAll();
    console.error("Error: ", err);
    this.resDialogTitle = this.translate.instant('failedRegistration')
    this.resDialogText = this.translate.instant('fileSavedInterrupted')
    this.openGeneralError(this.resDialogTitle, this.resDialogText);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /* DIALOGS */
  openGeneralError(titleError: string, textError: string): void{
    this.dialog.open(DialogErrorComponent, {
      width: '450px',
      data: {title: titleError, text: textError},
      disableClose: true,
      hasBackdrop: true
    });
  }
  openLoaderScreen(titleSuccess: string, textSuccess: string): void{
    this.dialog.open(DialogLoaderComponent, {
      width: '450px',
      data: {title: titleSuccess, text: textSuccess},
      disableClose: true,
      hasBackdrop: true
    });
  }
  openSuccess(titleSuccess: string, textSuccess: string): void{
    this.dialog.open(DialogSuccessComponent, {
      width: '450px',
      data: {title: titleSuccess, text: textSuccess},
      disableClose: true,
      hasBackdrop: true
    });
  }
}

