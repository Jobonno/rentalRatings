import { Component, ViewChild } from '@angular/core';

// Import the DataService
import { DataService } from './data.service';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
private open:boolean = false;
private showForm:boolean = false;
  @ViewChild('drawer') sideDrawer: AddUserComponent;

  OpenRegister(){
    this.open = !this.open;
    if(!this.open){
      setTimeout(()=>this.showForm = !this.showForm,500);
    }else{
      this.showForm = !this.showForm;
    }
  }
 
}