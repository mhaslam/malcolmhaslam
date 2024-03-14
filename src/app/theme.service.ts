import { Inject, Injectable, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { DataManagementService } from './data-management.service';


export enum ColorTheme {
  DARK = 'dark',
  LIGHT = 'light'
}
export enum FeelTheme {
  SERIOUS = 'serious',
  PLAYFUL = 'playful'
}
export interface SiteLanguageInfo {
  'title':{
    'playful':TitleInfo,
    'serious':TitleInfo  
  }

}
export interface TitleInfo{
  'title':string,
  'subtitle':string
}


@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnInit{
  colorTheme: ColorTheme = ColorTheme.DARK;
  colorThemeChanged = new Subject<ColorTheme>();
  feelTheme: FeelTheme = FeelTheme.PLAYFUL;
  feelThemeChanged = new Subject<FeelTheme>();
  wallpaperChanged = new Subject<string>();
  wallpaper:string;
  titleInfo:TitleInfo;
  private siteLanguageInfo:SiteLanguageInfo;
  private readonly wallpaperPath = 'assets/images/wallpapers/';
  readonly wallpaperFiles:string[]=[
    "velo.jpg",
    "rugby.jpg",
    "claix.jpg",
    "cafe.jpg",
    "xp.jpg",
    "mac10.jpg",
    "villard.jpg",
    "villard-2.jpg",
    "brain.jpg",
    "gresi1837.jpg",
    "gresi1837-2.jpg"
  ]
  constructor(@Inject(DOCUMENT) private document: Document, private dataManagementService:DataManagementService) {}

  ngOnInit(): void {
      
  }
  setColorTheme(colorTheme:ColorTheme) {
    this.colorTheme=colorTheme;
    this.colorThemeChanged.next(this.colorTheme);
  }
  serFeelTheme(feelTheme:FeelTheme) {
    this.feelTheme=feelTheme;
    this.titleInfo=<TitleInfo>this.siteLanguageInfo.title[this.feelTheme];
    this.feelThemeChanged.next(this.feelTheme);
  }

  getTitleInfo():Observable<TitleInfo>{
    if(this.siteLanguageInfo){
      return of(this.siteLanguageInfo.title[this.feelTheme]);
    }
    return this.loadSiteLanguageInfo().pipe(map(data=>{
      this.titleInfo = <TitleInfo>data.title[this.feelTheme];
      return this.titleInfo;
    }));
  }
  loadSiteLanguageInfo():Observable<SiteLanguageInfo>{
    return this.dataManagementService.getSiteLangJSON().pipe(map(data=>{
            this.siteLanguageInfo = data;
            return data;
    }));
    // this.dataManagementService.getSiteLangJSON().subscribe(data => {
    //   this.titleInfo=<TitleInfo>data;
    // });
  }
  setRandomWallpaper() {
    console.log("RANDOM");

    this.wallpaper=this.selectPathRandomly(this.wallpaperPath,this.wallpaperFiles);
    this.wallpaperChanged.next(this.wallpaper);
  }
  getWallpaperFiles(){
    return this.wallpaperFiles.map(w => this.dataManagementService.baseHref + this.wallpaperPath + w);

  }
  setWallpaper(wallpaper:string){
    this.wallpaper=wallpaper;
    this.wallpaperChanged.next(this.wallpaper);
  }
  clearWallpaper() {
    this.wallpaper=undefined;
    this.wallpaperChanged.next(this.wallpaper);
  }
  private selectPathRandomly(basePath:string,files:string[]){
    const randomIndex = Math.floor(Math.random() * files.length);
    return this.dataManagementService.baseHref +basePath + files[randomIndex]; 
  }

}
