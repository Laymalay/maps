import { Component , OnInit } from '@angular/core';
import { LeafletCoreDemoModel } from './core-demo.model';
import { latLng, LatLng, tileLayer } from 'leaflet';
import 'leaflet.markercluster';
import * as L from 'leaflet';
import * as C from 'leaflet.markercluster'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    // Open Street Map Definition
    LAYER_OSM = {
      id: 'openstreetmap',
      name: 'Open Street Map',
      enabled: false,
      layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: 'Open Street Map'
      })
    };
  
    // Values to bind to Leaflet Directive
    layersControlOptions = { position: 'bottomright' };
    baseLayers = {
      'Open Street Map': this.LAYER_OSM.layer
    };
    
    options = {
      zoom: 12,
      center: L.latLng([ 53.89, 27.5667 ])
    };

    clusteroptions = {
      maxClusterRadius: 60,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true,
      animate:true,
      removeOutsideVisibleBounds :true
    }
    markerClusterGroup: L.MarkerClusterGroup;
    markerClusterData: any[] = [];
    markerClusterOptions: L.MarkerClusterGroupOptions;
    
      
    generateLat() { return Math.random()/100 + 53.5; }
    generateLon() { return Math.random()/100 + 27.3; }
  
  
    ngOnInit() {
      this.generateData();
    }
  
    markerClusterReady(group: L.MarkerClusterGroup) {
      this.markerClusterGroup = group;
    }
  
    generateData() {
      const data: any[] = [];
      for (let i = 0; i < 100; i++) {
        const icon = L.icon({
          iconUrl: 'assets/marker.png',
          iconSize: [20, 20]});
        data.push(L.marker([ this.generateLat(),  this.generateLon() ], { icon }));
      }
      this.markerClusterData = data;
      this.markerClusterOptions = this.clusteroptions;
    }

}
