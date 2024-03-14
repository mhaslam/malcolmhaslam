// src/app/data.service.ts
import { Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';
import { SiteLanguageInfo } from './theme.service';


export enum FileDirectoryEnum{
  JOKES = 'assets/images/jokes/',
  I18N = 'assets/locale/'
}
export enum CVLANG {
  ENG = 'cv-en-data.json',
  FRA = 'cv-fr-data.json'
}
export enum SITELANG {
  ENG = 'en-data.json',
  FRA = 'fr-data.json'
}

export interface CvI18nInterface {
  "config": {
    "headshotUrl": string,
    "info": string,
    "skills": string,
    "languages": string,
    "interests": string,
    "employment": string,
    "education": string

  },
  "header": {
    "title": string,
    "subtitle": string,
    "expYears": string,
    "info": { "text": string, "icon": string }[]
  },
  "body": {
    "info": {},
    "skills": SkillsInterface,
    "languages": { "title": string, "level": number },
    "interests": { "title": string, "text": string },
    "employments": EmploymentInterface[],
    "ventures": EmploymentInterface[],
    "education": EducationInterface[]
  }
}
export interface SkillsInterface {
  "title": string,
  "items": { "title": string, "level": number }[]

}
export interface EmploymentInterface {
  "company": string,
  "title": string,
  "location": string,
  "date": string,
  "projects": []
}
export interface EducationInterface {
  "title": string,
  "date": string
}

enum BASEHREF{
  ENG = '/en/',
  FRA = '/fr/' 
}

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {
  siteLanguage:SITELANG;

  private jokeFiles:string[]=[
    "works.png",
    "trimester.png",
    "tests.png",
    "support.png",
    "progress.png",
    "passing.jpeg",
    "negativity.png",
    "estimation.png",
    "email.png",
    "coder.png",
    "business.png",
    "sandwich.png",
  ]


  constructor(@Inject(APP_BASE_HREF) public baseHref:string, private http: HttpClient) {
    this.siteLanguage = (baseHref===BASEHREF.FRA)?SITELANG.FRA:SITELANG.ENG;
  }


  getSiteLangJSON(){
    return this.http.get<SiteLanguageInfo>(this.baseHref+FileDirectoryEnum.I18N + this.siteLanguage);
  }
  getCVLanguageJSON(lang: CVLANG): Observable<any> {
    return this.http.get(this.baseHref+FileDirectoryEnum.I18N + lang);
  }

  getRandomJokePath():string{
    return this.selectPathRandomly(FileDirectoryEnum.JOKES,this.jokeFiles);
  }

  private selectPathRandomly(basePath:string,files:string[]){
    const randomIndex = Math.floor(Math.random() * files.length);
    return this.baseHref + basePath + files[randomIndex]; 
  }



}
