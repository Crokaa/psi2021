import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-upload',
  templateUrl: './choose-upload.component.html',
  styleUrls: ['./choose-upload.component.css']
})
export class ChooseUploadComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {

    if(!localStorage.getItem("currentUser")){
      this.router.navigate(['/login',{auth : false}]);
      return;
    }
  }

}
