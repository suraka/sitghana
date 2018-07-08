import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ToastrService } from 'ngx-toastr';
import { routerTransition } from './../../../router.animations';

import { ContactService, NotificationService, SettingsService } from './../../../core/services';
import { Contact, Setting } from './../../../core/models';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [routerTransition()]
})
export class ContactComponent implements OnInit {

  entry: Contact = {
    first: '',
    last: '',
    phone: '',
    email: '',
    message: '',
    created: new Date().getTime(),
    updated: new Date().getTime(),
  };

  public setting: Setting;

  constructor(
    private contactService: ContactService,
    private settingService: SettingsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.settingService.getSetting().subscribe((ref) => this.setting = ref);
  }

  onSubmit() {
    if (this.entry.first !== '' && this.entry.last !== '' && this.entry.phone !== '' && this.entry.message !== '') {
      this.contactService.addContact(this.entry);
      this.showSuccess();
    }

    this.entry.first = '';
    this.entry.last = '';
    this.entry.phone = '';
    this.entry.email = '';
    this.entry.message = '';
  }

  private showSuccess() {
    this.toastr.success(
      'Your message has been forwarded successfully. Our team will reach out to you. Thank you!',
      'Send Message!',
      { timeOut: 7000 }
    );
  }

}
