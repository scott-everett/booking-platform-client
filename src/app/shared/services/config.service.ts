import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

// Holds app config data - I would normally read this from a file like in
// https://aclottan.wordpress.com/2016/12/30/load-configuration-from-external-file/
export class ConfigService {
  constructor() {}

  public apiBaseUrl: string = 'https://localhost:44339/api';
  public snackBarDisplayTime: number = 7000;
}
