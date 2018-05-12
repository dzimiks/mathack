
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({

    });
  }

  login() {
    console.log("user logged in");
  }
}
