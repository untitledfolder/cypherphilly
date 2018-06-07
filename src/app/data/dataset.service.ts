import { Injectable } from '@angular/core';

import { DataService } from './data.service';

@Injectable()
export class DatasetService {

  private datasets;

  constructor(private data: DataService) { }

  getDatasets(): Promise<any> {

    return this.datasets ?
      Promise.resolve(this.datasets) :
      this.data.getData('/datasets')
      .then(response => {
        this.datasets = response;
        return this.datasets;
      });
  }

}
