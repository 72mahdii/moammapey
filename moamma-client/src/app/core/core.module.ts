import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CoreRoutes } from './core.routes';
import { IndexComponent } from './index/index.component';
import { BlogModule } from '../blog/blog.module';


@NgModule({
  declarations:[
    IndexComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BlogModule,
    CoreRoutes,
  ],
  providers:[],
})
export class CoreModule{}
