import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Me } from './me.interface';


@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  user: any;

  constructor( private router: Router,
               private auth: AuthService ) { }

  ngOnInit(): void {

    if ( localStorage.getItem( 'tokenJWT' ) !== null ) {

      this.auth.getMe()
          .pipe(take(1))
          .subscribe( ( result: Me ) => {
            if (result.status ) {
              this.user = result.user;
            } else {
              this.logOut();
            }
          });

    } else {
      this.logOut();
    }

  }

  logOut(): void {
    this.auth.updateStateSesion(false);
    localStorage.removeItem( 'tokenJWT' );
    this.router.navigate( [ '/login' ] );
  }

}
