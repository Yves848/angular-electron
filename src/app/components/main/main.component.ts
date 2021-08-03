import { Component, OnInit } from '@angular/core';
import { ElectronService } from './../../core/services/electron/electron.service';
import { MainserviceService } from './../../services/mainservice.service';
import { iMediaFile } from '../../../../app/Intefaces/interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  path = '';
  clonedFiles: { [i: number ]: iMediaFile } = {};

  constructor(private es: ElectronService, public ms: MainserviceService) {}


  onRowEditInit(file: iMediaFile) {
    this.clonedFiles[file.id] = {...file};
}

onRowEditSave(file: iMediaFile) {
    delete this.clonedFiles[file.id];
        //this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});

}

onRowEditCancel(file: iMediaFile, index: number) {
    this.ms.files[index] = this.clonedFiles[file.id];
    delete this.clonedFiles[file.id];
}

  ngOnInit(): void {}
}
