import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CvI18nInterface } from '../../../data-management.service';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
  
  @Input() infos:CvI18nInterface['header']['info'][] ;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

}
