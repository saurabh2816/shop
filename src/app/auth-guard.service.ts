import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { map } from 'rxjs-compat/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private auth: AuthService, private router: Router) { }
  flag: boolean; 

  canActivate(route, state: RouterStateSnapshot) {

    this.auth.user$.subscribe( user => {
      if(user) 
        this.flag = true;
     
      else {
        this.router.navigate(['/login'], {queryParams: { returnUrl: state.url}});
        this.flag = false;
      }
    });

    return this.flag; 
  }
}
