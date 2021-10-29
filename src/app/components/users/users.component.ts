import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from './user.interface';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs/operators';
import { Me } from '../me/me.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor( private api: ApiService,
               private auth: AuthService ) { }

  ngOnInit(): void {
    this.auth.start();
    this.api.getUsers().subscribe( ( result ) => {
        this.users = result;
    });
  }

}
