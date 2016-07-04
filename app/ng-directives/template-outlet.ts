//our root app component
import {Component} from '@angular/core'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'template-outlet',
  providers: [],
  template: `
    <div>
      <h2>Hello {{name}}</h2>
      <template #hpReasons let-image="image" let-heading="heading">
        <div class="inner">>
          <blockquote>
            <p>{{image}}</p>
            <footer>
              <cite>
                <div class="subheading">{{heading}}</div><small>iQuate</small>
              </cite>
            </footer>
          </blockquote>
        </div>
      </template>

      <template [ngTemplateOutlet]="hpReasons" [ngOutletContext]="(homepage_reasons | async)[2]"></template>
      <template [ngTemplateOutlet]="hpReasons" [ngOutletContext]="(homepage_reasons | async)[0]"></template>

    </div>
  `,
  directives: []
})
export class TemplateOutlet {
  name: string;
  get homepage_reasons() {
    return Observable.of([{
      "id": 1,
      "color": "",
      "heading": "section one",
      "paragraph": "<p>\n quote goes here\n      <\/p>",
      "image": "http:\/\/www.site.com\/\/2016-06\/9emjhxh4ch3nlbrkpph90v3spzkc1msw9dhm7op9.png"
    }, {
        "id": 2,
        "color": "",
        "heading": "section two",
        "paragraph": "<p>\n quote goes here\n      <\/p>",
        "image": "http:\/\/www.site.com\/\/2016-06\/9emjhxh4ch3nlbrkpph90v3spzkc1msw9dhm7op9.png"
      }, {
        "id": 3,
        "color": "",
        "heading": "section three",
        "paragraph": "<p>\n quote goes here\n      <\/p>",
        "image": "http:\/\/www.site.com\/\/2016-06\/9emjhxh4ch3nlbrkpph90v3spzkc1msw9dhm7op9.png"
      }]
    );
  }
  constructor() {
    this.name = 'Angular2 (Release Candidate!)'
  }
}