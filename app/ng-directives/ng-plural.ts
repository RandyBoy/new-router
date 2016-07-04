import { Component} from '@angular/core';
import { NgLocalization, NgPlural, NgPluralCase, COMMON_PIPES} from '@angular/common';

class MyLocalization extends NgLocalization {
    getPluralCategory(value: any) {
        if (value < 5) {
            return 'few';
        }
    }
}

@Component({
    selector: 'ng-plural',
    providers: [{ provide: NgLocalization, useClass: MyLocalization }],
    template: `
      <p>Value = {{value}}</p>
      <div>
        {{ gender | i18nSelect: inviteMap }}
        {{ messages.length | i18nPlural: messageMapping }}
      </div>
      <button (click)="inc()">Increment</button>
 
      <div [ngPlural]="value">
        <template ngPluralCase="=0">there is nothing</template>
        <template ngPluralCase="=1">there is one</template>
        <template ngPluralCase="few">there are a few</template>
        <template ngPluralCase="other">there is some number</template>
      </div>
    `,
    directives: [NgPlural, NgPluralCase],
    pipes: [COMMON_PIPES]

})

export class i18nPlural {
    value: any = 'init';
    inc() {
        this.value = this.value === 'init' ? 0 : this.value + 1;
    }

    gender: string = 'male';
    inviteMap: any = {
        'male': 'Invite her.',
        'female': 'Invite him.',
        'other': 'Invite them.'
    }
    messages: any[];
    messageMapping: { [k: string]: string } = {
        '=0': 'No messages.',
        '=1': 'One message.',
        'other': '# messages.'
    }

}
