import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { AppComponent } from '../app.component';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email_valid: boolean = true;
  Password_valid: boolean = true;
  email_format_valid: boolean = true;

  constructor(private http: Http, private router: Router,private AppComponent: AppComponent) { }

  ngOnInit() {
    this.AppComponent.login = false;
  }


  login(email, password){
    this.email_valid = true;
    this.Password_valid = true;
    this.email_format_valid = true; 

    //check validation
    if(email == "" || email == null){
      this.email_valid = false;
    }
    else if(!this.validateEmail(email)){
      //email format is valid
      this.email_format_valid = false;
    }
    if(password == "" || password == null){
      this.Password_valid = false;
    }
    if(!this.Password_valid || !this.email_valid || !this.email_format_valid)
      return;

    //use Rest API to get user_api_token
    const body = {
      "email":email, 
      "password":password
    } 
    const headers = new Headers({'Content-Type': 'application/json' , 'Accept': 'application/json'});
    const options = new RequestOptions({headers: headers,withCredentials:true});
    this.http.post('https://qa.manna-irrigation.com:8443/omer/api/v2/users/login', 
                  body,
                  options)
    .toPromise()
    .then(response => {
     var user_api_token = response.json().user_api_token;
     this.AppComponent.login = true;
     this.router.navigate(['/farms'],{queryParams: { user_api_token: user_api_token }});
    }).catch(Error => {
      swal("email or password incorect!");
    });
  }

   //check if the email address is valid
   validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}