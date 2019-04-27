import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FooterComponent } from './core/footer/footer.component';
import { FooterService } from './services/footer.service';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './core/message/message.component';
import { MessageService } from './services/message.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CoreModule,
    RouterModule,
  ],
  providers: [FooterService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
