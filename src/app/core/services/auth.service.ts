import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, map, catchError, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = 'http://localhost:3000'
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public signIn(payload: { email: string, password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.url}/sign`, payload).pipe(
      map(data => {
        localStorage.removeItem('token')
        localStorage.setItem('token', data.token)
        return this.router.navigate(['admin'])
      }),
      catchError(err => {
        console.error("Error: ", err)
        return throwError(() => err?.error?.message || 'Favor tentar novamente mais tarde. (Servidor offline)')
      })
    )
  }

  public logout() {
    localStorage.removeItem('token')
    return this.router.navigate([''])
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token')
    if (!token) return false

    const jwtHelper = new JwtHelperService()
    return !jwtHelper.isTokenExpired(token)
  }
}
