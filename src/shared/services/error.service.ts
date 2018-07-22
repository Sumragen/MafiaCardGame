import {Injectable} from "@angular/core";
import {ToastController, Toast} from "ionic-angular";
@Injectable()
export class ErrorService {
  private toast: Toast;

  constructor(private toastService: ToastController) {

  }

  show(msg: string) {
    this.hide();
    this.toast = this.toastService.create({
      message: msg,
      duration: 3000,
      dismissOnPageChange: true
    });
    this.toast.present();
  }

  hide(): void {
    if (!!this.toast) {
      this.toast.dismissAll();
    }
  }
}
