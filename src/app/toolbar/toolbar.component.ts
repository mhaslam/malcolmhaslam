import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { Subscription, map, share, timer } from 'rxjs';
import { DataManagementService } from '../data-management.service';
import { DropdownComponent } from './dropdown/dropdown.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, DropdownComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit, OnDestroy{
  time = new Date();
  subscription: Subscription;
  icons = {
    refresh: faRefresh
  }

  constructor(private dataManagementService:DataManagementService){}
  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
      )
      .subscribe(time => {
        this.time = time;
      });
  }

  onRefresh(){
    this.dataManagementService.getRandomWallpaper();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
