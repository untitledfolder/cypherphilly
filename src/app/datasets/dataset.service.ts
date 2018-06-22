import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { DataService } from '../data/data.service';

import { DataGroup } from './data-group';
import { Dataset } from './dataset';

@Injectable()
export class DatasetService implements Resolve<Dataset>{

  constructor(
    private data: DataService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Dataset> | Promise<Dataset> {
    return route.parent.data.datagroup.datasets.filter(
      dataset => route.params['setid'] === dataset.key
    )[0];
  }

}
