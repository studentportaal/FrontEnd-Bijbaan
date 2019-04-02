import {Component, OnInit} from '@angular/core';
import {User} from "../../../domain/User";
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form = new FormGroup(
    {
      password: new FormControl('', Validators.minLength(2)),
      confirm: new FormControl('', Validators.minLength(2)),
    },
    passwordMatchValidator
  );
  user: User = new User();

  constructor(private userService: UserService,
              private snackbar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.addUser(this.user).subscribe((response: User)=> {
     const snackbarRef = this.snackbar.open('Account successfully created', 'dismiss', {
        duration: 3000
      });

     snackbarRef.afterDismissed().subscribe(() => {
       this.router.navigateByUrl("/")
     })
    });
  }

  passwordErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.form.get('confirm').touched && this.form.invalid;
      return controlInvalid || formInvalid;
    }
  };

  confirmErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.form.get('password').touched && this.form.invalid;
      return controlInvalid || formInvalid;
    }
  };

  getErrorMessage(controlName: string) {
    if (this.form.controls[controlName].hasError('minlength')) {
      return 'Must be at least 2 characters'
    }

    return 'Passwords must match'
  }
}

function passwordMatchValidator(g: FormGroup) {
  const password = g.get('password').value;
  const confirm = g.get('confirm').value;
  return password === confirm ? null : {mismatch: true};
}
