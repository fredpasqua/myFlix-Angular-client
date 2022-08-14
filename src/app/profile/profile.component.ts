import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  usersFavoriteMovies: any = [];
  movies: any = [];
  @Input() userData: any = {Username: '', Password: '', Email: '', Birthday: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getMovies();
 
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {   
      this.usersFavoriteMovies= resp.FavoriteMovies;
      this.user = resp;
      this.userData.Password = '';
      this.userData.Username = resp.Username;
      this.userData.Email = resp.Email;
      this.userData.Birthday = new Date(resp.Birthday).toISOString().split('T')[0];
      return this.user
      
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
       this.movies = resp;
      });
  }

  isFav(id: string): boolean{
    return this.usersFavoriteMovies.includes(id);
  }




  /**
   * allows user to edit their data, such as Username, password, email, and birthday
   */
  editUser(): void {
    if(this.userData.Username&&this.userData.Password&&this.userData.Email){
    this.fetchApiData.updateUser(this.userData).subscribe((result) => {
      this.snackBar.open('Successfully updated profile!', 'OK', {
        duration: 2000
      })
        this.getUser()
        localStorage.setItem('user', this.userData.Username)
        this.ngOnInit()
      })
    } else {
        this.snackBar.open('Missing Required info', 'OK', {
          duration: 2000
      })};
  };
  
  backToMovies(): void {
    this.router.navigate(['movies']);
  }
}
