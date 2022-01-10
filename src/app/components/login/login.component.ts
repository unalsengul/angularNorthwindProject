import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { subscribeOn } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private toatsrService:ToastrService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm()
  {
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })

  }

  login()
  {
    if(this.loginForm.valid)
    {
      console.log(this.loginForm.value);
      let loginModel=Object.assign({},this.loginForm.value);

      this.authService.login(loginModel).subscribe(response=>{
        console.log(response);
        this.toatsrService.info(response.message,"Bilgi");
        localStorage.setItem("token",response.data.token);
      },responseError=>{
        console.log(responseError);
        this.toatsrService.error(responseError.error);
      })
    }
  }

}
