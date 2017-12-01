import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ImportFileComponent } from './import-file/import-file.component';
import { FileutilService } from './fileutil.service';


@NgModule({
  declarations: [
    AppComponent,
    ImportFileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [FileutilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
