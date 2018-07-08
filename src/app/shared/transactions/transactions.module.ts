import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbAlertModule.forRoot(),
    AngularFireStorageModule,
    RouterModule,
    AngularFireAuthModule,
    NgbModule
  ],
  declarations: [
    AddComponent,
    ViewComponent,
    EditComponent,
    ListComponent,
  ],
  exports: [
    AddComponent,
    ViewComponent,
    EditComponent,
    ListComponent
  ]
})
export class TransactionsModule {

}
