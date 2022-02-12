import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginServiceService,
    public router: Router,
  ) { }

  public loginForm = this.formBuilder.group({
    email:'',
    password:'',
  })

  // Gets email from reactive form.
  public get email(): any{
    return this.loginForm.get('email');
  }

  // Gets password from reactive form.
  public get password(): any{
    return this.loginForm.get('password');
  }

  // Contains input entry validation.
  public inputError:string [] = [];

  ngOnInit(): void {
  }

  public onSubmit():any{
    this.inputError = [];
    if(!this.validateEmail(this.email.value)){this.inputError.push('Valid email is required.')};
    if(!this.validatePassword(this.password.value)){this.inputError.push('Password is required.')}

    if(this.inputError.length > 0){
      this.loginForm.reset();
    }else{
      this.loginService.adminAuthenticate(this.email.value, this.password.value).subscribe(
        response => {
          this.loginService.token = response.access_token;
          this.loginService.tokenType = response.token_type;
          this.router.navigate(['admin-dashboard']);
        },
        error => {
          if(error?.error){
            this.inputError = [];
            this.loginForm.reset();
            this.inputError.push(error.error.error)
            this.loginService.token = '';
            this.loginService.tokenType = '';
          }else{
            this.inputError.push('Unexpected error.')
          }
        }
      )
    }
  }

  public onReset(){
    this.inputError = [];
    this.loginForm.reset();
  }

  private validateEmail(email:string): boolean{
    const regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExEmail.test(email?.toLowerCase());
  }

  private validatePassword(password:string):boolean{   
    return password?.length > 0 ? true : false;
  }
}
