import { ToastrManager } from 'ng6-toastr-notifications';
import { ErrorHandler, Injector, Inject } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
  constructor(@Inject(Injector) private injector: Injector) { }

  private get toastr(): ToastrManager {
    return this.injector.get(ToastrManager);
  }
  handleError(error) {
    //  this.toastr.errorToastr('An unexpected error occured.');
    console.log(error);
  }
}

