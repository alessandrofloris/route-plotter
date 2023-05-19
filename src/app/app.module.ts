import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from "@angular/material/icon";
import { PlotComponent } from './plot/plot.component';
import {DataService} from "./services/data.service";
import {ApiService} from "./services/api.service";
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { UploadComponent } from './upload/upload.component';
import { MultiRoutesViewComponent } from './multi-routes-view/multi-routes-view.component';
import { SingleRouteViewComponent } from './single-route-view/single-route-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlotComponent,
    MapComponent,
    HeaderComponent,
    UploadComponent,
    MultiRoutesViewComponent,
    SingleRouteViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    NoopAnimationsModule,
    HttpClientModule,
    LeafletModule,
    AppRoutingModule
  ],
  providers: [DataService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
