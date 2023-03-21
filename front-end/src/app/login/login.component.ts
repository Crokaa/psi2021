import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router"
import { Utilizador } from '../utilizador';
import { UtilizadorService } from '../utilizador.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  utilizador: Utilizador;
  validLogin = true;
  emptyLoginFields = false;

  loginForm = this.formBuilder.group({
    nickname: '',
    password: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private UtilizadorService: UtilizadorService,
    private router: Router,
    private elementRef: ElementRef,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    if (this.route.snapshot.paramMap.get('auth')) {
      var popup = document.getElementsByClassName("popup").item(0);
      popup.setAttribute("style", "visibility: visible;");
      var confirmar = document.getElementById("loginWarning");
      confirmar.addEventListener("click", (e: Event) => this.hidePop(popup));
    }

    if (this.route.snapshot.paramMap.get('clear')) {
      localStorage.removeItem("currentUser");
    }


  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = "rgb(208, 230, 231)";
  }

  hidePop(popup) {
    popup.setAttribute("style", "visibility: hidden;");
  }

  onSubmit(): void {

    var nickname = this.loginForm.value.nickname;
    var password = this.loginForm.value.password;

    if (!nickname || !password) {
      this.emptyLoginFields = true;
      this.validLogin = true;
      return;
    }

    this.emptyLoginFields = false;

    this.UtilizadorService.getUtilizador(nickname)
      .subscribe(utilizador => {
        this.utilizador = utilizador;

        if (utilizador && utilizador.pass === password) {
          this.validLogin = true;

          localStorage.setItem('currentUser', utilizador.nickname);
          //localStorage.setItem('currentUser', JSON.stringify(utilizador));

          //this.currentUser.addCurrentUser(utilizador);

          if (utilizador.fotografias.length !== 0) {
            this.router.navigate(['/profile'])
          }
          else {

            //temporario
            this.router.navigate(['/feed'])
            //this.router.navigate(['/browse'])
          }

          //localStorage.removeItem('currentUser')
        }
        else {
          this.validLogin = false;
        }
      });
  }
}

