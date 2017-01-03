import { Component, OnInit, Attribute, Input } from '@angular/core';

import { Field, IField } from '../../form/form.component';

@Component({
  selector: 'field[type="input"]',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  inputs: ['config', 'type']
})
export class InputComponent extends Field implements OnInit {
  @Input('type') type: string;
  @Input('config') config: any;

  constructor(@Attribute('config') field: IField) { super(field); }

  ngOnInit() {
  }
}
