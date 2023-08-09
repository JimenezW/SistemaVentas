import { Injectable } from '@angular/core';
import icedit from '@iconify/icons-ic/round-edit';
import icdelete from '@iconify/icons-ic/round-delete';
@Injectable({
  providedIn: 'root'
})
export class IconsService {

  constructor() { }

  getIcon(icon:string){

    switch(icon){
      case 'icEdit':
        return icedit;
      case 'icDelete':
        return icdelete;
    }
    
  }
}
