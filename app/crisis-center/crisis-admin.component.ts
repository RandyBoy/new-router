import { Component }         from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { DynamicFormComponent }     from '../question/dynamic-form.component';
import { QuestionService } from '../question/question.service';
import { HeroFormComponent } from '../heros/hero-form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <div class="row main"> 
      <div class="home col-md-5">
        <h3>DynamicFormComponent</h3>
        <dynamic-form [questions]="questions"></dynamic-form>
      </div>
       <div class="home col-md-5">
        <h3>FormComponent</h3>
        <hero-form></hero-form>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  directives: [ROUTER_DIRECTIVES, DynamicFormComponent, HeroFormComponent],
  providers: [QuestionService]
})

export class CrisisAdminComponent {
  questions: any[];
  /**
   *
   */
  constructor(private questionService: QuestionService,
    private activeRoute: ActivatedRoute) {
    this.questions = questionService.getQuestions();
  }

  ngOnInit() {
    this.activeRoute
      .data
      .subscribe(
      (res) => console.log(res));
  }
}