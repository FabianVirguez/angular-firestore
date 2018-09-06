import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public userNombre: string;
  public userEmail: string;
  public userPicture: string;
  public userId: string;
  public isLogin: boolean;
  constructor(
    public authService: AuthService
  ) { }
    

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true;
        this.userNombre = auth.displayName;
        this.userEmail = auth.email;
        this.userPicture = auth.photoURL;
      } else {
        this.isLogin = false;
      }
    })
  }

  onCheckUserLogin() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        console.log(auth);
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }

  onClickLogout() {
    this.authService.logout();
  }

}
