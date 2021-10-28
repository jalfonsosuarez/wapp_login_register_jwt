import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { Me } from '../me/me.interface';
import { LoginData, LoginResult } from './login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user: LoginData = {
    email: '',
    password: ''
  };

  error: boolean;
  show: boolean;

  constructor( private api: ApiService,
               private router: Router ) { }

  ngOnInit(): void {
    if ( localStorage.getItem( 'tokenJWT' ) !== null ) {

      this.api.getMe()
          .pipe(take(1))
          .subscribe( ( result: Me ) => {
            if ( result.status ) {
              this.user = result.user;
              this.router.navigate( [ '/me' ] );
            }
          });

    }
  }

  save(): void {
    this.show = true;
    this.api.login( this.user.email, this.user.password )
        .pipe(take(1))
        .subscribe( ( result: LoginResult ) => {
          this.error = !result.status;
          if ( this.error ) {
            localStorage.removeItem( 'tokenJWT' );
          } else {
            localStorage.setItem( 'tokenJWT', result.token );
            this.router.navigate( [ '/me' ] );
          }
        });
  }

}
