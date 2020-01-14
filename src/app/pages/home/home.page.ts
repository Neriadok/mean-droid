import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../services/session/session.service';
import {ApiService} from '../../services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  public user;

  constructor(
    public api: ApiService,
    private session: SessionService
  ) {
  }

  ngOnInit() {
    this.user = this.session.getUser();
    this.refreshSession();
  }

  public updateSessionToken(token) {
    const user = this.session.getUser();
    this.user = token ? {...user, token} : user;
    this.session.updateSession(this.user);
  }

  public refreshSession() {
    this.api.get('session')
      .then(
        async (response: Response) => this.refreshToken(await response.json()) ,
        () => this.user = this.session.getUser()
      );
  }

  public refreshToken({token}) {
    token ? this.updateSessionToken(token) : this.logOut();
  }

  public logOut() {
    this.session.logout();
  }
}
