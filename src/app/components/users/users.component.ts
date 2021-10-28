import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from './user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor( private api: ApiService ) { }

  ngOnInit(): void {
    this.api.getUsers().subscribe( ( result ) => {
        this.users = result;
    });
  }

}
