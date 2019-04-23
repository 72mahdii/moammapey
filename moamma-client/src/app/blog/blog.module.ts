import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { BlogRoutes } from './blog.routes';

import { BlogComponent } from './blog/blog.component';
import { ArticleComponent } from './article/article.component';

@NgModule({
  declarations:[
    BlogComponent,
    ArticleComponent,
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
