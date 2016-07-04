import { Component } from '@angular/core';
import { UnlessDirective } from '../directives/unless-directive';
import { DynamicHtmlOutlet } from './DynamicHTMLOutlet';
import { BasicFormMux } from './basic-form-mux';

@Component({
    moduleId: module.id,
    selector: 'dynamic-Html-outlet-app',
    template: `
        <dynamic-html-outlet [src]="html"> </dynamic-html-outlet>
        <basic-form-mux [template]="html2"> </basic-form-mux>
    `,
    directives: [DynamicHtmlOutlet, BasicFormMux,UnlessDirective]
})
export class DynamicHTMLOutletApp {
    html = `<div class="login center-block col-md-4 ">
            <h1>动态创建登录组件A</h1>
    <form #f="ngForm" (ngSubmit)="login(f.value)">
        <div ngModelGroup="credentials" class="form-group">
            <label for="username">用户</label>
            <input type="text" id='username' name='username' ngModel required class="form-control" placeholder="Username">
            <label for="password">密码</label>
            <input type="password" name='password' ngModel required class="form-control" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-default btn-primary">登录</button>
        <button [routerLink]="['/signup']" class="btn btn-success">注册</button>
    </form>
    </div>
    `;

    html2 = `<div class="login center-block col-md-4 ">
            <h1>动态创建登录组件B</h1>
    <form #f="ngForm" (ngSubmit)="login(f.value)">
        <div ngModelGroup="credentials" class="form-group">
            <label for="username">用户</label>
            <input type="text" id='username' name='username' ngModel required class="form-control" placeholder="Username">
            <label for="password">密码</label>
            <input type="password" name='password' ngModel required class="form-control" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-default btn-primary">登录</button>
        <button [routerLink]="['/signup']" class="btn btn-success">注册</button>
    </form>
    </div>
    `;
}