import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';


export enum ColorTheme {
  DARK = 'dark',
  LIGHT = 'light'
}
export enum FeelTheme {
  
  SERIOUS = 'serious',
  PLAYFULL = 'playfull'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  colorTheme: ColorTheme = ColorTheme.DARK;
  colorThemeChanged = new Subject<ColorTheme>();
  feelTheme: FeelTheme = FeelTheme.PLAYFULL;
  feelThemeChanged = new Subject<FeelTheme>();
  wallpaperChanged = new Subject<string>();
  wallpaper:string;
  private readonly wallpaperPath = '/assets/images/wallpapers/';
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
  constructor(@Inject(DOCUMENT) private document: Document) {

  }

  setColorTheme(colorTheme:ColorTheme) {
    this.colorTheme=colorTheme;
    this.colorThemeChanged.next(this.colorTheme);
  }
  serFeelTheme(feelTheme:FeelTheme) {
    this.feelTheme=feelTheme;
    this.feelThemeChanged.next(this.feelTheme);
  }

  setRandomWallpaper() {
    this.wallpaper=this.selectPathRandomly(this.wallpaperPath,this.wallpaperFiles);
    this.wallpaperChanged.next(this.wallpaper);
  }
  getWallpaperFiles(){
    return this.wallpaperFiles.map(w => this.wallpaperPath + w);

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
    return basePath + files[randomIndex]; 
  }

}
