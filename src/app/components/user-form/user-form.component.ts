import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { User } from 'src/app/models/user';
import { Gender } from 'src/app/models/Gender';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  private _user: User;
  public get user(): User {
    return this._user;
  }
  @Input()
  public set user(user: User) {
    this._user = user;
    this.SignupForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, [Validators.required, this.forbiddenNames.bind(this)]),
      lastName: new FormControl(this.user.lastName, [Validators.required, this.forbiddenNames.bind(this)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email], this.forbiddenEmails),
      gender: new FormControl(this.user.gender),
    });
  }
  @Output() userSaved = new EventEmitter();



  constructor() { }

  genders = [Gender.Female, Gender.Male];
  SignupForm: FormGroup;
  forbiddenUserNames = ['geetha', 'puja'];

  ngOnInit() {

  }
  get f() {
    return this.SignupForm.controls;
  }
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) != -1) {
      return { 'nameisForbidden': true };
    }

    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        }
        else {
          resolve(null);
        }

      }, 1500);
    });
    return promise;
  }

  onSubmit() {

    const updatedUser: User = this.SignupForm.getRawValue();
    this.user.firstName = updatedUser.firstName;
    this.user.lastName = updatedUser.lastName;
    this.user.gender = updatedUser.gender;
    this.user.email = updatedUser.email;

    this.userSaved.emit(this.user);
  }

}
