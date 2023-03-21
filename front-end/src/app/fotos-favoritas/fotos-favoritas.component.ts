import { Component, OnInit } from '@angular/core';
import { Fotografia } from '../fotografia';
import { FotografiaService } from '../fotografia.service';
import { Router } from "@angular/router";

@Component({
	selector: 'app-fotos-favoritas',
	templateUrl: './fotos-favoritas.component.html',
	styleUrls: ['./fotos-favoritas.component.css']
})
export class FotosFavoritasComponent implements OnInit {

	currentUser: string;
	fotosFavoritas: Fotografia[];

	constructor(
		private fotografiaService: FotografiaService,
		private router: Router,
	) { }

	ngOnInit(): void {

		if (!localStorage.getItem("currentUser")) {
			this.router.navigate(['/login', { auth: false }]);
			return;
		}

		var currentUser = localStorage.getItem('currentUser');
		this.currentUser = currentUser;

		this.getFotosFavoritadas();
	}


	getFotosFavoritadas(): void {
		this.fotografiaService.getFotosFavoritasUtilizador(this.currentUser)
			.subscribe(fotosFavoritas => {
				this.fotosFavoritas = fotosFavoritas
			}
			);
	}

}
