import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'table',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <thead>
      <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
    </thead>
    @for (item of items; track $index) {
      <tbody>
        <ng-container
          *ngTemplateOutlet="bodyTemplate; context: { $implicit: item }" />
      </tbody>
    }
  `,
})
export class TableComponent<T> {
  @Input() items!: T[];

  @ContentChild('header', { read: TemplateRef })
  headerTemplate!: TemplateRef<void>;

  @ContentChild('body', { read: TemplateRef })
  bodyTemplate!: TemplateRef<{ $implicit: T }>;
}
