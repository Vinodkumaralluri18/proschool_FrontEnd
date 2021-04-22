import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http: HttpClient) { }

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private token = appConfig.token;
  empty_data;

  // Expenses
  getExpenses(): Observable<any> {
    return this.http.get<any>(this.url + '/expenses/' + this.school_id);
  } 
  
  addExpenses(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/expenses/' + this.school_id, data);
  } 

  update_expense(data, expense_id): Observable<any> {
    var test = {
      payment_status: data
    }
    console.log(test)
    return this.http.put<any>(this.url + '/update_expense/' + expense_id, test);
  } 

  editExpenses(data, expense_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_expenses/' + expense_id, data);
  } 

  deleteExpenses(expense_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_expenses/' + expense_id, this.empty_data);
  } 

  // Claims
  getClaims(): Observable<any> {
    return this.http.get<any>(this.url + '/claims/' + this.school_id);
  } 
  
  addClaims(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/claims/' + this.school_id, data);
  } 

  update_claim(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/update_claim/' + this.school_id, data);
  } 

  editClaims(data, claim_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_claims/' + claim_id, data);
  } 

  deleteClaims(claim_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_claims/' + claim_id, this.empty_data);
  } 
  
}
