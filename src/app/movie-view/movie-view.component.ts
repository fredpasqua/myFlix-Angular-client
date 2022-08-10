import { Component, OnInit, Inject } from '@angular/core';
//close dialogue on success
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
//This Import to bring in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss']
})
export class MovieViewComponent implements OnInit {

  constructor(
  @Inject(MAT_DIALOG_DATA)
  public data: {
    Title: string,
    Description: string,
    ImagePath: string,
  }
) { }


  ngOnInit(): void {
  }

}

