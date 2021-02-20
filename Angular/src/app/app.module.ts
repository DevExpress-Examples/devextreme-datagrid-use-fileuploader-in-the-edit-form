import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DxButtonModule, DxDataGridModule, DxFileUploaderModule} from 'devextreme-angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxFileUploaderModule,
    DxButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
