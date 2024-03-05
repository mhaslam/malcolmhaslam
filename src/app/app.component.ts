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
import { ColorTheme, FeelTheme, ThemeService } from './theme.service';


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
  wallpaperPath : string;
  wallpaperChangeSubs : Subscription;
  colorTheme : ColorTheme = ColorTheme.DARK;
  colorThemeSubs : Subscription;
  feelTheme : FeelTheme = FeelTheme.PLAYFULL;
  feelThemeSubs : Subscription;

  icons = {
    star: faStar
  }

  constructor(private dataManagementService: DataManagementService, private themeService:ThemeService) { }

  ngOnInit(): void {
    this.themeService.setRandomWallpaper();
    this.wallpaperChangeSubs = this.themeService.wallpaperChanged.subscribe((wallpaper)=>{
      this.wallpaperPath=wallpaper;
    });

    this.colorThemeSubs = this.themeService.colorThemeChanged.subscribe((colorTheme)=>{
      this.colorTheme = colorTheme;
    });

    this.feelThemeSubs = this.themeService.feelThemeChanged.subscribe((feelTheme)=>{
      this.feelTheme = feelTheme;
    });



  }
  ngOnDestroy(): void {
      this.wallpaperChangeSubs.unsubscribe();
      this.colorThemeSubs.unsubscribe();
      this.feelThemeSubs.unsubscribe();
  }

}
