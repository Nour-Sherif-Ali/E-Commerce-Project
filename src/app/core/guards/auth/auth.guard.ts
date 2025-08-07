import { CanActivateFn } from '@angular/router';
import { AuthonService } from '../../services/authon/authon.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { catchError,EMPTY,first,map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
let _AuthonService = inject(AuthonService);
let _Router = inject(Router);
let pid = inject(PLATFORM_ID);


if(isPlatformBrowser(pid)){
  return _AuthonService.verifyToken(localStorage.getItem('token')).pipe(
    first(),
    map((res) => {
      if(res.message === 'verified') {
        _AuthonService.isLogin.next(true);
        return true;
      }
      else{
        _AuthonService.isLogin.next(false);
        return false;
      }
    }),
    catchError(error => {
          console.log('AuthGuard Error', error);
          _AuthonService.isLogin.next(false);
          _Router.navigate(['login']); //Redirect user to login on error
          return EMPTY; //Prevent navigation from breaking
    })
  );
}
else{
  return true;
}



  // if(_AuthonService.isLogin.value === true){ //lw inta 3amel login return true
  //   return true;
  // }
  // else { // raga3o le login page 
  //   _Router.navigate(['/login']);
  //   return false;
  // }

  
};


