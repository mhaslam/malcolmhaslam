import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CvService } from '../cv.service';
import { CVLANG } from '../../data-management.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent implements OnInit {

  langKeys = Object.keys(CVLANG);
  LANG = CVLANG;
  selectedOption: string;
  subscription:Subscription;
  
  constructor(private cvService:CvService){}


  ngOnInit() {
    this.subscription=this.cvService.dataChanged.subscribe(()=>{

      const index = Object.values(CVLANG).indexOf(this.cvService.language as CVLANG);
      const key = Object.keys(CVLANG)[index];
      this.selectedOption= key;

    });
  }
  onLanguageChange(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.cvService.loadData(CVLANG[(event.target as HTMLSelectElement).value]);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}





