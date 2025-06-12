import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app--bar-state',
  imports: [],
  template: `
  <span class="jstfy_center align_center"
  >HTML,CSS</span>
  <div class="bar">
    <span style="font-size: 0.8em;"
    >Principiante</span>
    <div class="progress_bar">
      <div class="elemento_progress_princ js-scroll animate_bar_princi">        
      </div>
    </div>
  </div>
                           `,
  styles: [`
    .bar{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.progress_bar{
    width: 100%;
    height: 10px;
    background-color: #D9D9D9;
    border-radius: 10px;
    margin: 10px;
}
.elemento_progress_princ{
    width: 0%;
    height: 100%;
    background-color: #D9D9D9;
    border-radius: 10px;
    transition: width 0.5s ease-in-out;
}
    `]
})
export class BarStateComponent { }
