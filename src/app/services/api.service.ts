import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getUsers, login, meData } from '../operations/query';

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

  getMe(): Observable<any> {
    return this.apollo
    .watchQuery(
      {
        query: meData,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders( {
            autorization: localStorage.getItem( 'tokenJWT' )
          })
        }
      }
    ).valueChanges.pipe(
      map( ( result: any ) => {
        return result.data.me;
      })
    );
  }

}
