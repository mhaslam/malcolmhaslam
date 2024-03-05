import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faLinkedin,
  faGithub,
  faXTwitter

} from '@fortawesome/free-brands-svg-icons';
import { Subscription, map, share, timer } from 'rxjs';
import { DataManagementService } from '../data-management.service';
import { ColorTheme, FeelTheme, ThemeService } from '../theme.service';
import { FilenamePipe } from './filename.pipe';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FilenamePipe],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit, OnDestroy{
  ColorTheme = ColorTheme;
  FeelTheme = FeelTheme;
  colorThemeSubs : Subscription;
  currentColorTheme : ColorTheme;
  feelThemeSubs : Subscription;
  currentFeelTheme : FeelTheme;
  WallpaperSubs : Subscription;
  wallpapers : string[];  
  currentWallpaper:string;
  time = new Date();
  clockSubscription: Subscription;
  public isLightTheme = false;

  constructor(library: FaIconLibrary, private dataManagementService:DataManagementService, private themeService:ThemeService){
    library.addIcons(
      faGithub,
      faLinkedin,
      faXTwitter
    );
  }

  ngOnInit() {
    this.clockSubscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
      )
      .subscribe(time => {
        this.time = time;
      });
    this.currentColorTheme = this.themeService.colorTheme;
    this.colorThemeSubs = this.themeService.colorThemeChanged.subscribe((color:ColorTheme)=>{
      this.currentColorTheme = color;
    });
    this.currentFeelTheme = this.themeService.feelTheme;
    this.feelThemeSubs = this.themeService.feelThemeChanged.subscribe((feel:FeelTheme)=>{
      this.currentFeelTheme = feel;
    });
    this.wallpapers=this.themeService.getWallpaperFiles();
    this.WallpaperSubs = this.themeService.wallpaperChanged.subscribe((wallpaper:string)=>{
      console.log("wallpaperSUb");
      console.log(wallpaper);
      this.currentWallpaper = wallpaper;
    });     
  }

  onThemeSwitchChange() {
    this.isLightTheme = !this.isLightTheme;

    document.body.setAttribute(
      'data-theme',
      this.isLightTheme ? 'light' : 'dark'
    );
  }
  onRefresh(){
    this.themeService.setRandomWallpaper();
  }

  onColorThemeSelected(colorTheme:ColorTheme){
    this.themeService.setColorTheme(colorTheme);
  }

  onFeelThemeSelected(feelTheme:FeelTheme){
    this.themeService.serFeelTheme(feelTheme);
  }
  
  onWallpaperRandom(){
    this.themeService.setRandomWallpaper();
  }
  onWallpaperNone(){
    this.themeService.clearWallpaper();
  }
  onWallpaperSelected(wallpaper:string){
    console.log(wallpaper);
    this.themeService.setWallpaper(wallpaper);
  }
  ngOnDestroy() {
    this.clockSubscription.unsubscribe();
    this.colorThemeSubs.unsubscribe();
    this.feelThemeSubs.unsubscribe();
    this.WallpaperSubs.unsubscribe();
  }
}
