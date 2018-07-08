import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import {
  SidebarModule,
  TransactionsModule,
  StatModule
} from './../../shared';

import {
  DateFormatPipe,
  DateTimeFormatPipe,
  MillionPipe
} from './../../core/pipes';

import { InventoryComponent } from './inventory/inventory.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrialBalanceComponent } from './trial-balance/trial-balance.component';
import { ManufacturingComponent } from './manufacturing/manufacturing.component';
import { TradingComponent } from './trading/trading.component';
import { ProfitLossComponent } from './profit-loss/profit-loss.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { IncomeStatementComponent } from './income-statement/income-statement.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule.forRoot(),
    AngularFireStorageModule,
    RouterModule,
    AngularFireAuthModule,
    StatModule,
    SidebarModule,
    TransactionsModule,
    NgbModule,
    NgZorroAntdModule
  ],
  declarations: [
    InventoryComponent,
    DashboardComponent,
    TrialBalanceComponent,
    ManufacturingComponent,
    TradingComponent,
    ProfitLossComponent,
    BalanceSheetComponent,
    IncomeStatementComponent,
    DateFormatPipe,
    DateTimeFormatPipe,
    MillionPipe
  ]
})
export class ReportsModule { }
