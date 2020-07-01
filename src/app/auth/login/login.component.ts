import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {MessageModel} from '../../shared/model/message.model';

import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {fadeStateTriger} from '../../shared/animations/fade.animation';
import {Meta, Title} from '@angular/platform-browser';


@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTriger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: MessageModel;

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private title: Title,
              private meta: Meta,
  ) {
    meta.addTags([
      {name: 'keywords', content: 'Log in to System'}
    ]);
    title.setTitle('Log in to System');
  }

  private showMessage(message: MessageModel) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);

  }

  ngOnInit(): void {
    this.message = new MessageModel('danger', '');
    this.route.queryParams.subscribe((params) => {
      if (params[`nowYouCan`]) {
        this.showMessage({
          text: 'you Can Log in',
          type: 'success'
        });
      } else if (params['accessDenied']) {
        this.showMessage({
          text: 'You need to log in',
          type: 'warning'
        });

      }
    });
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

  }

  noSubmit() {
    console.log(this.form);


    const formData = this.form.value;
    this.userService.getUserByEmail(formData.email)
      .subscribe((user) => {
        if (user) {
          if (formData.password === user.name) {
            this.message.text = '';
            localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            console.log(this.authService.login());
            this.router.navigate(['/system', 'bill']);

          } else {
            this.showMessage({
              text: 'password is incorrect',
              type: 'danger'
            });
          }
        } else {
          this.showMessage({
            text: 'user Not exist',
            type: 'info'
          });
        }
      });
  }
}
