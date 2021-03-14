import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConfirmServiceService {

  private subject = new Subject<any>();

  constructor() { }
// common conform service popup ,on delete operation 
  confirm(message: string, yesFn: () => void, noFn: () => void) {
      this.setConfirmation(message, yesFn, noFn);
  }
  setConfirmation(message: string, yesFn: () => void, noFn: () => void) {
      let that = this;
      this.subject.next({
          type: 'confirm',
          text: message,
          yesFn:
              function () {
                  that.subject.next();
                  yesFn();
              },
          noFn: function () {
              that.subject.next();
              noFn();
          }
      });

  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
}
