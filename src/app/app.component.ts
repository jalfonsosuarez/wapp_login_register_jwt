import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'loginRegisterJWT';

  constructor( private api: ApiService ) {

  }

  ngOnInit(): void {

    // this.api.getUsers().subscribe( ( result ) => {
    //       console.log( result );
    //     });

    // this.api.login( 'joseasuarez@gmail.com', '123456' ).subscribe( ( result ) => {
    //     console.log( result );
    //   });

    // this.api.getMe('').subscribe( ( result ) => {
    //   console.log( result );
    // });

  }

}
