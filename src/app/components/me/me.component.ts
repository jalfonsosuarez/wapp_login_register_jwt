import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { Me } from './me.interface';


@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  user: any;

  constructor( private api: ApiService,
               private router: Router ) { }

  ngOnInit(): void {

    if ( localStorage.getItem( 'tokenJWT' ) !== null ) {

      this.api.getMe()
          .pipe(take(1))
          .subscribe( ( result: Me ) => {
            if (result.status ) {
              this.user = result.user;
              console.log(this.user);
            } else {
              this.logOut();
            }
          });

    } else {
      this.logOut();
    }

  }

  logOut(): void {
    localStorage.removeItem( 'tokenJWT' );
    this.router.navigate( [ '/login' ] );
  }

}
