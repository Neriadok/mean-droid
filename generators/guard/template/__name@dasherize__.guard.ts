import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class <%= classify(name) %>Guard implements CanActivate {
    constructor() {
    }

    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return true
    }
}
