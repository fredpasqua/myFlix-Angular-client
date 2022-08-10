import { Component, OnInit, Inject } from '@angular/core';
//close dialogue on success
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
//This Import to bring in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  constructor(
  @Inject(MAT_DIALOG_DATA)
  public data: {
    Name: string,
    Description: string,
  }
) { }


  ngOnInit(): void {
  }

}
