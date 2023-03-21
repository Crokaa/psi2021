import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {Router} from "@angular/router"

import { Utilizador } from '../utilizador';
import { UtilizadorService } from '../utilizador.service';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styleUrls: ['./registo.component.css']
})
export class RegistoComponent implements OnInit {

  utilizador: Utilizador;
  nameLength = true;
  nameValid = true;
  passwordLength = true;
  passwordValid = true;
  passwordUpperCase = true;
  passwordLowerCase = true;
  passwordDigit = true;
  nicknameExists = false;

  registerForm = this.formBuilder.group({
    nickname: '',
    password: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private UtilizadorService: UtilizadorService,
    private router: Router
  ) { }


  ngOnInit(): void {

  }

  onSubmit(): void {

    this.nicknameExists = false;

    if (!this.registerForm.value.nickname || this.registerForm.value.nickname.length < 3) {
      this.nameLength = false;
    } else
      this.nameLength = true;

    if (this.registerForm.value.nickname.match("^[A-Za-z0-9]+$")) {
      this.nameValid = true;
    }
    else {
      this.nameValid = false;
    }

    if (!this.registerForm.value.password || this.registerForm.value.password.length < 8) {
      this.passwordLength = false;
    } else
      this.passwordLength = true;

    var upperCase = "(?=.*[A-Z])";
    var lowerCase = "(?=.*[a-z])";
    var digit = "(?=.*[0-9])";

    if (!this.registerForm.value.password.match(upperCase)) {
      this.passwordUpperCase = false;
    }
    else
      this.passwordUpperCase = true;

    if (!this.registerForm.value.password.match(lowerCase)) {
      this.passwordLowerCase = false;
    }
    else
      this.passwordLowerCase = true;

    if (!this.registerForm.value.password.match(digit)) {
      this.passwordDigit = false;
    }
    else
      this.passwordDigit = true;

    if (this.nameLength && this.nameValid && this.passwordUpperCase
      && this.passwordLowerCase && this.passwordDigit) {

      this.UtilizadorService.getUtilizador(this.registerForm.value.nickname)
        .subscribe(utilizador => {
          this.utilizador = utilizador;
          if (utilizador) {
            this.nicknameExists = true;
          }
          else {
            this.UtilizadorService.addUtilizador({ nickname: this.registerForm.value.nickname, pass: this.registerForm.value.password } as Utilizador)
            .subscribe(utilizador => {

              this.utilizador = utilizador;
              localStorage.setItem('currentUser', this.utilizador.nickname);
              this.router.navigate(['/feed'])
            });
          }
        });
    }
  }
}

