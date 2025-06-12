import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [CommonModule],
  template: `<h1>{{title | titlecase}}</h1>`,
  styles: [`
    h1 {
      font-size: 3em;
      font-weight: 900;
      margin: 0;
      color: white;
      text-align: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
  @Input({required: true}) title!: string;
 }
