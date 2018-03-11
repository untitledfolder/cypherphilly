import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  private API = "api";

  constructor() { }

  getAPI() {
    return this.API;
  }

}
