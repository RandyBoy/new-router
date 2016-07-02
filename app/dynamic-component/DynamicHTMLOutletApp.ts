import { Component } from '@angular/core';
import { DynamicHTMLOutlet } from './DynamicHTMLOutlet';
import { BasicFormMux } from './DynamicHTMLOutlet';

@Component({
    selector: 'dynamic-HTML-Outlet-App',
    template: `
        <dynamic-html-outlet [src]="html">
             <basic-form-mux [template]="html2"> </basic-form-mux>
        </dynamic-html-outlet>
       
    `,
    directives: [DynamicHTMLOutlet, BasicFormMux]
})
export class DynamicHTMLOutletApp {
    html = `<div>
                <p>Dynamic HTML Fragment</p>
            </div>`;

    html2 = `<div>
                <p>Dynamic HTML Fragment2</p>
            </div>`;
}