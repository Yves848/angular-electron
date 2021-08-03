import { Injectable } from '@angular/core';
import { iMediaFile } from '../../../app/Intefaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MainserviceService {
  files: iMediaFile[] = [];
  constructor() { }
}
