import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';

@Injectable()
export class DataService {

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  getData(url: string): Promise<any> {
    return this.http.get(this.config.getAPI() + url)
    .toPromise();
  }

}
