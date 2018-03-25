import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

   // Define a users property to hold our user data
   users: Array<any>;

   // Create an instance of the DataService through dependency injection
   constructor(private _dataService: DataService) {}

   ngOnInit(){
     this.getUserList();
   }
 
   onSaved(event){
     this.getUserList();
   }

  getUserList(){
     // Access the Data Service's getUsers() method we defined
     this._dataService.getUsers()
         .subscribe(res => this.users = res);
  }
}
