import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Me } from '../components/me/me.interface';
import { meData } from '../operations/query';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public accessVar = new Subject<boolean>();
  public accessVar$ = this.accessVar.asObservable();

  public userVar = new Subject<Me>();
  public userVar$ = this.userVar.asObservable();


  constructor( private apollo: Apollo,
               private router: Router ) { }

  private sincroValues(  result: Me, state: boolean ) {
    this.updateStateSesion( state );
    this.updateUser( result );
  }

  start() {

    if ( localStorage.getItem( 'tokenJWT' ) !== null ) {

      this.getMe()
          .pipe(take(1))
          .subscribe( ( result: Me ) => {
            if (result.status ) {
              if ( this.router.url === '/login' ) {
                this.sincroValues( result, true );
                this.router.navigate( [ '/me' ] );
              }
            }
            this.sincroValues( result, result.status );
          });
    } else {
      this.sincroValues( null, false );
    }

  }

  public updateStateSesion( newValue: boolean ): void {
    this.accessVar.next( newValue );
  }

  public updateUser( user: Me ): void {
    this.userVar.next( user );
  }

  logOut(): void {
    this.updateStateSesion(false);
    localStorage.removeItem( 'tokenJWT' );
    const currentRouter = this.router.url;
    if ( currentRouter !== '/register' && currentRouter !== '/users' ) {
      this.router.navigate( [ '/login' ] );
    }
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
