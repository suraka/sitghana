import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from './../../../router.animations';

import { TransactionService, SearchService, SettingsService } from './../../../core/services';

import { Transaction } from './../../../core/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routerTransition()]
})
export class HomeComponent implements OnInit {

  public transactions: Observable<any[]>;
  public pagedItemsCount: number;
  public categorize: string;

  constructor(
    public transactionService: TransactionService,
    public route: ActivatedRoute,
    public router: Router,
    public searchService: SearchService,
    public settingsService: SettingsService
  ) {}

  ngOnInit() {
    // this.getAds();
  }

  /* getAds(): void {
    this.ads = this.adService.getAds();
    this.ads.subscribe( (size) => this.pagedItemsCount = size.length );
  } */

  /* setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) { return; }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allAds.length, page, this.settingsService.pageSize);
    // get current page of items
    this.pagedItems = this.allAds.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.pagedItemsCount = this.pagedItems.length;
  } */

}
