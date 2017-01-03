import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Rx';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form_: FirebaseObjectObservable<any> = null;
  form$: Subscription = null;
  form: IForm = null;

  sections: ISection[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private af: AngularFire) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.form_ = af.database.object('/forms/' + params.slug);
      this.form$ = this.form_.subscribe((form: any) => {
        if (form.$exists()) {
          console.log('Form', form);
          this.form = new Form(form);
        } else {
          this.router.navigate(['/']);
        }
      });
    });
  }

  ngOnInit() {
  }
}

export interface IForm {
  title: string;
  brief: string;
  description: string;
  banner: string | boolean;
  sections: ISection[];
}

export interface ISection {
  description: string;
  fields: IField[];
  order: number;
  title: string;
  image: string | boolean;
}

export interface IField {
  label: string;
  config: any;
  type: string;
  order: number;
}

export class Form implements IForm {
  title: string;
  brief: string;
  description: string;
  banner: string | boolean;
  sections: ISection[];

  constructor(form: IForm){
    this.title = form.title || '';
    this.brief = form.brief || '';
    this.description = form.description || '';
    this.banner = form.banner || false;

    this.sections = [];
    Object.keys(form.sections).forEach((sectionKey) => {
      var section = form.sections[sectionKey];
      this.sections.push(new Section(section));
    });

    this.sections = this.sections.sort((a: ISection, b: ISection) => {
      return a.order > b.order ? 1 : a.order < b.order ? -1 : 0;
    });
  }
}

export class Section implements ISection {
  description: string;
  fields: IField[];
  order: number;
  title: string;
  image: string | boolean;

  constructor(section: ISection){
    this.description = section.description || '';
    this.order = section.order;
    this.title = section.title || '';
    this.image = section.image || false;

    this.fields = [];
    Object.keys(section.fields).forEach((fieldKey) => {
      var field = section.fields[fieldKey];
      this.fields.push(new Field(field));
    });

    this.fields = this.fields.sort((a: IField, b: IField) => {
      return a.order > b.order ? 1 : a.order < b.order ? -1 : 0;
    });
  }
}

export class Field implements IField {
  label: string;
  config: any;
  type: string;
  order: number;

  constructor(field: IField){
    this.label = field.label || '';
    this.config = field.config || {};
    this.type = field.type || '';
    this.order = field.order || 0;
  }
}