import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routerTransition } from './../../../router.animations';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  animations: [routerTransition()]
})
export class SubscriptionComponent implements OnInit {

  package: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params) => {
      // Defaults to 0 if no query param provided.
      this.package = decodeURI(params['package']);
    });
  }

}
