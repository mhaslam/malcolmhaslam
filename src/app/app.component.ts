import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
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
  title = "Hi, I'm Malcolm";
  subtitle = "I'M A WEB DEVELOPER";
  wallpaperPath : string;
  wallpaperChangeSubs : Subscription;
  colorTheme : ColorTheme = ColorTheme.DARK;
  colorThemeSubs : Subscription;
  feelTheme : FeelTheme = FeelTheme.PLAYFUL;
  FellTheme = FeelTheme;
  feelThemeSubs : Subscription;

  icons = {
    star: faStar
  }

  constructor( private themeService:ThemeService) { }

  ngOnInit(): void {
    console.log("RANDOM");
    this.themeService.getTitleInfo().subscribe(data=>{
      this.title = data.title;
      this.subtitle = data.subtitle;
    });
    this.wallpaperChangeSubs = this.themeService.wallpaperChanged.subscribe((wallpaper)=>{
      this.wallpaperPath=wallpaper;
    });

    this.colorThemeSubs = this.themeService.colorThemeChanged.subscribe((colorTheme)=>{
      this.colorTheme = colorTheme;
    });

    this.feelThemeSubs = this.themeService.feelThemeChanged.subscribe((feelTheme)=>{
      this.title = this.themeService.titleInfo.title;
      this.subtitle = this.themeService.titleInfo.subtitle;
      this.feelTheme = feelTheme;
    });



  }
  ngOnDestroy(): void {
      this.wallpaperChangeSubs.unsubscribe();
      this.colorThemeSubs.unsubscribe();
      this.feelThemeSubs.unsubscribe();
  }

}
