import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {SessionService} from '../../services/session/session.service';

/**
 * Clase a cargo de la gestión de la sesión del usuario.
 */
@Injectable()
export class SessionGuard implements CanActivate {
    private home = '/';
    private access = '/access';

    constructor(private router: Router, private session: SessionService) {
    }

    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.availableRoute(state.url);
    }

    private availableRoute (targetUrl: string) {
        return this.targetIsAccess(targetUrl) ? this.navigateToAccess() : this.navigate();
    }

    private targetIsAccess(targetUrl: string) {
        return targetUrl === this.access;
    }

    private navigateToAccess() {
        const authorized =  this.session.checkValidSession();
        if (authorized) { this.router.navigateByUrl(this.home); }
        return !authorized;
    }

    private navigate() {
        const authorized =  this.session.checkValidSession();
        if (!authorized) { this.router.navigateByUrl(this.access); }
        return authorized;
    }
}
