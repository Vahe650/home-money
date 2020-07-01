import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[wfmDropdown]'
})

export class DropdownDirective {

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') onCLick() {
    this.isOpen = !this.isOpen;
  }

}
