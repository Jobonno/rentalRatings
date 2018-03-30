import { Component, Output, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { RegisterValidator } from '../customValidators/registerUser';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],

})
export class AddUserComponent {
  @Output() onSave = new EventEmitter();
  private active : boolean = true;
  private hide = true;
  private rForm: FormGroup;
  constructor(private http: HttpClient, private fb: FormBuilder, private registerValidator: RegisterValidator) {

    this.rForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email]),registerValidator.emailTaken.bind(registerValidator)],
      'password': [null, Validators.required],
      'username': [null, Validators.required, registerValidator.userNameTaken.bind(registerValidator)],
    });

   }

  onSubmit(form: any): void {
    if(this.rForm.valid){
      this.http.post('/api/addUser', form)
      .subscribe(
        f => { },
        err => {
          alert(err.error.message);

        },
        () => {
          this.onSave.emit('submit');
          this.rForm.reset();
          //work around for validation errors not resetting
          this.active = false;
          setTimeout(() => this.active = true, 0);
        })
    }    
  }

}
