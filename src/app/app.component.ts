import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { PopWindowsComponent } from './pop-windows/pop-windows.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { DataManagementService } from './data-management.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FlexLayoutModule,
    TaskbarComponent,
    PopWindowsComponent,
    FontAwesomeModule,
    ToolbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'MalcolmHaslam';
  wallpaperPath = '/assets/images/wallpapers/1.jpg'
  wallpaperChangeSubs : Subscription;
  icons = {
    star: faStar
  }

  constructor(private dataManagementService: DataManagementService) { }

  ngOnInit(): void {
    this.dataManagementService.getRandomWallpaper();
    this.wallpaperChangeSubs = this.dataManagementService.wallpaperChanged.subscribe((wallpaper)=>{
      this.wallpaperPath=wallpaper;
    });
  }
  ngOnDestroy(): void {
      this.wallpaperChangeSubs.unsubscribe();
  }

}
