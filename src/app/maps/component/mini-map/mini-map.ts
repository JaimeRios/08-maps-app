import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import maplibregl from 'maplibre-gl';
import { HouseProperty } from '../../interfaces/HouseProperty.interface';

/**
 * width 100%
 * height 260
 */

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.html',
})
export class MiniMap implements AfterViewInit  {
  divElement = viewChild<ElementRef>('map');
  house = input.required<HouseProperty>();
  zoom = input<number>(14);

  async ngAfterViewInit() {
    if(!this.divElement()?.nativeElement) return;

        await new Promise((resolve)=> setTimeout(resolve, 80));

        const element = this.divElement()!.nativeElement;

        const map = new maplibregl.Map({
            container: element,
            style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            center: this.house().lngLat,
            zoom: this.zoom(),
            interactive: false
        });

        const color = '#xxxxxx'.replace(/x/g, (y) =>
          ((Math.random() * 16) | 0).toString(16)
        );

        const marker = new maplibregl.Marker({
          color: color,
        })
        .setLngLat(this.house().lngLat)
        .addTo(map);
  }

}
