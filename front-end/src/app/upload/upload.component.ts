import { Component, Inject, OnInit } from '@angular/core';
import { Fotografia } from '../fotografia';
import { FormBuilder } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';

import { FotografiaService } from '../fotografia.service';
import { Router } from '@angular/router';
import { window } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  foto: Fotografia;
  fotoExceededSize = false;
  validFileExtension = true;

  @ViewChild('testeAAA', { static: true }) teste2: ElementRef;


  detailsPhotoForm = this.formBuilder.group({
    name: '',
    descricao: ''
  });
  largeName = false;
  largeDescription = false;
  erro = false;

  constructor(
    private formBuilder: FormBuilder,
    private FotografiaService: FotografiaService,
    private elementRef: ElementRef,
    private router: Router,
    @Inject(DOCUMENT) private _document: Document,
  ) { }

  ngOnInit(): void {

    if (!localStorage.getItem("currentUser")) {
			this.router.navigate(['/login', { auth: false }]);
			return;
		}

    let e = JSON.parse(localStorage.getItem("erros"));
    //console.log(e);
    
    if (e) {
      this.erro = true;
    }
    localStorage.removeItem("erros");

    this.foto = {} as Fotografia;
    var cancelar = document.getElementById("cancelar");
    cancelar.addEventListener("click", (e: Event) => this.escreverDescrição());

    var confirmar = document.getElementById("confirmar");
    confirmar.addEventListener("click", (e: Event) => this.confirmarFoto());

    // var erroOk = document.getElementById("erroOk");
    // erroOk.addEventListener("click", (e: Event) => this.hidePop(1));

    /* var sucessoOk = document.getElementById("sucessoOk");
    sucessoOk.addEventListener("click", (e: Event) => this.hidePop(2)); */

  }

  //  ngAfterViewInit() {
  //   this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = "rgb(247, 247, 247)";
  // } 

  savePicture() {

    let teste = document.querySelector("#photo img") as HTMLElement;
    teste.setAttribute("style", "display: none;");

    teste = document.querySelector("#photo button") as HTMLElement;
    teste.setAttribute("style", "display: none;");

    teste = document.querySelector("#par") as HTMLElement;
    teste.setAttribute("style", "display: inline;");

    const file = (event.target as HTMLInputElement).files[0];

    const Reader = new FileReader();

    if(!file.type.startsWith("image/")){
      this.foto.image = "";
      this.validFileExtension = false;
      return;
    }
    
    this.validFileExtension = true;

    Reader.readAsDataURL(file);

    Reader.onload = (res) => {

      if(res?.loaded > 100000){
        this.foto.image = "";
        this.fotoExceededSize = true;
        return;
      }

      this.fotoExceededSize = false;
        
      this.foto.nome = file.name.replace(/\.[^/.]+$/, "");
      this.foto.image = Reader.result as string;
    }

  }

  onSubmit() {

    this.largeName = false;
    this.largeDescription = false;


    var name = this.detailsPhotoForm.value.name;

    var desc = this.detailsPhotoForm.value.descricao;

    this.foto.idUpload = localStorage.getItem("currentUser");

    if (name) {
      this.foto.nome = name;
    }

    if (this.foto.nome.length > 100 || desc.length > 500) {
      if (this.foto.nome.length > 100)
        this.largeName = true;

      if (desc.length > 500)
        this.largeDescription = true;

      return;
    }


    if (!desc) {
      var popup = document.getElementsByClassName("popup").item(0);
      popup.setAttribute("style", "visibility: visible;");
      return;

    }
    else {
      this.foto.descricao = desc;
    }

	this.foto.listaLikes = [];

    this.FotografiaService.uploadFoto(this.foto).subscribe(res => {
      

      if(res === null){
        this.router.navigate(['/profile', { upload: true }]);
        return;
      }
      else{
        localStorage.setItem("erros", JSON.stringify("erro"));

        // var popup = document.getElementsByClassName("popup").item(1);
        // popup.setAttribute("style", "visibility: visible;");

        this.cancelarUpload();
      }
      
    });
    
    
  }

/*
  teste() {
    var testebutao = document.getElementById("picture");
    testebutao.trig
  }*/

  escreverDescrição() {

    var popup = document.getElementsByClassName("popup").item(0);
    popup.setAttribute("style", "visibility: hidden;");

  }

  confirmarFoto() {

    var popup = document.getElementsByClassName("popup").item(0);
    popup.setAttribute("style", "visibility: hidden;");

    this.FotografiaService.uploadFoto(this.foto).subscribe(res => {

      if(res === null){
        this.router.navigate(['/profile', { upload: true }]);
        return;
      }
      else{
        localStorage.setItem("erros", JSON.stringify("erro"));

        // var popup = document.getElementsByClassName("popup").item(1);
        // popup.setAttribute("style", "visibility: visible;");
        this.cancelarUpload();
      }
        
        
    });

   
  }

  cancelarUpload(): void {

    this._document.defaultView.location.reload();

    // this.teste2.nativeElement.value = '';
    // this.foto = {} as Fotografia;

    // this.detailsPhotoForm.reset();

    // let teste = document.querySelector("#photo img") as HTMLElement;
    // teste.setAttribute("style", "display: inline;");

    // teste = document.querySelector("#photo button") as HTMLElement;
    // teste.setAttribute("style", "display: inline;");

    // teste = document.querySelector("#par") as HTMLElement;
    // teste.setAttribute("style", "display: none;");

  }

  hidePop(popupIndex) {
    var popup = document.getElementsByClassName("popup").item(popupIndex);
    popup.setAttribute("style", "visibility: hidden;");
  }

}
