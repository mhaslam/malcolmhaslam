// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


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

  private readonly jokesPath = '/assets/images/jokes/';
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


  constructor(private http: HttpClient) {
  }

  public getLanguageJSON(lang: LANG): Observable<any> {
    return this.http.get(FileDirectoryEnum.I18N + lang);
  }

  getRandomJokePath():string{
    return this.selectPathRandomly(this.jokesPath,this.jokeFiles);
  }

  private selectPathRandomly(basePath:string,files:string[]){
    const randomIndex = Math.floor(Math.random() * files.length);
    return basePath + files[randomIndex]; 
  }


}
