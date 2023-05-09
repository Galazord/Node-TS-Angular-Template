import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import config from "../../../config.json";

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
 
  loginForm: FormGroup
  registerForm: FormGroup
  passwordForm: FormGroup

  constructor(
    private _builderLogin: FormBuilder,
    private _builderRegister: FormBuilder,
    private _builderPassword: FormBuilder,
    private _http: HttpClient
  ){
    this.loginForm = this._builderLogin.group({
      loginUser: [""],
      loginPassw: ["", Validators.required]
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
      console.log("sendForm: ", values);

      let formBody = new FormData();
      formBody.append('username', values.loginUser)
      formBody.append('password', values.loginPassw)

      this._http.post(this.urlLogin, formBody, 
      {
        headers: {'Content-Type': 'application/json'}
      }).subscribe({
        next: this.resultPostLogin.bind(this),
        error: this.errorPostForm.bind(this)
      });
    }
    else if(type == 1){ // Register
      
      if(values.registerPassw === values.registerPasswRepit){
        let formBody = new FormData();
        formBody.append('registerUser', values.registerUser)
        formBody.append('registerPassw', values.registerPassw)
        formBody.append('role', 'user')

        console.log(this.urlRegister);
        console.log("registerForm: ", formBody);
    
        this._http.post(this.urlRegister, formBody, 
        {
          headers: {'Content-Type': 'application/json'}
        }).subscribe({
          next: this.resultPostRegister.bind(this),
          error: this.errorPostForm.bind(this)
        });
      }
      else{
        console.error("Las contraseñas no coinciden")
      }
    }
    else if(type == 2){ // Forgotten password
      console.log("PasswordForm: ", values);

      let formBody = new FormData();
      formBody.append('emailPassword', values.emailPassword)

      this._http.post(this.urlPasswEmail, formBody, 
      {
        headers: {'Content-Type': 'application/json'}
      }).subscribe({
        next: this.resultPostPassw.bind(this),
        error: this.errorPostForm.bind(this)
      });
    }
    else{ 
      console.error("ERROR al identificar la función de la petición.")
    }
  }

  resultPostLogin(data: any){
    console.log("login: ", data);
  }
  resultPostRegister(data: any){
    console.log("register: ", data);
  }
  resultPostPassw(data: any){
    console.log("password: ", data);
  }

  errorPostForm(err: HttpErrorResponse){
    console.error("Error: ", err);
  }

  sendForgotPassw(){
    console.log("Password");
    this.showLogin = 'password'
  }

  goFormRegister(){
    console.log("register");
    this.loginForm.reset()
    this.registerForm.reset()
    this.showLogin = 'register'
  }

  goBackLogin(){
    console.log("VOLVER")
    this.loginForm.reset()
    this.registerForm.reset()
    this.showLogin = 'login'
  }

}
