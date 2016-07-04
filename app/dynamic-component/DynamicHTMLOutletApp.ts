import { Component } from '@angular/core';
import { DynamicHtmlOutlet } from './DynamicHTMLOutlet';
import { BasicFormMux } from './DynamicHTMLOutlet';
import { TemplatePortalDirective, PortalHostDirective } from '../core/portal/portal-directives';
import { ComponentPortal, TemplatePortal } from '../core/portal/portal';

@Component({
    moduleId: module.id,
    selector: 'dynamic-HTML-Outlet-App',
    template: `
        <dynamic-html-outlet [src]="html"> </dynamic-html-outlet>
       <basic-form-mux [template]="html2"> </basic-form-mux>
    `,
    directives: [DynamicHtmlOutlet, BasicFormMux]
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