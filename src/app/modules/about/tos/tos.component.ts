import { Component, OnInit } from '@angular/core';
import { routerTransition } from './../../../router.animations';

@Component({
  selector: 'app-tos',
  templateUrl: './tos.component.html',
  styleUrls: ['./tos.component.scss'],
  animations: [routerTransition()]
})
export class TosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
