import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public email: string;
  public password: string;
  constructor(
    public autService: AuthService,
    public router: Router,
    public flashMessage: FlashMessagesService
  ) {
   }

  ngOnInit() {
  }

  onClickGoogleLogin() {
    this.autService.loginGoogle()
    .then((res) => {
      this.flashMessage.show('Usuario Autenticado con Exito', 
      {cssClass: 'alert-warning', timeout: 4000});
      this.router.navigate(['/privado']);
      console.log(res);
    }).catch(err => {
      this.flashMessage.show(err.message, 
      {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['/login']);
      console.log(err);
    });
  }

  onSubmitLogin() {
    this.autService.loginEmail(this.email, this.password)
    .then((res) => {
      this.flashMessage.show('Usuario Autenticado con Exito', 
      {cssClass: 'alert-warning', timeout: 4000});
      this.router.navigate(['/privado']);
    }).catch((err) => {
      this.flashMessage.show(err.message, 
      {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['/login']);
      console.log(err);
    });
  }

}
