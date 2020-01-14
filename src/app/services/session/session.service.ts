import {Injectable} from '@angular/core';
import {sha256} from 'js-sha256';
import {Router} from '@angular/router';
import {StorageService} from '../storage/storage.service';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';

/**
 * Clase a cargo de la gestión de la sesión del usuario.
 */
@Injectable()
export class SessionService {
  private session: Subject<object> = new Subject<object>();

  constructor(private router: Router, private storage: StorageService) {
  }

  public getUser() {
    return this.storage.getLocal('session');
  }

  public checkValidSession(): boolean {
    return !!this.getUser();
  }

  public getSessionObservable(): Observable<object> {
    return this.session.asObservable();
  }

  public accessAppWithUser(userData, path = '/') {
    this.updateSession(userData);
    if (this.checkValidSession()) {
      this.router.navigateByUrl(path);
    }
  }

  public updateSession(sessionData?) {
    sessionData ? this.saveSession(sessionData) : this.deleteSavedSession();
    this.session.next(this.getUser());
  }

  public getAuth() {
    return this.storage.getLocal('authorization');
  }

  public extendAuthHeaders(headers) {
    const auth = this.getAuth();
    return auth ? {...headers, auth} : headers;
  }

  public encrypt(input: string) {
    return sha256.hmac(environment.secret, input).toLowerCase();
  }

  public logout() {
    this.deleteSavedSession();
    this.session.next(null);
  }

  private saveSession(sessionData) {
    this.storage.setLocal('session', sessionData);
    if (sessionData.token) {
      this.storage.setLocal('authorization', sessionData.token);
    }
  }

  private deleteSavedSession() {
    this.storage.removeLocal('session');
    this.storage.removeLocal('authorization');
    this.router.navigateByUrl('/access');
    return null;
  }
}
