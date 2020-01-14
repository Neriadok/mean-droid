import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomePage} from './home.page';
import {RouterModule} from '@angular/router';
import {SessionGuard} from '../../guards/session/session.guard';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
          {path: '', component: HomePage, canActivate: [SessionGuard]},
        ]
    )
  ],
  declarations: [HomePage],
  exports: [HomePage]
})
export class HomePageModule { }
