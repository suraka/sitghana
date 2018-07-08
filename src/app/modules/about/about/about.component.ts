import { Component, OnInit } from '@angular/core';
import { routerTransition } from './../../../router.animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [routerTransition()]
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
