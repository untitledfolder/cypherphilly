import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';

@Injectable()
export class TableService {

  headers = [
    {
      title: "ID",
      key: "cartodb_id"
    },
    {
      title: "CAP Number",
      key: "cap_number"
    },
    {
      title: "Received",
      key: "date_received"
    },
    {
      title: "Distance",
      key: "dist_occurrence"
    },
    {
      title: "Classification",
      key: "general_cap_classification"
    },
    {
      title: "Summary",
      key: "summary"
    }
  ]

  private dataUrl: string;

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) {
    this.dataUrl = config.getAPI() + '/police_complaints';
  }

  getData(): Promise<any> {
    return this.http.get(this.dataUrl).toPromise();
  }

  getHeaders(): Observable<any[]> {
    return of(this.headers);
  }

}
