import { NativeDateAdapter } from '@angular/material';
import * as moment from 'moment';

export class AppDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        if (displayFormat === 'input') {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        } else {
            return date.toDateString();
        }
    }
    parse(value: string): Date {
      return moment(value, 'DD/MM/YYYY').toDate();
    }

    isDateInstance(value: string): boolean {
      return moment(value, 'DD/MM/YYYY').isValid();
    }
}
