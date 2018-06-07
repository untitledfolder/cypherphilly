import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  private API = "api";
  private DATA = "/data";

  constructor() { }

  getAPI() {
    return this.API;
  }

  getDATA() {
    return this.API + this.DATA;
  }

}
