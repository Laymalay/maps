import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppComponent } from './app.component';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LeafletMarkerClusterModule } from '../leaflet-markercluster/leaflet-markercluster.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LeafletModule.forRoot(),
    LeafletMarkerClusterModule,
    CommonModule,
		FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
