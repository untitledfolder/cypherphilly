import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  private dataUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.dataUrl = '/api';
    console.log("Data Service");
  }

  getData(url: string): Promise<any> {
    return this.http.get(this.dataUrl + url).toPromise();
  }

  getDatasets(): Promise<any> {
    return this.getData('/datasets');
  }

}
