import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AuthRoutes } from './auth.routes';
import { IndexComponent } from './index/index.component';
import { WelcomeComponent } from './header/welcome/welcome.component';
import { DashboardComponent } from './header/dashboard/dashboard.component';
import { SettingsComponent } from './header/settings/settings.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArchiveComponent } from './archive/archive.component';
import { TrashComponent } from './trash/trash.component';

@NgModule({
  declarations:[
    IndexComponent,
    WelcomeComponent,
    DashboardComponent,
    SettingsComponent,
    ArticlesListComponent,
    ArchiveComponent,
    TrashComponent,
  ],
  imports:[
    CommonModule,
    BrowserModule,
    FormsModule,
    AuthRoutes
  ],
  providers:[]
})
export class AuthModule {}
