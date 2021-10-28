import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  constructor( private api: ApiService,
               private router: Router ) { }

  ngOnInit(): void {

    if ( localStorage.getItem( 'tokenJWT' ) !== null ) {

      this.api.getMe()
          .pipe(take(1))
          .subscribe( ( result ) => {
            console.log( result );
          });

    } else {
      this.router.navigate( [ '/login' ] );
    }

  }

}
