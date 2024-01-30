import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpApiService {
  staticserverurl: string = "http://localhost:3000";

  constructor(public http: HttpClient) { }


  postRequestToBackend = (serverpath: any, postData: any): Observable<any> => {
    console.log(this.staticserverurl + serverpath,postData)
    return this.http.post<any>(this.staticserverurl + serverpath, postData)
  }

  deleteRequestToBackend = (serverpath: any, deleteData : any): Observable<any> => {
    console.log(this.staticserverurl+ serverpath,deleteData)
    return this.http.delete<any>(this.staticserverurl + serverpath,deleteData)
  }
}
