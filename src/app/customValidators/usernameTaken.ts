import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../data.service';

@Injectable()
export class UsernameValidator {

  debouncer: any;
  debouncerEmail: any;

  constructor(private _dataService: DataService) {

  }

  userNameTaken(control: FormControl): any {
    clearTimeout(this.debouncer);
    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this._dataService.validateUsername(control.value).subscribe((res) => {
          if (res.available) {
            resolve(null);
          } else {
            resolve({ 'usernameInUse': true });
          }
        }, (err) => {
          resolve({ 'usernameInUse': true });
        });

      }, 1000);
    });
  }

  emailTaken(control: FormControl): any {
    clearTimeout(this.debouncerEmail);
    return new Promise(resolve => {
      this.debouncerEmail = setTimeout(() => {
        this._dataService.validateEmail(control.value).subscribe((res) => {
          if (res.available) {
            resolve(null);
          } else {
            resolve({ 'emailInUse': true });
          }
        }, (err) => {
          resolve({ 'emailInUse': true });
        });

      }, 1000);
    });
  }

}