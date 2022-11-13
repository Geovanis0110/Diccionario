import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {SharedData} from "../../Services/shared-data.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import * as MyIcons from "../../Icons/icons";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";


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
              private snackbar: MatSnackBar,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('menu_book', sanitizer.bypassSecurityTrustHtml(MyIcons.MENU_BOOK_ICON));
    iconRegistry.addSvgIconLiteral('movies', sanitizer.bypassSecurityTrustHtml(MyIcons.MOVIE_ICON));
    iconRegistry.addSvgIconLiteral('image', sanitizer.bypassSecurityTrustHtml(MyIcons.IMAGE_ICON));
    iconRegistry.addSvgIconLiteral('info', sanitizer.bypassSecurityTrustHtml(MyIcons.INFO_ICON));
    iconRegistry.addSvgIconLiteral('help', sanitizer.bypassSecurityTrustHtml(MyIcons.HELP_ICON));
    iconRegistry.addSvgIconLiteral('leaderboard', sanitizer.bypassSecurityTrustHtml(MyIcons.LEADER_BOARD_ICON));
    iconRegistry.addSvgIconLiteral('close', sanitizer.bypassSecurityTrustHtml(MyIcons.CLOSE_ICON));
    iconRegistry.addSvgIconLiteral('segment', sanitizer.bypassSecurityTrustHtml(MyIcons.SEGMENT_ICON));
    iconRegistry.addSvgIconLiteral('menu', sanitizer.bypassSecurityTrustHtml(MyIcons.MENU_ICON));
    iconRegistry.addSvgIconLiteral('manage_search', sanitizer.bypassSecurityTrustHtml(MyIcons.MANAGE_SEARCH_ICON));
    iconRegistry.addSvgIconLiteral('more_vert', sanitizer.bypassSecurityTrustHtml(MyIcons.MORE_VERT_ICON));
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
      this._shareD.advanceSearchActivated.emit(this.isChecked);
      if(this.isChecked){
        this.snackbar.open('Busqueda Avanzada Activada','', {
          duration: 2 * 1000
        })
      }else{
        this.snackbar.open('Busqueda Normal Activada', '', {
          duration: 2 * 1000
        })
      }
  }
}
