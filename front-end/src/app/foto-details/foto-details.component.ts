import { Component, OnInit } from '@angular/core';
import { Fotografia } from '../fotografia';
import { Utilizador } from '../utilizador';
import { FotografiaService } from '../fotografia.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router"

@Component({
  selector: 'app-foto-details',
  templateUrl: './foto-details.component.html',
  styleUrls: ['./foto-details.component.css']
})
export class FotoDetailsComponent implements OnInit {

  foto: Fotografia;
  currentUser: string;
  like: boolean;
  favorite: boolean;
  utilizador: Utilizador;
  owner: boolean;

  constructor(
    private FotografiaService: FotografiaService,
    private route: ActivatedRoute,
	private router: Router,
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params.id;

	var currentUser = localStorage.getItem("currentUser");
	this.currentUser = currentUser;
	this.like = false;
	this.favorite = false;

    this.FotografiaService.getFoto(id).subscribe(foto => {
		this.foto = foto;

		if(!foto)
			return;

		this.owner = currentUser === foto.idUpload;

		this.FotografiaService.likeStatusFoto(this.foto, this.currentUser)
			.subscribe(res => {
				if(res)
				this.like = true;
		});

		this.FotografiaService.favoriteStatusFoto(this.foto, this.currentUser)
			.subscribe(res => {
				if(res)
				this.favorite = true;
		});

	});

  }

	getLink(){

		let elemento = document.getElementById("opcao");
		elemento.setAttribute("style", "display:none");

		var texto = window.location.href;
		const selectTextBox = document.createElement('textarea');
		//se nao usar isto ele puxa a pagina para baixo
		selectTextBox.style.position = 'fixed';
		selectTextBox.value = texto;
		document.body.appendChild(selectTextBox);
		//focar e selecionar o texto la inserido
		selectTextBox.focus();
		selectTextBox.select();
		//copiar o texto
		document.execCommand('copy');
		//remover do documento
		document.body.removeChild(selectTextBox);
		var popup = document.getElementsByClassName("linkPopUp").item(0);
		popup.setAttribute("style", "display: flex;");

		/* var ok = document.getElementById("ok");
		ok.addEventListener("click", (e: Event) => this.hideLinkPopUp()); */
	}

	likeFoto() {
		if(!localStorage.getItem("currentUser")){
			this.router.navigate(['/login',{auth : false}]);
			return;
		}
		if(!this.like){
			this.foto.listaLikes.push(this.currentUser);
			this.FotografiaService.likeFoto(this.foto, this.currentUser).subscribe();
		}
		else{
			var index = -1;
			for(var i = 0; i < this.foto.listaLikes.length; i++)
				if(this.foto.listaLikes[i] === this.currentUser)
					index = i;
			this.foto.listaLikes.splice(index, index + 1);
			this.FotografiaService.dislikeFoto(this.foto, this.currentUser).subscribe();
		}
		this.like = !this.like;
	}

	favoritaFoto() {
		
		if(!localStorage.getItem("currentUser")){
			this.router.navigate(['/login',{auth : false}]);
			return;
		}
		
		if(!this.favorite)
			this.FotografiaService.favoriteFoto(this.foto, this.currentUser).subscribe();
		else{
			this.FotografiaService.unfavoriteFoto(this.foto, this.currentUser).subscribe();
		}

		this.favorite = !this.favorite;
	}


	opcoes(){

		var opcoes = document.getElementById("opcao");

		// console.log((opcoes.getAttribute("style") === "display:none") or (opcoes.getAttribute("style") === null));

		if (opcoes.getAttribute("style") === "display:none" || (opcoes.getAttribute("style") === null)) {
			opcoes.setAttribute("style", "display:inline-block");
		}
		else {
			opcoes.setAttribute("style", "display:none");
		}

		
		
	}

	popUpDelete() {

		let elemento = document.getElementById("opcao");
		elemento.setAttribute("style", "display:none");

		let elemento2 = document.getElementsByClassName("popUp").item(0);
		elemento2.setAttribute("style", "display:inline-block");

	}

	deletePhoto(){

		this.FotografiaService.deleteFoto(this.foto._id).subscribe();
		this.router.navigate(['/profile', { delete: true }]);
	}

	close(){
		let elemento2 = document.getElementsByClassName("popUp").item(0);
		elemento2.setAttribute("style", "display:none");

		elemento2 = document.getElementById("opcao");
		elemento2.setAttribute("style", "display:none");
	}
	
	hideLinkPopUp(){
		let pop = document.getElementsByClassName("linkPopUp").item(0);
		pop.setAttribute("style", "display:none");
	}


}
