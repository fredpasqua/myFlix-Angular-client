import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieViewComponent } from '../movie-view/movie-view.component';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  loading: boolean = false;
  favorites: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loading = true;
    this.getFavorites();
    this.getMovies();
   
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
      const userFavorites = (resp.FavoriteMovies);
      console.log(resp.FavoriteMovies)
      this.favorites = userFavorites;
    })
  }

  addFavorite(id: any): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((resp: any) => {
      console.log(resp);
      this.ngOnInit();
    })
  };

  removeFavorite(id: any): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((resp: any) => {
      console.log(resp);
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
    });
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

  openMovieViewDialoge(
    Title: string, 
    Description: string, 
    ImagePath: string): void {
    this.dialog.open(MovieViewComponent, {
      width: '350px',
      data: {
        Title: Title,
        Description: Description,
        ImagePath: ImagePath,
      }
    });
  }




}
