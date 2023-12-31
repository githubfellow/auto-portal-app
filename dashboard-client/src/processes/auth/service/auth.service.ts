import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { PersistanceService } from '@/app/core/shared/services/persistance/persistance.service';
import { IAuthResponse, ILoginDto } from './auth.interface';
import { loginUrl } from '@/shared/api/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  constructor(
    private readonly http: HttpClient,
    private readonly persistanceService: PersistanceService,
    private readonly router: Router
  ) { }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  public hasToken(): boolean {
    return this.persistanceService.get('accessToken');
  }

  public login(payload: ILoginDto): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(loginUrl, payload);
  }
}
