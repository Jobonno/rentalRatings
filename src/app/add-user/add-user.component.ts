import { Component, Output } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  @Output() onSaved = new EventEmitter();
  private active : boolean = true;
  private hide = true;
  private rForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {

    this.rForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.required],
      'username': [null, Validators.required],
    })
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
          this.onSaved.emit('submit');
          this.rForm.reset();
          //work around for validation errors not resetting
          this.active = false;
          setTimeout(() => this.active = true, 0);
        })
    }else{
      //add alert to correct form
    }
    
  }
}
