import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { meData } from '../operations/query';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public accessVar = new Subject<boolean>();
  public accessVar$ = this.accessVar.asObservable();

  constructor( private apollo: Apollo) { }

  public updateStateSesion( newValue: boolean ) {
    this.accessVar.next( newValue );
  }

  getMe(): Observable<any> {
    return this.apollo
    .watchQuery(
      {
        query: meData,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders( {
            authorization: localStorage.getItem( 'tokenJWT' )
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
