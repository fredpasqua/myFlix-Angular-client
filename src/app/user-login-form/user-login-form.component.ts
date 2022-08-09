import { Component, OnInit, Input } from '@angular/core';
//close dialogue on success
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
//This Import to bring in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

//Import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {
 
  @Input() userData = {Username: '', Password: ''};
  constructor(
      public fetchApiData: FetchApiDataService, 
      public dialogRef: MatDialogRef<UserLoginFormComponent>,
      public snackBar: MatSnackBar,
      public router: Router
  ) {}
  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      // Add token and username to local Storage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', response.user.Username);
      this.router.navigate(['movies']);
      this.dialogRef.close(); //This will close the modal on success!
    }, (response) => (
      this.snackBar.open('Please try again!', 'OK', {
        duration: 2000
      })
    ))
  }

}
