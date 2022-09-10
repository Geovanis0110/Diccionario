import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";



@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  Icon: string = 'menu_book_FILL0_wght400_GRAD0_opsz48.svg';
  isHide: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIcon(
      'menu-icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/menu_FILL0_wght400_GRAD0_opsz48.svg')
    )
    this.iconRegistry.addSvgIcon(
      'video-icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/movie_FILL0_wght400_GRAD0_opsz48.svg')
    )
    this.iconRegistry.addSvgIcon(
      'image-icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/image_FILL0_wght400_GRAD0_opsz48.svg')
    )
    this.iconRegistry.addSvgIcon(
      'help-icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/help_FILL0_wght400_GRAD0_opsz48.svg')
    )
    this.iconRegistry.addSvgIcon(
      'search-icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/search_FILL0_wght400_GRAD0_opsz48.svg')
    )
    this.iconRegistry.addSvgIcon(
      'info-icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/info_FILL0_wght400_GRAD0_opsz48.svg')
    )
    this.iconRegistry.addSvgIcon(
      'estadistics-icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/leaderboard_FILL0_wght400_GRAD0_opsz48.svg')
    )
    this.iconRegistry.addSvgIcon(
      'exit-icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/exit_to_app_FILL0_wght400_GRAD0_opsz48.svg')
    )
    this.iconRegistry.addSvgIcon(
      'diccionary-icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/menu_book_FILL0_wght400_GRAD0_opsz48.svg')
    )
  }


  hideLinks(){
    if(this.isHide == false){
      this.isHide = true;
    }else{
      this.isHide = false;
    }

  }
}
