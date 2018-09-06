import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
    public email: string;
    public password: string;
    public password1: string;
    public forma: FormGroup;
    constructor(
        public authService: AuthService,
        public router: Router,
        public flashMessage: FlashMessagesService,
        public _formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.forma = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            password1: ['', [Validators.required]],
        });
    }

    passwordsMatch = (_form: FormGroup): boolean => {
        if (_form.controls['password'].touched && _form.controls['password1'].touched) {
            if (_form.value.password === _form.value.password1) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    }

    verifyPasswords = (_field: string, _form: FormGroup): any => {
        let result = false;
        if (!this.passwordsMatch(_form) || !this.isFieldValid(_field, _form)) {
            result = true;
        }
        return { 'is-invalid': result };
    }

    verifyValid = (_field: string, _form: FormGroup): any => {
      let valid = false;
      if (_form.get(_field).invalid && _form.get(_field).touched) {
          valid = true;
      }
        return { 'is-invalid': valid };
    }

    isFieldValid(_field: string, _form: FormGroup): boolean {
        let valid = true;
        if (_form.get(_field).invalid && _form.get(_field).touched) {
            valid = false;
        }
        return valid;
    }

    onSubmitAddUser() {
        this.authService.registerUser(this.email, this.password)
            .then((res) => {
                this.flashMessage.show('Usuario registrado correctamente',
                    { cssClass: 'alert-warning', timeout: 4000 });
                console.log('Registro ok');
                console.log(res);
                this.router.navigate(['/privado']);
            }).catch((err) => {
                this.flashMessage.show(err.message,
                    { cssClass: 'alert-danger', timeout: 4000 });
                console.log(err);
            });
    }

}
