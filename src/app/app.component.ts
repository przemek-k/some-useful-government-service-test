import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

/////////////////////////
// ** MAIN APP COMPONENT **
@Component({
  selector: 'app', // <app></app>
  directives: [],
  styles: [`
    .checkbox-inline { padding-left: 0; }
    .form-horizontal .control-label { text-align: left; }
  `],
  template: `
    <div class="container">
      <div [hidden]="success">
        <h2>Some Useful Government Service</h2>
        <form class="form-horizontal" *ngIf="active" (ngSubmit)="onSubmit(heroForm, model)" #heroForm="ngForm" novalidate>
          <div class="form-group">
            <label for="name" class="col-sm-2 control-label">Name</label>
            <div class="col-sm-6">
              <input class="form-control"
                     type="text"
                     class="form-control"
                     required
                     [(ngModel)]="model.name"
                     ngControl="name"
                     #name="ngForm"
                     placeholder="Name"
                     minlength="2">
              <div [hidden]="!submitted || name.valid" class="alert alert-danger">
                Name is required
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">Sex</label>
            <div class="col-sm-6">
                 <label class="checkbox-inline">
                   <input #male name="sex" type="radio" value="Male" (click)="model.sex = male.value" required/>
                   Male
                 </label>
                 <label class="checkbox-inline">
                   <input #female name="sex" type="radio" value="Female" (click)="model.sex = female.value" required/>
                   Female
                 </label>
                 <div [hidden]="!submitted || model.sex !== ''" class="alert alert-danger">
                   Sex is required
                 </div>
            </div>
          </div>

          <div class="form-group">
            <label for="age" class="col-sm-2 control-label">Age</label>
            <div class="col-sm-6">
              <input class="form-control"
                     type="number"
                     class="form-control"
                     required
                     [(ngModel)]="model.age"
                     ngControl="age"
                     #age="ngForm"
                     placeholder="Age">
              <div [hidden]="!submitted || age.valid" class="alert alert-danger">
                Age is required
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="country" class="col-sm-2 control-label">Country</label>
            <div class="col-sm-6">
              <select class="form-control" required
                [(ngModel)]="model.country"
                  ngControl="country" #country="ngForm" >
                <option [value]="null">Choose country</option>
                <option *ngFor="let c of countries" [value]="c.name">{{c.name}}</option>
              </select>
              <div [hidden]="!submitted || country.valid" class="alert alert-danger">
                Country is required
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-6">
              <button type="submit" class="btn btn-default">Apply</button>
            </div>
          </div>
        </form>
      </div>

      <div [hidden]="!success">
        <h2>Application Complete</h2>
        <p>{{model.name}} thank you for applying to this useful gevernment service</p>
      </div>
    </div>
  `
})
export class App {
  countries = [];
  submitted = false;
  success = false;
  active = true;
  model = {
    name: '',
    sex: '',
    age: null,
    country: null
  };

  onSubmit(form, model) {
    var data = JSON.stringify({
      name: model.name,
      sex: model.sex,
      age: model.age,
      country: model.country,
      dateCreated: new Date().getTime()
    });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.submitted = true;

    if(form.valid && model.sex) {
      this.http.post('/data', data, options)
        .subscribe(res => {
          this.success = true;
        });
    }
  }

  constructor(public http: Http) { }

  ngOnInit() {
    // use services for http calls
    this.http.get('https://restcountries.eu/rest/v1/region/Europe')
      .subscribe(res => {
        this.countries = res.json();
      });
  }
}
