import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CanComponentLeave } from '../_helpers/canComponentLeave';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<CanComponentLeave> {
  canDeactivate(component: CanComponentLeave):  boolean{  
    return component.canLeave();
  }
  
}
