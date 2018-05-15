import { Directive, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/ngx-leaflet';

import * as L from 'leaflet';
import 'leaflet.markercluster';

@Directive({
	selector: '[leafletMarkerCluster]',
})
export class LeafletMarkerClusterDirective
implements OnChanges, OnInit {

	leafletDirective: LeafletDirectiveWrapper;
	markerClusterGroup: L.MarkerClusterGroup;

	@Input('leafletMarkerCluster') markerData: L.Layer[] = [];

	@Input('leafletMarkerClusterOptions') markerClusterOptions: L.MarkerClusterGroupOptions;

	@Output('leafletMarkerClusterReady') markerClusterReady: EventEmitter<L.MarkerClusterGroup> = new EventEmitter<L.MarkerClusterGroup>();

	constructor(leafletDirective: LeafletDirective) {
		this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
	}

	ngOnInit() {
		this.leafletDirective.init();

		const map = this.leafletDirective.getMap();
		this.markerClusterGroup = L.markerClusterGroup(this.markerClusterOptions);
		this.markerClusterReady.emit(this.markerClusterGroup);
		this.markerClusterGroup.addTo(map);
		this.setData(this.markerData);
	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {
		if (changes['markerData']) {
			this.setData(this.markerData);
		}
	}

	private setData(layers: L.Layer[]) {
		if (null != this.markerClusterGroup) {
			this.markerClusterGroup.clearLayers();
			this.markerClusterGroup.addLayers(layers);
		}
	}
}
