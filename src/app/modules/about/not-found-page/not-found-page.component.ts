import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from './../../../router.animations';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  animations: [routerTransition()]
})
export class NotFoundPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public goHome() {
    this.router.navigate(['./../home']);
  }

}
