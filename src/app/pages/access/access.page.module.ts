import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccessPage} from './access.page';
import {RouterModule} from '@angular/router';
import {SessionGuard} from '../../guards/session/session.guard';
import {TranslateModule} from '@ngx-translate/core';
import {FormComponentModule} from '../../components/form/form.component.module';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        RouterModule.forChild([
                {path: 'access', component: AccessPage, canActivate: [SessionGuard]},
            ]
        ),
        FormComponentModule
    ],
  declarations: [AccessPage],
  exports: [AccessPage]
})
export class AccessPageModule { }
