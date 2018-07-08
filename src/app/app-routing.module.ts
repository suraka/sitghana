import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/services';
import {
  HomeComponent,
  AboutComponent,
  FeaturesComponent,
  ContactComponent,
  LoginComponent,
  SignupComponent,
  DashboardComponent,
  InventoryComponent,
  TrialBalanceComponent,
  ManufacturingComponent,
  TradingComponent,
  ProfitLossComponent,
  BalanceSheetComponent,
  IncomeStatementComponent,
  ProfileComponent,
  SubscriptionComponent,
  PaymentComponent,
  SettingsComponent,
  PolicyComponent,
  TosComponent,
  NotFoundPageComponent } from './modules';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'subscription', component: SubscriptionComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
  { path: 'trial-balance', component: TrialBalanceComponent, canActivate: [AuthGuard] },
  { path: 'manufacturing', component: ManufacturingComponent, canActivate: [AuthGuard] },
  { path: 'trading', component: TradingComponent, canActivate: [AuthGuard] },
  { path: 'profit-loss', component: ProfitLossComponent, canActivate: [AuthGuard] },
  { path: 'balance-sheet', component: BalanceSheetComponent, canActivate: [AuthGuard] },
  { path: 'income-statement', component: IncomeStatementComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'policy', component: PolicyComponent },
  { path: 'term-of-service', component: TosComponent },
  { path: '**', component: NotFoundPageComponent },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: [],
  providers: [ AuthGuard ],
})
export class AppRoutingModule { }
