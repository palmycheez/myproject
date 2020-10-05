import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  mode: string = 'PRODUCTION' // DEVELOPMENT , PRODUCTION


  constructor() { }
}
