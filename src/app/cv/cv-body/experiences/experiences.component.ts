import { Component, OnDestroy, OnInit } from '@angular/core';
import { CvService } from '../../cv.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { I18nInterface } from '../../../data-management.service';
import { ExperienceComponent } from './experience/experience.component';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule,ExperienceComponent],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css'
})
export class ExperiencesComponent implements OnInit, OnDestroy{

  private subscription: Subscription;
  data:I18nInterface;

  constructor(private cvService:CvService){}

  ngOnInit() {
    this.subscription=this.cvService.dataChanged.subscribe(()=>{
      this.data = this.cvService.getData();
    });
  }

  ngOnDestroy() {
    console.log("UNSUBSCRIBE");
    this.subscription.unsubscribe();
  }


}