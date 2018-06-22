import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { DataService } from '../data/data.service';

import { DataGroup } from './data-group';

@Injectable()
export class DatasetsService implements Resolve<DataGroup[]>{

  private datagroups: DataGroup[];

  constructor(private data: DataService) { }

  resolve(): Observable<DataGroup[]> | Promise<DataGroup[]> {

    return this.datagroups ?
      Observable.of(this.datagroups) :
      this.data.getData('/datasets')
      .then((response: DataGroup[]) => {
        this.datagroups = response;

        return this.datagroups;
      });
  }

}
