import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FooterComponent } from './core/footer/footer.component';
import { FooterService } from './services/footer.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CoreModule,
    RouterModule,
  ],
  providers: [FooterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
