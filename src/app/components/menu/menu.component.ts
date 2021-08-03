import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../core/services';
import { MainserviceService } from '../../services/mainservice.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  path = '';
  constructor(private es: ElectronService, public ms: MainserviceService) { }

  ngOnInit(): void {
  }

  openFolder = () => {
    console.log('open Folder');
    const path = this.es.ipcRenderer.sendSync('openFolder', { data: 'prout' });
    console.log(path);
    this.path = path[0];
    this.ms.files = this.es.ipcRenderer.sendSync('listFiles',{path: this.path});
  };

}
