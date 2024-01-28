import { AfterViewInit, Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[make-readability]'
})
export class ImproveReadabilityDirective implements OnInit, AfterViewInit {
    private text: string = "";

    setText(text: string) {
        this.text = text;
    }

    getText(): string {
        return this.text;
    }

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2
    ){}

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.setText(this.renderer.createText(this.elRef.nativeElement.textContent.trim()).wholeText);
        this.setText(this.getText().replace(/(?<!,) +/g,';  '));
        console.log(this.getText());
        this.elRef.nativeElement.textContent = this.getText();
    }
}
