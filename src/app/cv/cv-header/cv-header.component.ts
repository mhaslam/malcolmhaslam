import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CvService } from '../cv.service';
import { InfoComponent } from "./info/info.component";
import { I18nInterface } from '../../data-management.service';


@Component({
    selector: 'app-cv-header',
    standalone: true,
    templateUrl: './cv-header.component.html',
    styleUrl: './cv-header.component.css',
    imports: [CommonModule, InfoComponent]
})
export class CvHeaderComponent implements OnInit, OnDestroy{

  private subscription: Subscription;
  headerData:I18nInterface["header"] ;
  headshotUrl:string;

  constructor(private cvService:CvService){}

  ngOnInit() {
    this.subscription=this.cvService.dataChanged.subscribe(()=>{
      const data = this.cvService.getData();
      this.headshotUrl = data.config.headshotUrl;
      this.headerData= data.header;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
