import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TimeAgoPipe } from './time-ago.pipe';
import { SearchPipe } from './search.pipe';
import { SharedModule } from './../../shared';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    TimeAgoPipe,
    SearchPipe,
  ]
})
export class HomeModule { }
