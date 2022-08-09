import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  loading: boolean = false;
  favorites: any[] = ["621837d7a9f7d842a1f68dad"];
  constructor(public fetchApiData: FetchApiDataService) { }

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
 
}
