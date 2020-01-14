import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {SessionService} from './services/session/session.service';
import {StorageService} from './services/storage/storage.service';
import {ModalService} from './services/modal/modal.service';
import {HomePageModule} from './pages/home/home.page.module';
import {AccessPageModule} from './pages/access/access.page.module';
import {ModalMessageComponent} from './components/modal-message/modal-message.component';
import {ModalComponent} from './components/modal/modal.component';
import {SessionGuard} from './guards/session/session.guard';
import {ApiService} from './services/api/api.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

@NgModule({
    declarations: [
        AppComponent,
        ModalMessageComponent,
        ModalComponent
    ],
    entryComponents: [
        ModalMessageComponent,
        ModalComponent
    ],
    imports: [
        RouterModule.forRoot([], {useHash: true}),
        BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
                deps: [HttpClient]
            }
        }),
        HomePageModule,
        AccessPageModule
    ],
    providers: [
        ApiService,
        SessionService,
        StorageService,
        ModalService,
        SessionGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
