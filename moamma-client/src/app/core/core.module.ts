import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CoreRoutes } from './core.routes';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations:[
    FooterComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CoreRoutes,
  ],
  providers:[],
})
export class CoreModule{}
