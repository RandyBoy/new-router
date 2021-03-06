import { Component, ElementRef, Inject, ReflectiveInjector, provide, ComponentFactoryResolver, Attribute} from '@angular/core';
import {JsonPipe} from '@angular/common';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { CORE_DIRECTIVES } from '@angular/common';
import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import {AuthService} from './auth.service';
import * as Rx from 'rxjs/rx';
import { AsyncValidatorFn } from '@angular/forms/src/directives/validators';
import {FocusDirective  } from '../directives/FocusDirective';
import {isBlank, isPresent, isPromise, isString} from '@angular/core/src/facade/lang';

import {BehaviorSubject} from 'rxjs/rx';
import {dom} from '../utils/dom-service';
import {Base2} from '../base2';

declare var System: any;


@Component({
    moduleId: module.id,
    selector: 'login',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FocusDirective],
    templateUrl: (() => { return './login.html'; })(),
    providers: [FormBuilder],
    pipes: [JsonPipe]
})
export class Login extends Base2 {
    elementRef: ElementRef;
    loginForm: FormGroup;
    defaultPage: string = '/crisis-center';
    targetPage: string = null;
    loginModel: string;
    loginControl: FormControl = new FormControl('');
    // domAdapter: DomAdapter;
    nameGroup = new FormGroup({
        first: new FormControl('', Validators.required),
        middle: new FormControl(''),
        last: new FormControl('', [Validators.required, Validators.pattern(`${'^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$'}`)])
    });
    //((\\d{11})|^((\\d{7,8})|(\\d{4}|\\d{3})-(\\d{7,8})|(\\d{4}|\\d{3})-(\\d{7,8})-(\\d{4}|\\d{3}|\\d{2}|\\d{1})|(\\d{7,8})-(\\d{4}|\\d{3}|\\d{2}|\\d{1}))$)

    a$: BehaviorSubject<any> = new BehaviorSubject<any>(0);
    b$: BehaviorSubject<any> = new BehaviorSubject<any>(0);
    c$: Rx.Observable<any>;


    myForm: FormGroup = new FormGroup({
        name: this.nameGroup,
        food: new FormControl()
    });

    pattern(pattern: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (isPresent(Validators.required(control))) return null;
            let regex = new RegExp(`${pattern}`);
            console.log(regex);
            let v: string = control.value;
            return regex.test(v) ? null :
                { 'pattern': { 'requiredPattern': `^${pattern}$`, 'actualValue': v } };
        };
    }


    constructor(
        private router: Router,
        @Inject(ElementRef) elementRef: ElementRef, private cfr: ComponentFactoryResolver,
        private activeRoute: ActivatedRoute,
        private authService: AuthService,
        private builder: FormBuilder) {
        super();
        console.log(cfr);
        this.elementRef = elementRef;
        // [focus]='true'

        this.c$ = Rx.Observable
            .concat(this.a$, this.b$)
            .reduce((x, y) => x + y, 0);
        this.c$.subscribe(x => console.log(x));


        this.loginForm = builder.group({
            login: ["", Validators.required],
            passwordRetry: builder.group({
                password: ["", Validators.required],
                passwordConfirmation: ["", Validators.required]
            }, { validator: this.areEqual })
        });
        // let args = 'foo=1,bar=2,baz=3';
        // aa.createHmac('sha1', 'app_secret').update(args).digest().toString('base64');
        //验证
        // builder.group({
        //     name: ['', Validators.required],
        //     email: ['', Validators.required],
        //     matchingPassword: builder.group({
        //         password: ['', Validators.required],
        //         confirmPassword: ['', Validators.required]
        //     }, { validator: this.areEqual })
        // });
        this.activeRoute
            .params
            .map(p => p['targetpage'])
            .subscribe(url => {
                if (url) this.targetPage = url;
            })
        console.log(this.activeRoute.data);

        this.activeRoute.data.subscribe((data) => {
            console.log(data);
            data['resdata'].then(res => console.log(res.someone));

        });


        // this.router.routerState
        //     .queryParams
        //     .map(p => p['targetpage']).subscribe(url => {
        //         if (url) this.targetPage = url;
        //     });
    }

    get passValid() {
        return (this.loginForm.controls['passwordRetry'].valid);
    }

    areEqual(group: FormGroup) {
        let valid = false;
        let val: any;
        for (name in group.controls) {
            if (val) {
                if (group.controls[name].value == val) {
                    valid = true;
                    continue;
                } else {
                    break;
                }
            }
            valid = false;
            val = group.controls[name].value;
        }
        if (valid) {
            return null;
        }
        return {
            areEqual: true
        };
    }

    login(event: any, username: any, password: any): Rx.Observable<boolean> | boolean {
        // event.preventDefault();
        this.authService
            .login(username, password)
            .then(() => {
                this.router
                    .navigateByUrl(this.targetPage ? this.targetPage : this.defaultPage);
                return true;
            });
        return false;
    }

    signup(event: Event) {
        //  event.preventDefault();
        this.router.navigateByUrl('/signup');
    }
    get value(): string {
        return JSON.stringify(this.loginForm.value, null, 2);
    }

    get myform() {
        return JSON.stringify(this.myForm);
    }

    ngOnInit() {

        // let el: any;
        // this.domAdapter.querySelector(this.elementRef, '#username').focus();
        dom.querySelector(this.elementRef.nativeElement, '#username').focus();
        //  this.domAdapter.invoke(el, 'focus', []);
        //jQuery('#username').focus();
        // console.log(document.querySelector('#username'));

        // console.log($('#username'));

        // System.import('jquery')
        //     .then(($) => {
        //         console.log($('#username'));
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });

        let injector = ReflectiveInjector.resolveAndCreate([
            { provide: "validToken", useValue: "Value" }
        ]);

        // expect(injector.get("validToken")).toEqual("Value");
        // expect(() => injector.get("invalidToken")).toThrowError();

    }
}
