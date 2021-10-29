import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
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
               private router: Router,
               private auth: AuthService ) { 

    this.auth.userVar$
        .subscribe( (data: Me ) => {
          if ( data === null || !data.status ) {
            this.show = true;
          } else {
            this.show = false;
          }
        });
  }

  ngOnInit(): void {
    this.auth.start();
  }

  save(): void {
    this.show = true;
    this.api.login( this.user.email, this.user.password )
        .pipe(take(1))
        .subscribe( ( result: LoginResult ) => {
          this.error = !result.status;
          if ( this.error ) {
            this.auth.updateStateSesion(false);
            localStorage.removeItem( 'tokenJWT' );
          } else {
            this.auth.updateStateSesion(true);
            localStorage.setItem( 'tokenJWT', result.token );
            this.router.navigate( [ '/me' ] );
          }
        });
  }

}
