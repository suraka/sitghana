import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

import { SettingsService, SubscriptionService } from './../../../core/services';
import { Setting, Business, Subscription } from './../../../core/models';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from './../../../router.animations';

const businessCategories = [
  'Agriculture',
  'Arts, crafts, and collectibles',
  'Beauty and fragrances',
  'Books and magazines',
  'Clothing, accessories, and shoes',
  'Computers, accessories, and services',
  'Education',
  'Electronics and telecom',
  'Entertainment and media',
  'Financial services and products',
  'Food retail and service',
  'Government',
  'Gifts and flowers',
  'Health and personal care',
  'Home and garden',
  'Nonprofit Organization',
  'Pets and animals',
  'Production, Trading',
  'Religion and spirituality',
  'Retail',
  'Services - other',
  'Sports and outdoors',
  'Toys and hobbies',
  'Travel',
  'Vehicle sales',
  'Vehicle service and accessories'
];

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  animations: [routerTransition()]
})
export class PaymentComponent implements OnInit {

  entry: Business = {
    businessName: '',
    phone: '',
    category: '',
    manufacturing: false,
    trading: false,
    email: '',
    about: '',
    website: '',
    freePackage: false,
    created: new Date().getTime(),
    updated: new Date().getTime(),
  };

  public setting: Setting;
  public categories: string[];
  private package: string;
  private expires: number;
  private subscription: string;
  public payment: number;
  private freePackage = false;
  private confirm = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private settingService: SettingsService,
    public subscriptionService: SubscriptionService
  ) { }

  ngOnInit() {
    this.categories = businessCategories;

    this.settingService.getSetting().subscribe((ref) => this.setting = ref);

    this.route.queryParams.subscribe(
      (params) => {
      // Defaults to 0 if no query param provided.
      this.package = decodeURI(params['package']);
      this.subscription = decodeURI(params['subscribe']);
    });

    if (this.subscription === 'free') {
      this.freePackage = true;
      this.expires = 30; // 30 days countdown
      this.payment = 0;
      this.confirm = true;
    } else if (this.subscription === 'pro') {
      this.expires = 183; // 183 days countdown
      this.payment = 150;
    } else {
      this.expires = 365; // 365 days countdown
      this.payment = 220;
    }

  }

  businesSetup() {
    if (
      this.entry.businessName !== '' &&
      this.entry.category !== '' &&
      this.entry.phone !== '' &&
      this.entry.about !== '' &&
      this.package !== '' &&
      this.subscription !== ''
    ) {
      this.subscriptionService.businessSetup(
        {
          businessName: this.entry.businessName,
          website: this.entry.website,
          category: this.entry.category,
          manufacturing: this.entry.manufacturing,
          trading: this.entry.trading,
          phone: this.entry.phone,
          email: this.entry.email,
          about: this.entry.about,
          freePackage: this.freePackage,
          created: new Date().getTime(),
          updated: new Date().getTime(),
        },
        {
          package: this.package,
          subscription: this.subscription,
          payment: this.payment,
          confirm: this.confirm,
          expires: this.expires,
          mobileMoneyNumber:  this.entry.phone,
          created: new Date().getTime(),
          updated: new Date().getTime()
        }
      );
    } else {
      this.router.navigate(['./..profile']);
      this.toastr.error(
        'Please provide the right information for the subscription process to complete. Thank you!',
        'Error Found!',
        { timeOut: 10000 }
      );
    }
    this.entry.businessName = '';
    this.entry.website = '';
    this.entry.category = '';
    this.entry.email = '';
    this.entry.phone = '';
    this.entry.about = '';
  }

}
