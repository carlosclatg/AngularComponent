import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
 
@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
    constructor() {}
 
    intercept(req: HttpRequest<any>, next: HttpHandler): 
        Observable<HttpEvent<any>> {
          return next.handle(req).pipe(
             catchError( (error) => {
               if(error instanceof HttpErrorResponse){
                  if (error.error instanceof ErrorEvent) {
                    console.error("Error Event");
                  } else {
                    console.log(`error status : ${error.status} ${error.statusText}`);
                      switch (error.status) {
                          case 401:      //login
                              return throwError(new Error("Error 401"));
                          case 403:     //forbidden
                              return throwError(new Error("Error 403"));
                      }
                  } 
               }
               console.log(error);
               return throwError(error);
          })
        )
    }
}