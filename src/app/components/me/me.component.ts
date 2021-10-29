import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Me } from './me.interface';


@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  user: any;

  constructor( private auth: AuthService ) {
    this.auth.userVar$
    .subscribe( (data: Me ) => {
      if ( data !== null && data !== undefined ) {
        this.user = data.user;
      }
    });
  }

  ngOnInit(): void {
    this.auth.start();
  }

  logOut(): void {
    this.auth.logOut();
  }

}
