import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
// // import { Subject } from 'rxjs/Subject';
// import { from } from 'rxjs';
// import 'rxjs/operator';
// // import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfirmServiceService {

  private subject = new Subject<any>();

  constructor() { }

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
