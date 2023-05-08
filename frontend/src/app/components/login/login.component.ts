import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {

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
      formBody.append('loginUser', values.loginUser)
      formBody.append('loginPassw', values.loginPassw)

      this._http.post('https://jsonplaceholder.typicode.com/users', formBody, 
      {
        headers: {'Content-Type': 'multipart/form-data'}
      }).subscribe({
        next: this.resultPostForm.bind(this),
        error: this.errorPostForm.bind(this)
      });
    }
    else if(type == 1){ // Register
      console.log("registerForm: ", values);
      if(values.registerPassw === values.registerPasswRepit){
        let formBody = new FormData();
        formBody.append('registerUser', values.registerUser)
        formBody.append('registerPassw', values.registerPassw)
    
        this._http.post('https://jsonplaceholder.typicode.com/users', formBody, 
        {
          headers: {'Content-Type': 'multipart/form-data'}
        }).subscribe({
          next: this.resultPostForm.bind(this),
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

      this._http.post('https://jsonplaceholder.typicode.com/users', formBody, 
      {
        headers: {'Content-Type': 'multipart/form-data'}
      }).subscribe({
        next: this.resultPostForm.bind(this),
        error: this.errorPostForm.bind(this)
      });
    }
    else{ 
      console.error("ERROR al identificar la función de la petición.")
    }
  }

  resultPostForm(data: any){
    console.log("next: ", data);
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
