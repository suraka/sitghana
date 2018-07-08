import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HeaderComponent, FooterComponent, SubmenuComponent, CategoriesComponent } from './navigation';
import { FollowBtnComponent, TypeBtnComponent } from './buttons';
import { SearchComponent } from './forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    FollowBtnComponent,
    TypeBtnComponent,
    SubmenuComponent,
    SearchComponent,
    CategoriesComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    FollowBtnComponent,
    TypeBtnComponent,
    SubmenuComponent,
    SearchComponent,
    CategoriesComponent,
  ]
})
export class SharedModule { }
