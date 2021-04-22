import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private token = appConfig.token;
  empty_data;

  // Materials 
  getMaterials(): Observable<any> {
    return this.http.get<any>(this.url + '/material/' + this.school_id);
  } 
  
  addMaterials(data): Observable<any> {
    return this.http.post<any>(this.url + '/material/' + this.school_id, data);
  } 

  editMaterials(data, material_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_material/' + material_id, data);
  } 

  deleteMaterials(material_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_material/' + material_id, this.empty_data);
  } 

  // Vendors 
  getVendors(): Observable<any> {
    return this.http.get<any>(this.url + '/vendor/' + this.school_id);
  } 
  
  addVendor(data): Observable<any> {
    return this.http.post<any>(this.url + '/vendor/' + this.school_id, data);
  } 

  editVendor(data, vendor_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_vendor/' + vendor_id, data);
  } 

  deleteVendor(vendor_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_vendor/' + vendor_id, this.empty_data);
  } 

  // Materials-In
  getMaterialsIn(): Observable<any> {
    return this.http.get<any>(this.url + '/material_in/' + this.school_id);
  } 
  
  addMaterialsIn(data): Observable<any> {
    return this.http.post<any>(this.url + '/material_in/' + this.school_id, data);
  } 

  editMaterialsIn(data, material_in_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_material_in/' + material_in_id, data);
  } 

  deleteMaterialsIn(material_in_id, data): Observable<any> {
    console.log(data)
    return this.http.put<any>(this.url + '/delete_material_in/' + material_in_id, data);
  } 

  // Materials-Out
  getMaterialsOut(): Observable<any> {
    return this.http.get<any>(this.url + '/material_out/' + this.school_id);
  } 
  
  addMaterialsOut(data): Observable<any> {
    return this.http.post<any>(this.url + '/material_out/' + this.school_id, data);
  } 

  editMaterialsOut(data, material_out_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_material_out/' + material_out_id, data);
  } 

  deleteMaterialsOut(material_out_id, data): Observable<any> {
    console.log(data)
    return this.http.put<any>(this.url + '/delete_material_out/' + material_out_id, data);
  } 

  // Payments
  getPayments(): Observable<any> {
    return this.http.get<any>(this.url + '/payments/' + this.school_id);
  } 
  
  addPayments(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/addpayment/' + this.school_id, data);
  } 

  editPayments(data, payment_id): Observable<any> {
    console.log(payment_id)
    return this.http.put<any>(this.url + '/edit_payment/' + payment_id, data);
  } 

  deletePayments(data, payment): Observable<any> {
    console.log(data)
    return this.http.put<any>(this.url + '/delete_payment/' + payment, data);
  } 

}
