import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {
  TransactionService,
  AuthService,
  ProfilesService,
  TagsService,
  UserService,
  JwtService,
  NotificationService,
  SubscriptionService,
  SettingsService,
  InventoryService,
  AssetService,
  CustomerService
} from './services';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    TransactionService,
    AuthService,
    ProfilesService,
    TagsService,
    UserService,
    JwtService,
    NotificationService,
    SubscriptionService,
    SettingsService,
    InventoryService,
    AssetService,
    CustomerService
  ],
  declarations: []
})
export class CoreModule { }
