import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {FormComponentDefinition} from '../../components/form/form.component';
import {ApiResponseError, ApiService} from '../../services/api/api.service';
import {SessionService} from '../../services/session/session.service';

@Component({
    selector: 'app-access',
    templateUrl: './access.page.html',
    styleUrls: ['./access.page.scss']
})
export class AccessPage {
    public loginError: string;
    public registerError: string;
    public loginForm: FormComponentDefinition;
    public registerForm: FormComponentDefinition;

    constructor(private api: ApiService, private session: SessionService) {
        this.initRegisterForm();
        this.initLoginForm();
    }

    private access(form: FormGroup, endpoint: 'user' | 'session') {
        const body = this.toAccessData(form);
        this.api.post(endpoint, {body})
            .then(
                (response) => this.handleAccess(response),
                (response) => this.handleError(response, endpoint, form)
            );
    }

    private toAccessData(form: FormGroup) {
        const {email, password} = form.getRawValue();
        return this.api.toFormData({
            email,
            password: this.session.encrypt(password),
        });
    }

    private async handleAccess(response) {
        const user = await response.json();
        this.session.accessAppWithUser(user);
    }

    private handleError(response: ApiResponseError, endpoint: 'user' | 'session', form: FormGroup) {
        console.warn(response);

        if (endpoint === 'session') {
            this.loginError = response.message;
            this.initLoginForm(form);
        } else if (endpoint === 'user') {
            this.registerError = response.message;
            this.initRegisterForm(form);
        }
    }

    private initRegisterForm(form?: FormGroup) {
        const {email, password} = form ? form.getRawValue() : {email: null, password: null};
        this.registerForm = {
            key: 'register-form',
            inputs: [
                {
                    key: 'email',
                    id: 'register-email',
                    label: 'email',
                    value: email,
                    type: 'email',
                    validators: [Validators.required]
                },
                {
                    key: 'password',
                    id: 'register-password',
                    label: 'password',
                    value: password,
                    type: 'password',
                    validators: [Validators.required]
                }
            ],
            actions: [
                {
                    key: 'register-submit',
                    type: 'default',
                    label: 'register',
                    action: (form) => this.access(form, 'user')
                }
            ]
        };
    }

    private initLoginForm(form?: FormGroup) {
        const {email, password} = form ? form.getRawValue() : {email: null, password: null};
        this.loginForm = {
            key: 'login-form',
            inputs: [
                {
                    key: 'email',
                    id: 'login-email',
                    label: 'email',
                    value: email,
                    type: 'text',
                    validators: [Validators.required]
                },
                {
                    key: 'password',
                    id: 'login-password',
                    label: 'password',
                    value: password,
                    type: 'password',
                    validators: [Validators.required]
                }
            ],
            actions: [
                {
                    key: 'login-submit',
                    type: 'default',
                    label: 'login',
                    action: (form) => this.access(form, 'session')
                }
            ]
        };
    }

}
