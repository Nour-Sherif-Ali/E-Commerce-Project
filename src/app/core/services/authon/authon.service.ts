import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../shared/interfaces/user';
import { BehaviorSubject, catchError, EMPTY, first, Observable } from 'rxjs';
import { LoginData } from '../../../shared/interface/login-data';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthonService {
 
  // isLogin = false; // dah flag depend on flag haftah el linkat aw a2felha
 
  pid=inject(PLATFORM_ID);
  r = inject(Router)
  isLogin :BehaviorSubject <boolean> = new BehaviorSubject(false)  // tyoe of observable - used with properites  // that's also act as an flag
  userName: BehaviorSubject <string> = new BehaviorSubject('');
  

  constructor(private _HttpClient:HttpClient) { 
    if(isPlatformBrowser(this.pid)){
      if(localStorage.getItem('token') !== null){
        this.doVerifyToken();
             }else {
               this.r.navigate(['/login'])
             }
    }
      
        }
  
  setUserName(){
         let token : any = localStorage.getItem('token');
        let decodedToken:any = jwtDecode(token);
        this.userName.next(decodedToken.name);
  }

  verifyToken(t:any): Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken',{
      headers:{
        token : t
      }
    })
  }

  doVerifyToken(){
    this.verifyToken(localStorage.getItem('token')).subscribe({
      next:(res) =>{
        console.log('Hello from verify token');
        console.log(res);
        this.isLogin.next(true);
      },
      error: () => {
        this.isLogin.next(false);
        this.r.navigate(['/login']);
      }
    });
  }

  signup(userData:User): Observable<any>{
   return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',userData);
  }



  signIn(loginData:LoginData): Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',loginData);
   }

   resolve(route: ActivatedRouteSnapshot,state:RouterStateSnapshot){
    let token:any = '';
    if(typeof localStorage !== 'undefined'){
      token = localStorage.getItem('token');
    }
    return this.verifyToken(token).pipe(
      first(),
      catchError((error: any) => {
        console.error('Data resolution failed', error);
        this.r.navigate(['/home']);
        return EMPTY; //PREVENT ACTIVATION OF THE ROUTE
      })
    ); //ENSURE COMPLETION
   }
  }
  