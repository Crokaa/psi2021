import { Component, OnInit } from '@angular/core';
import { Fotografia } from '../fotografia';
import { FotografiaService } from '../fotografia.service';
import { Router } from "@angular/router";


@Component({
	selector: 'app-fotos-recentes',
	templateUrl: './fotos-recentes.component.html',
	styleUrls: ['./fotos-recentes.component.css']
})
export class FotosRecentesComponent implements OnInit {

	currentUser: string;
	fotosRecentes: Fotografia[];
	recentes = true;

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

		this.getFotosMaisRecentes();
	}


	getFotosMaisRecentes(): void {
		this.fotografiaService.getFotosMaisRecentes()
			.subscribe(fotosRecentes => {
				this.fotosRecentes = fotosRecentes
			}
			);
	}


	ordenarFotos(event: any): void {
		var value = event.target.value;
		
		if (value === "recentes") {
			this.recentes = true;
			this.fotografiaService.getFotosMaisRecentes()
				.subscribe(fotosRecentes => {
					this.fotosRecentes = fotosRecentes;
				}
				);
		}
		else if (value === "gostos") {
			this.recentes = false;
			this.fotografiaService.getFotosMaisGostos()
				.subscribe(fotosRecentes => {
					
					this.fotosRecentes = fotosRecentes;
				}
				);
		}

	}
}
