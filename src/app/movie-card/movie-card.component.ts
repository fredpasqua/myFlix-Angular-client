import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  loading: boolean = false;
  favorites: any[] = ["621837d7a9f7d842a1f68dad"];
  constructor(
    public fetchApiData: FetchApiDataService, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loading = true;
    this.getMovies();
    this.getFavorites();
  }

  isFav(id: string): boolean {
    return this.favorites.includes(id)
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      this.loading = false;
      return this.movies;
    });
  }

  getFavorites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      const userFavorites = (resp._id);
      console.log(resp._id)
      this.favorites.push(userFavorites);
    })
  }

  addFavorite(_id: string): void {
    this.fetchApiData.addFavoriteMovie(_id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  };


  openDirectorDialoge(Name: string, Bio: string, Birth: Date): void {
    this.dialog.open(DirectorComponent, {
      width: '280px',
      data: {
        Name: Name,
        Bio: Bio,
        Birthday: Birth,
      }
      
    }
    
    );
   
  }

  openGenreDialoge(Name: string, Description: string): void {
    this.dialog.open(GenreComponent, {
      width: '280px',
      data: {
        Name: Name,
        Description: Description,
      
      }
    });
  }
 
}
