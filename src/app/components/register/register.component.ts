import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Me } from '../me/me.interface';
import { RegisterData } from './register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error: boolean;

  register: RegisterData = {
    name: '',
    lastName: '',
    email: '',
    password: '',
  };

  constructor( private auth: AuthService,
               private api: ApiService ) { }

  ngOnInit(): void {
    if ( localStorage.getItem( 'tokenJWT' ) !== null ) {
      this.auth.getMe()
          .pipe(take(1))
          .subscribe( ( result: Me ) => {
            if ( result.status ) {
              this.auth.updateStateSesion( true );
            } else {
              this.auth.updateStateSesion( false );
            }
          });
    } else {
      this.auth.updateStateSesion( false );
    }
  }

  save(): void {
    this.api.register( this.register )
      .subscribe( ( data ) => {
        console.log(data);
      },
      (error) => {
        console.log('Error mutation ', error );
      });
  }

}
