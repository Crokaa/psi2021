import { Component, OnInit } from '@angular/core';
import { Fotografia } from '../fotografia';
import { FotografiaService } from '../fotografia.service';
import { ActivatedRoute, Router } from "@angular/router"


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  fotos: Fotografia[];
  user: String;
  upload = false;
  mupload = false;
  delete = false;

  constructor(
    private FotografiaService: FotografiaService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    if(!localStorage.getItem("currentUser")){
      this.router.navigate(['/login',{auth : false}]);
      return;
    }

    if (this.route.snapshot.paramMap.get('delete')) {
      this.delete = true;
    }

    if (this.route.snapshot.paramMap.get('mupload')) {
      this.upload = true;
      this.mupload = true;
    }

    if (this.route.snapshot.paramMap.get('upload')) {
      this.upload = true;
      this.mupload = false;
    }

    this.user = localStorage.getItem("currentUser");

    this.FotografiaService.getFotosUtilizador(this.user).subscribe(fotos => {
      this.fotos = fotos;
      
    });

  }
  
  hidePop(popup) {
    popup.setAttribute("style", "visibility: hidden;");
  }

}
