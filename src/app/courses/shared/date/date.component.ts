import { AppDateAdapter } from './date.adapter';
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatDatepickerInputEvent, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';

const CUSTOM_DATE_VALUE_ACESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateComponent),
  multi: true
}

export const APP_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

@Component({
  selector: 'epam-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    CUSTOM_DATE_VALUE_ACESSOR,
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class DateComponent implements ControlValueAccessor {
  @Input() required;

  set date(date: Date) {
    this.currentDate = date;
    this.onChange(date);
  }
  get date() {
    return this.currentDate;
  }
  private currentDate;
  public isDisabled: boolean;
  public formErrors = {
    'date': ''
  }

  constructor() { }

  private onChange = (val) => { };
  private onTouched = () => { };

  checkDate(event: MatDatepickerInputEvent<Date>) {
    if (!event.value) {
      this.formErrors.date = 'Invalid format, must be day/month/year';
    } else {
      this.formErrors.date = '';
    }
  }

  touch() {
    this.onTouched();
  }

  public writeValue(obj: any): void {
    if (obj !== this.currentDate) {
      this.currentDate = obj;
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
