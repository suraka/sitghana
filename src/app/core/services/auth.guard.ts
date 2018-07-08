import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService} from './auth.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user
    .take(1)
    .map(user => !!user)
    .do(loggedIn => {
      if (!loggedIn) {
        this.router.navigate(['./../login']);
        this.showInfo();
      }
  });
  }

  private showInfo() {
    this.toastr.info(
      'Sorry, your login was not successfully. Please try again. Thank you!',
      'Access Denied!',
      { timeOut: 7000 }
    );
  }
}
