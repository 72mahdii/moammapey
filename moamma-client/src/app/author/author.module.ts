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
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { AvatarComponent } from './settings/avatar/avatar.component';
import { AuthorPanelService } from '../services/author.service';
import { PasswordComponent } from './settings/password/password.component';
import { ProfileComponent } from './settings/profile/profile.component';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations:[
    IndexComponent,
    WelcomeComponent,
    DashboardComponent,
    SettingsComponent,
    ArticlesListComponent,
    ArchiveComponent,
    TrashComponent,
    AvatarComponent,
    PasswordComponent,
    ProfileComponent,
    CreateComponent,
  ],
  imports:[
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AuthRoutes
  ],
  providers:[AuthService, AuthGuard, AuthorPanelService]
})
export class AuthModule {}
