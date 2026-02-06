import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  mostrarMenuEmitter = new EventEmitter<boolean>();

  login(user: string, pass: string): Observable<IUser> {
    if (user === 'admin' && pass === '123') {
      const mockUser: IUser = {
        username: user,
        name: 'Usuário Administrador',
        token: 'token-gerado-pelo-mock-12345'
      };

      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      this.mostrarMenuEmitter.emit(true);

      return of(mockUser).pipe(delay(1000));
    } else {
      return throwError(() => new Error('Usuário ou senha incorretos (Simulação).'));
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.mostrarMenuEmitter.emit(false);
  }
}