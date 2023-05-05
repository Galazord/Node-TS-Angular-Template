import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  showLogin:string = 'login'
  statusTheme = [{value: 'xx'}]
 
  signupForm: FormGroup

  constructor(
    private _builder: FormBuilder,
    private _http: HttpClient
  ){
    this.signupForm = this._builder.group({
      name: [""],
      passw: ["", Validators.required]
    })
  }
  
  sendForm(values: any) {
    console.log("sendForm: ", values);

    let formBody = new FormData();
    formBody.append('name', values.name)
    formBody.append('passw', values.passw)

    this._http.post('https://jsonplaceholder.typicode.com/users', formBody, 
    {
      headers: {'Content-Type': 'multipart/form-data'}
    }).subscribe({
      next: this.resultPostForm.bind(this),
      error: this.errorPostForm.bind(this)
    });
  }

  resultPostForm(data: any){
    console.log("next: ", data);
  }

  errorPostForm(err: HttpErrorResponse){
    console.error("Error: ", err);
  }
  
}
