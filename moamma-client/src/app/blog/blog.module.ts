import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { BlogRoutes } from './blog.routes';

import { BlogComponent } from './blog/blog.component';

@NgModule({
  declarations:[
    BlogComponent,
  ],
  imports:[
    CommonModule,
    BrowserModule,
    FormsModule,
    BlogRoutes
  ],
  providers:[]
})
export class BlogModule{}
