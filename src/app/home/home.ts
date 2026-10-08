import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonButton
} from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonButton
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  latitude: number | null = null;
  longitude: number | null = null;
  accuracy: number | null = null;
  map!: L.Map;
  marker!: L.Marker;

  ionViewDidEnter() {
    this.initializeMap();
  }

  initializeMap() {
    this.map = L.map('map').setView([14.5995, 120.9842], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  async getCurrentLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.accuracy = position.coords.accuracy;

      console.log('Latitude:', this.latitude);
      console.log('Longitude:', this.longitude);
      console.log('Accuracy:', this.accuracy);

      this.showLocationOnMap();
    } catch (error) {
      console.error('Unable to get location:', error);
      alert('Unable to retrieve your location. Please enable location permission.');
    }
  }

  showLocationOnMap() {
    if (this.latitude === null || this.longitude === null) {
      return;
    }

    const location: L.LatLngExpression = [this.latitude, this.longitude];
    this.map.setView(location, 17);

    if (this.marker) {
      this.marker.remove();
    }

    this.marker = L.marker(location)
      .addTo(this.map)
      .bindPopup(
        `<strong>You are here!</strong><br>
         Latitude: ${this.latitude}<br>
         Longitude: ${this.longitude}`
      )
      .openPopup();
  }

  clearLocation() {
    this.latitude = null;
    this.longitude = null;
    this.accuracy = null;

    if (this.marker) {
      this.marker.remove();
    }

    this.map.setView([14.5995, 120.9842], 13);
  }
}