import { Component, OnInit, Inject } from '@angular/core';
//close dialogue on success
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
//This Import to bring in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {

  constructor( 
  @Inject(MAT_DIALOG_DATA)
  public data: {
    Name: string,
    Bio: string,
    Birthday: Date,
  }
) { }

  ngOnInit(): void {
  }
}
