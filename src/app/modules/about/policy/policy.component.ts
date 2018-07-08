import { Component, OnInit } from '@angular/core';
import { routerTransition } from './../../../router.animations';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
  animations: [routerTransition()]
})
export class PolicyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
