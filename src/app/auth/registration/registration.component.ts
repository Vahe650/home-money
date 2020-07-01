import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageModel} from '../../shared/model/message.model';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/model/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'wfm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  message: MessageModel;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, []),
      email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      userType: new FormControl(null, [Validators.requiredTrue])
    });
  }

  onSubmit() {
    const {email, password, name, surname, userType} = this.form.value;
    const user = new User(email, password, name, surname, 'USER');

    this.userService.createUser(user)
      .subscribe((created: User) => {
        this.router.navigate(['/login'], {
          queryParams: {
            nowYouCan: true
          }
        });

      });
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByEmail(control.value).subscribe((user: User) => {
        if (user) {
          resolve({forbidden: true});
        } else {
          resolve(null);
        }

      });
    });
  }
}
