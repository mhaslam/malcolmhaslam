import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CvService } from '../cv.service';
import { LANG } from '../../data-management.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent implements OnInit {

  langKeys = Object.keys(LANG);
  selectedOption: string;
  subscription:Subscription;
  
  constructor(private cvService:CvService){}


  ngOnInit() {
    this.subscription=this.cvService.dataChanged.subscribe(()=>{

      const index = Object.values(LANG).indexOf(this.cvService.language as LANG);
      const key = Object.keys(LANG)[index];
      this.selectedOption= key;

    });
  }
  onLanguageChange(event: Event) {
    this.cvService.loadData(LANG[(event.target as HTMLSelectElement).value]);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}





