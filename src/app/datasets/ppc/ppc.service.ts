import { Injectable } from '@angular/core';

import { DataService } from '../../data/data.service';

@Injectable()
export class PpcService {

  private dataUrl: string;

  constructor(
    private data: DataService
  ) {
    this.dataUrl = '/police_complaints';
  }

  getData(): Promise<any> {
    return this.data.getData(this.dataUrl);
  }

}
