import { Component, signal } from '@angular/core';
import { MiniMap } from "../../maps/component/mini-map/mini-map";
import { HouseProperty } from '../../maps/interfaces/HouseProperty.interface';

@Component({
  selector: 'app-houses-page',
  imports: [MiniMap],
  templateUrl: './houses-page.html',
})
export class HousesPage {

  houses = signal<HouseProperty[]>([
    {
      id: '1',
      name: 'Villa Serenidad',
      description:
        'Un refugio tranquilo con vistas panorámicas al mar y jardines exuberantes.',
      price: 500_000,
      lngLat: { lng: -0.861526, lat: 41.65649 },
      tags: ['Villa', 'Mar', 'Jardines'],
    },
    {
      id: '2',
      name: 'Casa del Sol',
      description:
        'Una casa luminosa y acogedora con amplias terrazas y piscina privada.',
      price: 750_000,
      lngLat: { lng: -0.862, lat: 41.657 },
      tags: ['Casa', 'Sol', 'Terrazas'],
    },
    {
      id: '3',
      name: 'Residencia Esmeralda',
      description:
        'Elegante propiedad con acabados de lujo y un diseño arquitectónico moderno.',
      price: 1_200_000,
      lngLat: { lng: -0.863, lat: 41.658 },
      tags: ['Casa', 'Esmeralda', 'Acabados'],
    },
    {
      id: '4',
      name: 'Hacienda del Lago',
      description:
        'Encantadora hacienda con acceso directo al lago y un entorno natural impresionante.',
      price: 950_000,
      lngLat: { lng: -0.864, lat: 41.659 },
      tags: ['Casa', 'Lago', 'Hacienda'],
    },
  ]);
}
