import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CoreRoutes } from './core.routes';
import { IndexComponent } from './index/index.component';
import { BlogModule } from '../blog/blog.module';
import { AuthModule } from '../author/author.module';
import { FooterService } from '../services/footer.service';
import { AuthorLoginComponent } from './author-login/author-login.component';


@NgModule({
  declarations:[
    IndexComponent,
    AuthorLoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BlogModule,
    AuthModule,
    CoreRoutes,
  ],
  providers:[],
})
export class CoreModule{}
