import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
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

  constructor( private api: ApiService ) { }

  ngOnInit(): void {
  }

  save(): void {
    this.api.login( this.user.email, this.user.password )
        .pipe(take(1))
        .subscribe( ( result: LoginResult ) => {
          this.error = !result.status;
          if ( this.error ) {
            localStorage.removeItem( 'tokenJWT' );
          } else {
            localStorage.setItem( 'tokenJWT', result.token );
          }
        });
  }

}
