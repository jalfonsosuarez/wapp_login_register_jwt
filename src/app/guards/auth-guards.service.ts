import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardsService implements CanActivate{

  constructor( private router: Router ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if ( localStorage.getItem( 'tokenJWT' ) !== null ) {
      return true;
    }
    this.router.navigate( [ '/login' ] );
    return false;
  }

}
