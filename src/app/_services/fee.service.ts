import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  constructor(private http: HttpClient) { }

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private token = appConfig.token;
  empty_data = { };

  // Fee Terms
  getFeeTerms(): Observable<any> {
    return this.http.get<any>(this.url + '/fee_types/' + this.school_id);
  }

  addFeeTerms(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/fee_types/' + this.school_id, data)
  }

  editFeeTerms(data, fee_types_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_fee_types/' + fee_types_id, data)
  }

  deleteFeeTerms(fee_types_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_fee_types/' + fee_types_id, this.empty_data)
  }

  // Fee Types
  getFeeTypes(): Observable<any> {
    return this.http.get<any>(this.url + '/fee_types/' + this.school_id);
  }

  addFeeTypes(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/fee_types/' + this.school_id, data)
  }

  editFeeTypes(data, fee_types_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_fee_types/' + fee_types_id, data)
  }

  deleteFeeTypes(fee_types_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_fee_types/' + fee_types_id, this.empty_data)
  }

  // Class Fee  
  getClassFee(class_id): Observable<any> {
    return this.http.get<any>(this.url + '/class_fee/' + class_id);
  }

  addClassFee(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/class_fee/' + this.school_id, data)
  }

  editClassFee(data, class_fee_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_class_fee/' + class_fee_id, data)
  }

  deleteClassFee(class_fee_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_class_fee/' + class_fee_id, this.empty_data)
  }

  // Fee Structure  
  getClassFeeStructure(class_id): Observable<any> {
    return this.http.get<any>(this.url + '/class_Feestructure/' + class_id);
  }

  getFeeStructure(installment_type, class_id, fee_Type): Observable<any> {
    return this.http.get<any>(this.url + '/fee_structure/' + installment_type + '/' + class_id + '/' + fee_Type);
  }

  addFeeStructure(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/fee_structure/' + this.school_id, data)
  }

  editFeeStructure(data, fee_structure_id): Observable<any> {
    console.log(data)
    return this.http.put<any>(this.url + '/edit_fee_structure/' + fee_structure_id, data)
  }

  deleteFeeStructure(fee_structure_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_fee_structure/' + fee_structure_id, this.empty_data)
  }

  // Fee Master  
  getFeeMaster(): Observable<any> {
    return this.http.get<any>(this.url + '/class_fee/' + this.school_id);
  }

  addFeeMaster(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/class_fee/' + this.school_id, data)
  }

  editFeeMaster(data, class_fee_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_class_fee/' + class_fee_id, data)
  }

  deleteFeeMaster(class_fee_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_class_fee/' + class_fee_id, this.empty_data)
  }

  // Student Fee

  addStudentFee(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/student_fee/' + this.school_id, data)
  }

  editStudentFee(data, studentFee_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_studentFee/' + studentFee_id, data)
  }

  deleteStudentFee(studentFee_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_studentFee/' + studentFee_id, this.empty_data)
  }

  addPaymentMode(data, student_id): Observable<any> {
    return this.http.put<any>(this.url + '/student_paymentMode/' + student_id + '/' + this.school_id, data)
  }

  // Fee Structure
  getCollectedFee(selected_student): Observable<any> {
    return this.http.get<any>(this.url + '/fee_collection/' + selected_student);
  }

  addCollectedFee(data, selected_student): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/fee_collection/' + selected_student, data)
  }

  getInstallmentFees(student_id, class_id, installment, fee_types_id): Observable<any> {
    return this.http.get<any>(this.url + '/fee_structure/' + student_id + '/' + class_id + '/' + installment + '/' + fee_types_id);
  }

  getStudent_FeeType(selected_student, fee_type, class_id): Observable<any> {
    return this.http.get<any>(this.url + '/student_typewise_fee_details/' + selected_student + '/' + fee_type + '/' + class_id);
  }

  getStudent_installmentFees(selected_student, fee_type, installment, class_id): Observable<any> {
    return this.http.get<any>(this.url + '/student_installment_fee_details/' + selected_student + '/' + fee_type + '/' + installment + '/' + class_id);
  }

  getStudent_term_type_fee(selected_student, fee_term, fee_type, class_id): Observable<any> {
    return this.http.get<any>(this.url + '/student_term-typewise_fee_details/' + selected_student + '/' + fee_term + '/' + fee_type + '/' + class_id);
  }

  getStudent_fee(selected_student, class_id): Observable<any> {
    return this.http.get<any>(this.url + '/student_termwise_fee_details/' + selected_student + '/' + class_id + '/' + this.school_id);
  }

  getClass_fee(selected_section, fee_type, fee_term): Observable<any> {
    return this.http.get<any>(this.url + '/section_student_fee_paid_details/' + selected_section + '/' + fee_type + '/' + fee_term);
  }

  getDay_fee(select_date): Observable<any> {
    return this.http.get<any>(this.url + '/fee_by_Date/' + select_date + '/' + this.school_id);
  }

  getMonth_fee(select_month): Observable<any> {
    return this.http.get<any>(this.url + '/fee_by_Month/' + select_month + '/' + this.school_id);
  }

}
