import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';

@Injectable()
export class TableService {

  headers = [
    "cartodb_id",
    "cap_number",
    "date_received",
    "dist_occurrence",
    "general_cap_classification",
    "summary"
  ]

  private dataUrl: string;

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) {
    this.dataUrl = config.getAPI() + '/police_complaints';
  }

  getData(): Promise<any> {
    return this.http.get(this.dataUrl)
    .toPromise()
    .then(data => {
      return data['records'].map(i => i.keys.reduce((dataObject, key, j) => { dataObject[key] = i._fields[j]; return dataObject}, {}));
    });
  }

  getHeaders(): Observable<any[]> {
    return of(this.headers);
  }

}
