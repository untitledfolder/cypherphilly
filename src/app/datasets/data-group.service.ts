import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { DataService } from '../data/data.service';

import { DataGroup } from './data-group';

@Injectable()
export class DataGroupService implements Resolve<DataGroup>{

  constructor(
    private data: DataService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<DataGroup> | Promise<DataGroup> {
    return route.parent.data.datagroups.filter(
      group => route.params['groupid'] === group.key
    )[0];
  }

}
