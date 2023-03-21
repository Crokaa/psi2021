import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Fotografia } from '../fotografia';
import { FotografiaService } from '../fotografia.service';
import { ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from "@angular/router";
import { __await } from 'tslib';
import { forkJoin } from 'rxjs';
import { Observable, of, from } from 'rxjs';

@Component({
  selector: 'app-multiple-upload',
  templateUrl: './multiple-upload.component.html',
  styleUrls: ['./multiple-upload.component.css']
})
export class MultipleUploadComponent implements OnInit {

  @ViewChild('selecionarPasta', { static: true }) pasta: ElementRef;

  detailsPhotoForm = this.formBuilder.group({
    descricao: ''
  });

  fotos: Fotografia[];

  fotoAtual: Fotografia;

  numFicheirosNotImages = 0;
  ficheirosMaisMax: String[]

  index = -1;

  largeDescription: boolean;
  numTotalFicheiros: number;
  todosFicheirosNotViaveis: boolean;
  erros: String[];
  numCarateres = 0;

  constructor(
    private FotografiaService: FotografiaService,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  ngOnInit(): void {

    if(!localStorage.getItem("currentUser")){
      this.router.navigate(['/login',{auth : false}]);
      return;
    }
    
    document.getElementById("confirmar").addEventListener("click", (e: Event) => this.publicarFotos());
    document.getElementById("escreverDescricao").addEventListener("click", (e: Event) => this.mostrarDescricoes());

    this.erros = JSON.parse(localStorage.getItem("erros"));

    localStorage.removeItem("erros");

  }



  mostrarDescricoes(): any {

    var e = document.getElementById("todo-poderoso");
    e.setAttribute("style", "opacity: 1;");
    var elemento;

    elemento = document.getElementById("descricaoIndividual");
    elemento.setAttribute("style", "visibility: visible;");

    elemento = document.getElementById("todo-poderoso");
    elemento.setAttribute("style", "display: none;");

    elemento = document.getElementsByClassName("popup").item(0);
    elemento.setAttribute("style", "display: none;");

    this.index = this.index + 1;
    this.fotoAtual = this.fotos[this.index];

  }



  escreverDescricoes(): any {


    this.largeDescription = false;

    var desc = this.detailsPhotoForm.value.descricao;




    if (desc && desc.length > 500) {
      this.largeDescription = true;
      this.numCarateres = desc.length;
      return;
    }

    this.numCarateres = 0;



    this.fotoAtual.descricao = desc;

    this.fotos[this.index] = this.fotoAtual;

    var elemento;
    this.index = this.index + 1;

    if (this.index == this.fotos.length - 1) {
      elemento = document.getElementById("proximaFoto");
      elemento.setAttribute("style", "display: none;");

      elemento = document.querySelector("form #publicarTodas");
      elemento.setAttribute("style", "display: inline-block;");
    }

    if (this.index == this.fotos.length) {
      this.publicarFotos();
      return;
    }


    this.fotoAtual = this.fotos[this.index];
    this.detailsPhotoForm.reset();

  }


  publicarFotos() {

    var e = document.getElementById("todo-poderoso");
    e.setAttribute("style", "opacity: 0.2;");

    console.log(this.fotos);

    this.erros = [];

    console.log("Enviou fotos");

    this.loopFotos().subscribe(res => {
      console.log("dentro subscribe com resultado de todas");

      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        console.log(element);
        if (element !== null){
          console.log("é erro");
          this.erros.push(this.fotos[index].nome);
        }
      }

      console.log(this.erros);
      

      if (this.erros.length === 0) {
        this.router.navigate(['/profile', { mupload: true }]);
        return;
      }
       //REDIRECIONAR PRO PERFIL
      
      localStorage.setItem("erros", JSON.stringify(this.erros));
      this.limparUpload();

    });

  }

  loopFotos() {
    let observableBatch = [];

    this.fotos.forEach((foto) => {
      observableBatch.push(this.FotografiaService.uploadFoto(foto));
    });

    return forkJoin(observableBatch);
  }


  savePictures(event: any) {


    var elemento;
    this.numFicheirosNotImages = 0;
    this.ficheirosMaisMax = [];
    this.numTotalFicheiros = 0;
    this.todosFicheirosNotViaveis = false;
    this.fotos = [];
    this.fotoAtual = null;

    elemento = document.querySelector("#par") as HTMLElement;
    elemento.setAttribute("style", "display: inline;");

    elemento = document.querySelector("label") as HTMLElement;
    elemento.setAttribute("style", "display: none;");

    elemento = document.querySelector("#labelP") as HTMLElement;
    elemento.setAttribute("style", "display: none;");



    for (let file of Array.from(event.target.files)) {
      this.numTotalFicheiros = this.numTotalFicheiros + 1;

      let reader = new FileReader();
      let foto = {} as Fotografia;

      let fileO = file as File;

      if (!fileO.type.startsWith("image/")) {
        this.numFicheirosNotImages = this.numFicheirosNotImages + 1;
        break;
      }

      reader.readAsDataURL(file as File);


      reader.onload = (res) => {

        if (res?.loaded > 100000) {
          this.ficheirosMaisMax.push(fileO.name);
          return;
        }


        foto.idUpload = localStorage.getItem("currentUser");
        foto.nome = (file as File).name.replace(/\.[^/.]+$/, "");
        foto.image = reader.result as string;
        this.fotos.push(foto);
      };

    }

    this.todosFicheirosNotViaveis = this.numTotalFicheiros === (this.numFicheirosNotImages + this.ficheirosMaisMax.length);
  }


  confirmarPublicacao() {
    var e = document.getElementById("todo-poderoso");
    e.setAttribute("style", "opacity: 0.2;");

    var popup = document.getElementsByClassName("popup").item(0);

    popup.setAttribute("style", "display: flex;");


  }



  limparUpload(): void {

    this._document.defaultView.location.reload();


    //  this.fotos = [];

    //   this.detailsPhotoForm.reset();

    //   var elemento;

    //   elemento = document.getElementById("descricaoIndividual");
    //   elemento.setAttribute("style", "visibility: hidden;");

    //   elemento = document.getElementById("todo-poderoso");
    //   elemento.setAttribute("style", "display: flex;");

    //   // elemento = document.getElementById("botaoPublicar");
    //   // elemento.setAttribute("style", "visibility: hidden;");



    //   elemento = document.getElementById("labelP");
    //   elemento.setAttribute("style", "display:inline-block;");

    //   elemento = document.querySelector("label") as HTMLElement;
    //   elemento.setAttribute("style", "display: inline-block;");

    //   elemento = document.querySelector(".botoes") as HTMLElement;
    //   elemento.setAttribute("style", "display: none;");

    //   elemento = document.querySelector(".popup") as HTMLElement;
    //   elemento.setAttribute("style", "display: none;");


    //   this.numFicheirosNotImages = 0;
    //   this.ficheirosMaisMax = []

    //   this.index = -1;

    //   this.numTotalFicheiros = 0;
    //   this.todosFicheirosNotViaveis = false;

    //   this.fotoAtual = null;
    //   this.fotos = null;



  }



}


