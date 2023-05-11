import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import { PlotComponent } from './plot/plot.component';
import {DataService} from "./services/data.service";
import {ApiService} from "./services/api.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    NoopAnimationsModule,
    HttpClientModule
  ],
  providers: [DataService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
