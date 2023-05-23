import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import config from "../../../config.json";
import { DialogErrorComponent } from '../dialogs/dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogSuccessComponent } from '../dialogs/dialog-success/dialog-success.component';
import { TranslateService } from '@ngx-translate/core';
import { DialogLoaderComponent } from '../dialogs/dialog-loader/dialog-loader.component';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {

  urlLogin: string = config.host + config.apiUrl + config.login
  urlRegister: string = config.host + config.apiUrl + config.register
  urlPasswEmail: string = config.host + config.apiUrl + config.forgottenPassword

  showLogin: string = 'login'
  hide = true
  hidePassw = true
  hidePasswRepit = true
  resDialogTitle: string = ''
  resDialogText: string = ''
  resLoadingTitle: string = ''
  userAux: string = ''
 
  loginForm: FormGroup
  registerForm: FormGroup
  passwordForm: FormGroup

  constructor(
    private _builderLogin: FormBuilder,
    private _builderRegister: FormBuilder,
    private _builderPassword: FormBuilder,
    private _http: HttpClient,
    public dialog: MatDialog,
    private _router: Router,
    public translate: TranslateService,
    private fb: FormBuilder,
    private authService: AuthService
  ){
    this.loginForm = this._builderLogin.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    })

    this.registerForm = this._builderRegister.group({
      registerUser: [""],
      registerPassw: ["", Validators.required],
      registerPasswRepit: ["", Validators.required]
    })

    this.passwordForm = this._builderPassword.group({
      emailPassword: ["", Validators.required]
    })
  }
  
  sendForm(values: any, type: number) {
    if(type == 0){ // Login
      if(values.userName != undefined && values.password != undefined && values.userName != "" && values.password != ""){
        this.resLoadingTitle = this.translate.instant('loading')
        this.openLoaderScreen(this.resDialogTitle, this.resDialogText);

        this.resDialogTitle = this.translate.instant('accessDenied')
        this.resDialogText = this.translate.instant('errorLogin')

        let bodyPOST = {
          username: values.userName,
          password: values.password
        }

        this.userAux = values.userName;

        console.log(this.urlLogin);
        console.log("bodyPOST: ", bodyPOST);

        this._http.post(this.urlLogin, bodyPOST, 
        {
          headers: {'Content-Type': 'application/json'}
        }).subscribe({
          next: this.resultPostLogin.bind(this),
          error: this.errorPostForm.bind(this)
        });
      }
      else{
        this.resDialogTitle = this.translate.instant('accessDenied')
        this.resDialogText = this.translate.instant('incorrectUserOrPassw')
        this.openGeneralError(this.resDialogTitle, this.resDialogText);
      }
    }
    else if(type == 1){ // Register
      if(values.registerUser != undefined && values.registerPassw != undefined && values.registerUser != "" && values.registerPassw != ""){
        if(values.registerPassw === values.registerPasswRepit){
          this.resLoadingTitle = this.translate.instant('loading')
          this.openLoaderScreen(this.resDialogTitle, this.resDialogText);

          this.resDialogTitle = this.translate.instant('errorRegisteringUserTitle')
          this.resDialogText = this.translate.instant('errorRegisteringUserText')

          let bodyPOST = {
            username: values.registerUser,
            password: values.registerPassw,
            role: 'user'
          }

          this.userAux = values.registerUser
      
          this._http.post(this.urlRegister, bodyPOST, 
          {
            headers: {'Content-Type': 'application/json'}
          }).subscribe({
            next: this.resultPostRegister.bind(this),
            error: this.errorPostForm.bind(this)
          });
        }
        else{
          this.resDialogTitle = this.translate.instant('incorrectPasswTitle')
          this.resDialogText = this.translate.instant('incorrectPasswText')
          this.openGeneralError(this.resDialogTitle, this.resDialogText);
        }
      }
      else{
        this.resDialogTitle = this.translate.instant('accessDenied')
        this.resDialogText = this.translate.instant('incorrectUserOrPassw')
        this.openGeneralError(this.resDialogTitle, this.resDialogText);
      }
    }
    else if(type == 2){ // Forgotten password
      if(values.emailPassword != undefined && values.emailPassword != ""){
        this.resLoadingTitle = this.translate.instant('loading')
        this.openLoaderScreen(this.resDialogTitle, this.resDialogText);

        this.resDialogTitle = this.translate.instant('errorProcessTitle')
        this.resDialogText = this.translate.instant('errorProcessText')

        let bodyPOST = {
          emailPassword: values.emailPassword
        }

        this._http.post(this.urlPasswEmail, bodyPOST, 
        {
          headers: {'Content-Type': 'application/json'}
        }).subscribe({
          next: this.resultPostPassw.bind(this),
          error: this.errorPostForm.bind(this)
        });
      }
      else{
        this.resDialogTitle = this.translate.instant('incorrectPasswTitle')
        this.resDialogText = this.translate.instant('incorrectEmail')
        this.openGeneralError(this.resDialogTitle, this.resDialogText);
      }

    }
    else{ 
      console.error("ERROR al identificar la función de la petición.")
    }
  }

  resultPostLogin(data: any){
    this.dialog.closeAll();
    window.localStorage.setItem("infoUser", JSON.stringify(
      {
        id: this.userAux,
        token: data.token,
        role: data.role,
      })
    )
    this.authService.login(this.loginForm.value);
  }
  resultPostRegister(data: any){
    this.dialog.closeAll();
    this.resDialogTitle = this.translate.instant('registeredUserTitle')
    this.resDialogText = this.translate.instant('registeredUserText', { nameUser: this.userAux })
    this.openSuccess(this.resDialogTitle, this.resDialogText);
    this.goBackLogin();
  }
  resultPostPassw(data: any){
    this.dialog.closeAll();
    console.log("password: ", data);
  }

  errorPostForm(err: HttpErrorResponse){
    this.dialog.closeAll();
    console.error("Error: ", err);
    this.openGeneralError(this.resDialogTitle, this.resDialogText);
  }

  sendForgotPassw(){
    this.showLogin = 'password'
  }

  goFormRegister(){
    this.loginForm.reset()
    this.registerForm.reset()
    this.showLogin = 'register'
  }

  goBackLogin(){
    this.loginForm.reset()
    this.registerForm.reset()
    this.showLogin = 'login'
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

  openSuccess(titleSuccess: string, textSuccess: string): void{
    this.dialog.open(DialogSuccessComponent, {
      width: '450px',
      data: {title: titleSuccess, text: textSuccess},
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

  /*
  openDialog(): void{
    const dialogRef = this.dialog.open(DialogErrorComponent, {
      width: '450px',
      data: {title: "CERRAR SESIÓN", text: "¿Está seguro de cerrar la sesión de usuario actual?"},
      disableClose: true,
      hasBackdrop: true
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        console.log("Cambios confirmados");
      }
    })
  }
  */
}
