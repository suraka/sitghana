import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SearchService, TransactionService } from './../../../core/services';
import { regions } from './../../../core/models/options';

type UserFields = 'search' | 'region';
type FormErrors = { [u in UserFields]: string };
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  search: string;
  searchForm: FormGroup;
  regions = regions;
  formErrors: FormErrors = {
    'search': '',
    'region': ''
  };
  validationMessages = {
    'search': {
      'required': 'Search term is required.',
      'text': 'Search term must be a valid word(s)',
    },
    'region': {
      'required': 'Location is required.',
      'text': 'Location must be a valid word(s)',
    }
  };

  constructor(
    private searchService: SearchService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.searchForm = this.fb.group({
      'search': ['', [
        Validators.required,
      ]],
      'region': ['', [
        Validators.required,
      ]]
    });

    this.searchForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.searchForm) { return; }

    const form = this.searchForm;

    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) &&
      (field === 'search' || field === 'region' /*  || field === 'region' */)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key) ) {
                this.formErrors[field] += `${(messages as {[key: string]: string})[key]} `;
              }
            }
          }
        }
      }
    }
  }

}
