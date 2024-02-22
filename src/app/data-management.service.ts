// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export enum FileDirectoryEnum{
  JOKES = '/assets/images/jokes/',
  I18N = '/assets/locale/'
}
export enum LANG {
  ENG = 'en-data.json',
  FRA = 'fr-data.json'
}

export interface I18nInterface {

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

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  private jokePaths:string[]=[
    "/assets/images/jokes/works.png",
    "/assets/images/jokes/trimester.png",
    "/assets/images/jokes/tests.png",
    "/assets/images/jokes/support.png",
    "/assets/images/jokes/progress.png",
    "/assets/images/jokes/passing.jpeg",
    "/assets/images/jokes/negativity.png",
    "/assets/images/jokes/estimation.png",
    "/assets/images/jokes/email.png",
    "/assets/images/jokes/coder.png",
    "/assets/images/jokes/business.png"
  ]

  constructor(private http: HttpClient) {
  }

  public getJSON(lang: LANG): Observable<any> {
    return this.http.get(FileDirectoryEnum.I18N + lang);
  }



  getRandomJokePath():string{
    const random = Math.floor(Math.random() * this.jokePaths.length);
    return this.jokePaths[random];
  }


}
