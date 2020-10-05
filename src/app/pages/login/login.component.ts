import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api/api.service';
import { AuthenticationService } from 'app/services/api/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  isLogin: boolean = true;
  token: any;
  profile: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public api: ApiService,
    private authService: AuthenticationService,
    private spinner: NgxSpinnerService
  ) {
    this.formValidator();
  }

  ngOnInit() {
    const token = sessionStorage.getItem('accessToken');

    if (!token) {
      return false;
    } else {
      this.api
        .verifyToken(token)
        .then((result: any) => {
          sessionStorage.setItem('profile', JSON.stringify(result.data));
          this.router.navigate(['/home']);
        })
        .catch((err) => {
          return false;
        });
    }
  }

  checkLogin(form: any) {
    this.spinner.show();

    console.log('CHECK LOGIN', form.value);
    this.api
      .login(form.value.username, form.value.password)
      .then((result: any) => {
        this.token = result.data.token;
        return this.verifyToken();
      })
      .catch((err) => {
        console.log(err);
        this.loginForm.reset();

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'username หรือ password ไม่ถูกต้อง!',
          confirmButtonColor: '#00c2cb',
        });
        this.spinner.hide();
      });
  }

  verifyToken() {
    this.api
      .verifyToken(this.token)
      .then((result: any) => {
        this.profile = JSON.stringify(result.data);
        return this.api.checkAutorization(result.data.emp_id);
      })
      .then((result: any) => {
        if (result.result == true) {
          // console.log('เข้ามั้ย', result.data[0].count);

          if (result.data[0].count == 0) {
            // console.log('check 0');
            this.loginForm.reset();
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'ไม่มีสิทธิเข้าใช้งาน',
              confirmButtonColor: '#00c2cb',
            });
            this.spinner.hide();
            sessionStorage.clear();
          } else {
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, 2000);
            this.authService.login(this.token, this.profile);
            this.router.navigate(['/home']);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  formValidator() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }
}
