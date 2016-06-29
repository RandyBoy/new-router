import { getDOM, DomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter'

export function DomService() {
    BrowserDomAdapter.makeCurrent();
    return getDOM();
}

export var dom = DomService();