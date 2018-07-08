import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { TransactionService, SubscriptionService } from './../../../core/services';
import { Observable } from 'rxjs/Observable';

import {
  Business,
  Transaction,
  Notification,
  nature,
  assets,
  fixedAssets,
  currentAssets,
  liabilities,
  currentLiabilities,
  longTermLiabilities,
  equity,
  expenses,
} from './../../../core/models';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public nature = nature;
  public assets = assets;
  public fixedAssets = fixedAssets;
  public currentAssets = currentAssets;
  public liabilities = liabilities;
  public currentLiabilities = currentLiabilities;
  public longTermLiabilities = longTermLiabilities;
  public expenses = expenses;
  entry: Transaction = {
    date: '',
    description: '',
    nature: '',
    category: '',
    cashPayment: false,
    creditPayment: false,
    qty: null,
    price: null,
    created: new Date().getTime(),
    updated: new Date().getTime(),
  };
  private uid: string;
  private bid: string;
  public businesses: Business[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public subscriptionService: SubscriptionService,
    private transactionServices: TransactionService,
  ) {
    this.route.queryParams.subscribe(
      (params) => {
      // Defaults to 0 if no query param provided.
      this.uid = decodeURI(params['id']);
      this.bid = decodeURI(params['bid']);
    });
  } // public activeModal: NgbActiveModal

  ngOnInit() {
    this.subscriptionService.getBusinessData().subscribe(
      (businesses) => {
        this.businesses = businesses;
      }
    );
  }

  onSubmit() {
    if (this.entry.date !== '' && this.entry.description !== '') {
      this.transactionServices.addTransaction(this.entry);
    }

    this.entry.date = '';
    this.entry.description = '';
    this.entry.nature = '';
    this.entry.cashPayment = false;
    this.entry.creditPayment = false;
    this.entry.qty = null;
    this.entry.price = null;
  }

  /* closeModal() {
    this.activeModal.close('Modal Closed');
  } */
}
