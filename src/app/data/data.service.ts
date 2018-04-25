import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';

@Injectable()
export class DataService {

  private dataUrl: string;

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) {
    this.dataUrl = config.getAPI();
  }

  getData(url: string): Promise<any> {
    return this.http.get(this.dataUrl + url).toPromise();
  }

}
