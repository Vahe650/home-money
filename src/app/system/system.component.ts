import {Component, HostBinding} from '@angular/core';
import {fadeStateTriger} from '../shared/animations/fade.animation';

@Component({
  selector: 'wfm-system',
  templateUrl: './system.component.html',
  animations: [fadeStateTriger]
})
export class SystemComponent {
  @HostBinding('@fade') a = true;

}
