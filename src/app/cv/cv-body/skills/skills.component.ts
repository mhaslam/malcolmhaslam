import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CvService } from '../../cv.service';
import { SkillComponent } from './skill/skill.component';
import { CvI18nInterface, SkillsInterface } from '../../../data-management.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SkillComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class Skills implements OnInit, OnDestroy{
  private subscription: Subscription;
 
  configData:CvI18nInterface["config"];
  skills:SkillsInterface;
  languages:CvI18nInterface["body"]["languages"];
  interests:CvI18nInterface["body"]["interests"];

  constructor(private cvService:CvService){}

  ngOnInit() {
    this.subscription=this.cvService.dataChanged.subscribe(()=>{
      const data:CvI18nInterface= this.cvService.getData();

      this.configData=data.config;
      this.skills = data.body.skills;
      this.languages = data.body.languages;
      this.interests = data.body.interests;

    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
