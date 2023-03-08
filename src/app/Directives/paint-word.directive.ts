import {Directive, ElementRef, Input, OnInit, Renderer2} from "@angular/core";

@Directive({
  selector: '[paintWord]'
})
export class PaintWordDirective implements OnInit {
  @Input() posError: Array<string> = [];
  @Input() currentIndex: number = 0;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.posError.forEach((item) => {
      if ((this.currentIndex + 1).toString() === item) {
        this.renderer.setStyle(this.elRef.nativeElement, 'color', '#e95d0f');
      }
    })
  }
}
