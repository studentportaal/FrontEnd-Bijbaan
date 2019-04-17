import { Component, OnInit } from '@angular/core';
import { Student } from '../../../domain/Student';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import {Company} from "../../../domain/Company";
import {CompanyService} from "../../../services/company/company.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  student: Student = new Student();
  company: Company = new Company();

  form = new FormGroup(
    {
      password: new FormControl('', Validators.minLength(2)),
      confirm: new FormControl('', Validators.minLength(2)),
    },
    passwordMatchValidator
  );

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

  constructor(private userService: UserService,
              private companyService: CompanyService,
              private snackbar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
  }

  registerStudent() {
    this.userService.addUser(this.student).subscribe((response: Student) => {
      const snackbarRef = this.snackbar.open('Account successfully created', 'dismiss', {
        duration: 3000
      });

      snackbarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    });
  }

  registerCompany() {
    this.companyService.addComapny(this.company).subscribe((response: Student) => {
      const snackbarRef = this.snackbar.open('Account successfully created', 'dismiss', {
        duration: 3000
      });

      snackbarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    });

  }

  getErrorMessage(controlName: string) {
    if (this.form.controls[controlName].hasError('minlength')) {
      return 'Must be at least 2 characters';
    }

    return 'Passwords must match';
  }
}

function passwordMatchValidator(g: FormGroup) {
  const password = g.get('password').value;
  const confirm = g.get('confirm').value;
  return password === confirm ? null : { mismatch: true };
}


