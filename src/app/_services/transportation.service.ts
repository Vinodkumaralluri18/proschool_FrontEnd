import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class TransportationService {

  constructor(private http: HttpClient) { }

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private token = appConfig.token;
  empty_data;

  //Add stations
  addStation(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/stations/' + this.school_id, data)
  }

  getStations(): Observable<any> {
    return this.http.get<any>(this.url + '/stations/' + this.school_id);
  }

  editStation(data, station_id): Observable<any> {
    console.log(data)
    return this.http.put<any>(this.url + '/edit_station/' + station_id, data)
  }
  
  deleteStation(station_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_station/' + station_id, this.empty_data)
  }

  //Add vehicles
  addVehicle(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/vehicles/' + this.school_id, data)
  }

  getVehicles(): Observable<any> {
    return this.http.get<any>(this.url + '/vehicles/' + this.school_id);
  }

  getVehicleDetails(vehicle_id): Observable<any> {
    return this.http.get<any>(this.url + '/vehicle_details/' + vehicle_id);
  }

  editVehicle(data, vehicle_id): Observable<any> {
    console.log(data)
    return this.http.put<any>(this.url + '/vehicle_edit/' + vehicle_id, data)
  }
  
  deleteVehicle(vehicle_id): Observable<any> {
    return this.http.put<any>(this.url + '/vehicle_delete/' + vehicle_id, this.empty_data)
  }

  //Add Bus route
  addRoute(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/busRoute/' + this.school_id, data)
  }

  getRoute(): Observable<any> {
    return this.http.get<any>(this.url + '/busRoute/' + this.school_id);
  }

  editRoute(data, bus_route_id): Observable<any> {
    console.log(data)
    return this.http.put<any>(this.url + '/edit_busRoute/' + bus_route_id, data)
  }
  
  deleteRoute(bus_route_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_busRoute/' + bus_route_id, this.empty_data)
  }
  
  addBusroute(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/station_to_bus_route/' + this.school_id, data)
  }

  getBusroute(bus_route_id): Observable<any> {
    return this.http.get<any>(this.url + '/busRoute_details/' + bus_route_id);
  }

}
