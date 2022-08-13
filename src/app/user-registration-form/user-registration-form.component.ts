import { Component, OnInit, Input } from '@angular/core';
//close dialogue on success
import { MatDialogRef } from '@angular/material/dialog';

//This Import to bring in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

//Import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

    @Input() userData = {Username: '', Password: '', Email: '', Birthday: ''};
  constructor(
      public fetchApiData: FetchApiDataService, 
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
// This is the function to send the form inputs to the backend
// function for sending the form inputs to the backend to create a new user
//  @returns alert indeication a successful registration or an error.

registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      //Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); //This will close the modal on success!
      this.snackBar.open('User registration successful', 'OK', {
        duration: 2000
      });
    }, (response) => (
      this.snackBar.open('Please try again', 'OK', {
        duration: 2000
      })
    ))
  }

}
