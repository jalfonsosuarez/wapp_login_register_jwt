import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { Me } from '../../me/me.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  access: boolean;

  constructor( private auth: AuthService,
               private router: Router  ) {

    this.auth.accessVar$
             .subscribe( ( data: boolean ) => {

                if( !data && this.access ) {
                  this.access = false;
                  this.logOut();
                } else {
                  this.access = data;
                }
             });
  }

  ngOnInit(): void {

    if ( localStorage.getItem( 'tokenJWT' ) !== null ) {

      this.auth.getMe()
          .pipe(take(1))
          .subscribe( ( result: Me ) => {
            if (result.status ) {
              this.access = true;
            } else {
              this.access = false;
            }
          });

    } else {
      this.access = false;
    }
  }

  logOut(): void {
    this.auth.updateStateSesion(false);
    localStorage.removeItem( 'tokenJWT' );
    this.router.navigate( [ '/login' ] );
  }

}


