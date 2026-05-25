import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import maplibregl, { LngLatLike } from 'maplibre-gl';

interface Marker {
  id: string;
  maplibreglMarker: maplibregl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.html',
})
export class MarkersPage implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<maplibregl.Map|null>(null);

  markers = signal<Marker[]>([]);

  async ngAfterViewInit() {
    if(!this.divElement()?.nativeElement) return;

        await new Promise((resolve)=> setTimeout(resolve, 80));

        const element = this.divElement()!.nativeElement;

        const map = new maplibregl.Map({
            container: element,
            style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            center: [-75.6043750732229, 6.2714979006757545],
            zoom: 18,
        });

        this.mapListeners(map);
  }

  mapListeners(map: maplibregl.Map){

    map.on('click',(event)=>this.mapClick(event));
    this.map.set(map);
  }

  mapClick(event: maplibregl.MapMouseEvent){

    if(!this.map()){
      return;
    }

    const map = this.map()!;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const coords = event.lngLat;

    const marker = new maplibregl.Marker({
      color: color,
    })
    .setLngLat(coords)
    .addTo(map);

    const newMarker: Marker={
     id: (this.markers().length + 1).toString(),
     maplibreglMarker: marker
    }

    this.markers.set([newMarker, ...this.markers()]);

    console.log(this.markers());
  }

  flyToMarker(lngLat: LngLatLike){
    if(!this.map() )return;

    this.map()?.flyTo({
      center: lngLat
    })
  }

  deleteMarker(marker: Marker){
    if(!this.map()) return;
    const map = this.map()!;

    marker.maplibreglMarker.remove();

    this.markers.set(this.markers().filter( m => m.id !== marker.id))

  }
}
