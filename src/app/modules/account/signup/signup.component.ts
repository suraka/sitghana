import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../../core/services';
import { routerTransition } from './../../../router.animations';

import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './../../../core/models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      'fullname': ['', [
        Validators.required
        ]
      ],
      'phone': ['', [
        Validators.required
        ]
      ],
      'email': ['', [
        Validators.required,
        Validators.email
        ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
        ]
      ],
    });
  }

  // Using getters will make your code look pretty
  get fullname() { return this.signupForm.get('fullname'); }
  get phone() { return this.signupForm.get('phone'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }

  signup() {
    return this.authService.emailSignUp(
      {
        displayName: this.fullname.value,
        phone: this.phone.value,
        email: this.email.value,
        status: true,
        roles: {
          subscriber: true
        },
        created: new Date().getTime(),
        updated: new Date().getTime(),
      },
      this.email.value,
      this.password.value
    );
  }

}
