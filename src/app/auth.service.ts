import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import { AppUser } from './models/app-user';

@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;
  
  constructor(
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute, 
    private router: Router,  
    private userService: UserService) { 
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

  }

  logout() {
    this.afAuth.signOut();
  }

  // from the firebase observable user get the user object from db
  get appUser$(): Observable<AppUser> {
    return this.user$.
    switchMap( user => this.userService.get(user.uid).valueChanges() )
  }
}
