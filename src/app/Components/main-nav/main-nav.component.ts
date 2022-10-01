import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {SharedData} from "../../Services/shared-data";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  Icon: string = 'menu_book_FILL0_wght400_GRAD0_opsz48.svg';
  isChecked: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private _shareD: SharedData,
              private snackbar: MatSnackBar) {
  }

  // hideLinks() {
  //   if (this.isHide == false) {
  //     this.isHide = true;
  //   } else {
  //     this.isHide = false;
  //   }
  // }

  onActivateAdvSearch(){
    this.isChecked ? this.isChecked = false : this.isChecked = true;
      this._shareD.behaviorSub.next(this.isChecked);
      if(this.isChecked){
        this.snackbar.open('Busqueda Avanzada Activada','none', {
          duration: 2 * 1000
        })
      }else{
        this.snackbar.open('Busqueda Normal Activada', '', {
          duration: 2 * 1000
        })
      }
  }
}
