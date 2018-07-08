import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { ContactComponent } from './contact/contact.component';
import { TosComponent } from './tos/tos.component';
import { PolicyComponent } from './policy/policy.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFireModule,
    AngularFirestoreModule
  ],
  declarations: [
    AboutComponent,
    FeaturesComponent,
    ContactComponent,
    TosComponent,
    PolicyComponent,
    NotFoundPageComponent
  ]
})
export class AboutModule { }
