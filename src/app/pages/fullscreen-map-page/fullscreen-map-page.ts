import { DecimalPipe, JsonPipe } from '@angular/common';
import { AfterViewInit, Component, effect, ElementRef, signal, viewChild  } from '@angular/core';
import maplibregl from 'maplibre-gl';



@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe, JsonPipe ],
  templateUrl: './fullscreen-map-page.html',
  styles: `
    div{
      width: 100vw;
      height: 90vh;
    }

    #controls{
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 30px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      width: 250px;
    }
  `
})
export class FullscreenMapPage implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<maplibregl.Map|null>(null);

  zoom =signal(12);
  coordinates = signal({
    lng: -75.5636,
    lat: 6.2518,
  })

  zoomEffect = effect(()=>{
    if(!this.map())return;

    this.map()?.setZoom(this.zoom());
  })


  async ngAfterViewInit(){

    if(!this.divElement()?.nativeElement) return;

    await new Promise((resolve)=> setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;
    const {lng , lat} = this.coordinates();

    const map = new maplibregl.Map({
        container: element, // container id
        //style: 'https://demotiles.maplibre.org/globe.json', // style URL
        // style: 'https://demotiles.maplibre.org/style.json',
        // style: 'https://tiles.openfreemap.org/styles/liberty',
        style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        center: [lng, lat], // starting position [lng, lat]
        zoom: this.zoom(), // starting zoom
    });

    this.mapListeners(map);
  }

  mapListeners(map: maplibregl.Map){

    map.on('zoomend',(event)=>{
      const newZoom = event.target.getZoom()
      this.zoom.set(newZoom);
    });

    map.on('moveend', ()=>{
      const center = map.getCenter();
      this.coordinates.set(center);
    })

    map.addControl(new maplibregl.FullscreenControl());
    map.addControl(new maplibregl.NavigationControl());
    map.addControl(new maplibregl.ScaleControl());

    this.map.set(map);
  }

}
