import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getUsers, login, meData } from '../operations/query';
import { RegisterData } from '../components/register/register.interface';
import { registerdata } from '../operations/mutation';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private apollo: Apollo) { }

  getUsers(): Observable<any> {
    return this.apollo
        .watchQuery(
          {
            query: getUsers,
            fetchPolicy: 'network-only'
          }
        ).valueChanges.pipe(
          map( ( result: any ) => {
            return result.data.users;
          })
        );
  }

  login( email: string, password: string ): Observable<any> {
    return this.apollo
    .watchQuery(
      {
        query: login,
        variables: {
          email,
          password
        },
        fetchPolicy: 'network-only'
      }
    ).valueChanges.pipe(
      map( ( result: any ) => {
        return result.data.login;
      })
    );
  }

  register( user: RegisterData ) {
    return this.apollo
        .mutate( {
          mutation: registerdata,
          variables: {
            user
          }
        });
  }
}
