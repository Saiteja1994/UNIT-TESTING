import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  constructor(public http : HttpClient) { }

  saveStudentInfo(info:any):any {
    return this.http.post("https://localhost:4200/",info)
  }
}
