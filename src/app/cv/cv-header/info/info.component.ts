import { Component, Input, OnDestroy, OnInit, input } from '@angular/core';
import { Subscription } from 'rxjs';
import { I18nInterface } from '../../../data-management.service';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
  
  @Input() infos:I18nInterface['header']['info'][] ;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

}
