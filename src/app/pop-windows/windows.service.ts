// src/app/data.service.ts
import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';


export enum WindowsEnum{
  "skills",
  "resume",
  "experience",
  "interests",
  "joke"
}

export interface WindowInterface{ key: number, title:string, zIndex: number, position:{x:number,y:number}, isActive:boolean};
    
@Injectable({
  providedIn: 'root'
})
export class WindowsService {

  activeWindowsChanged = new Subject<{}>();
  zIndexWindowsChanged = new Subject<{}>();

  private windows={
    [WindowsEnum.resume]:{title:'Resume',zIndex:0,position:{x:0,y:0},isActive:false},
    [WindowsEnum.skills]:{title:'skills',zIndex:0,position:{x:0,y:0},isActive:false},
    [WindowsEnum.experience]:{title:'experience',position:{x:0,y:0},zIndex:0,isActive:false},
    [WindowsEnum.interests]:{title:'interests',position:{x:0,y:0},zIndex:0,isActive:false},
    [WindowsEnum.joke]:{title:'joke',zIndex:0,position:{x:0,y:0},isActive:false}
  }




  isActiveWindow(windowKey):boolean{
    return (<WindowInterface>this.windows[windowKey]).isActive;
  }

  getWindows(){
    return JSON.parse(JSON.stringify(this.windows));
  }
  
  getActiveWindows(){
    const activeWindows = {};
    for (const windowKey in this.windows) {
      if (this.windows.hasOwnProperty(windowKey)) {
          const windowInfo = this.windows[windowKey];
          if (windowInfo.isActive) {
              activeWindows[windowKey] = windowInfo;
          }
      }
    }
    return activeWindows;
  }
  
  openWindow(windowKey:number){
    const selectedWindow:WindowInterface = this.windows[windowKey];
    if (selectedWindow.isActive) {
      // window already open, bring it to the front
      this.bringToFront(windowKey);
    } else {
      // window closed, open it
      selectedWindow.isActive=true;
      const topWindowInfo = this.getTopWindow();
      if(topWindowInfo){
        selectedWindow.zIndex=topWindowInfo?topWindowInfo.zIndex+1:1;
        selectedWindow.position={x:topWindowInfo.position.x+50,y:topWindowInfo.position.y+50};
        this.zIndexWindowsChanged.next(JSON.parse(JSON.stringify(selectedWindow))); 
      }else{
        selectedWindow.zIndex=1;
      }
      this.activeWindowsChanged.next(JSON.parse(JSON.stringify(selectedWindow))); 
    }
  }
  closeWindow(windowKey:number){
    const selectedWindow = this.windows[windowKey];
    selectedWindow.isActive=false;
    selectedWindow.zIndex=0;
    this.activeWindowsChanged.next(JSON.parse(JSON.stringify(selectedWindow))); 
  }

  bringToFront(windowKey: number) {
    const selectedWindow = this.windows[windowKey];
    const maxZIndex = this.getMaxZIndex();
    if(maxZIndex!=selectedWindow.zIndex) {
      selectedWindow.zIndex=this.getMaxZIndex()+1;
      this.zIndexWindowsChanged.next(JSON.parse(JSON.stringify(selectedWindow))); 
    }
  }

  getMaxZIndex(): number {
    let maxZIndex = 0;
    for (const windowKey in this.windows) {
        if (this.windows.hasOwnProperty(windowKey)) {
            const windowInfo = this.windows[windowKey];
            if (windowInfo.zIndex > maxZIndex) {
                maxZIndex = windowInfo.zIndex;
            }
        }
    }
    return maxZIndex;
  }
  getTopWindow(): WindowInterface {
    let maxZIndex = 0;
    let topWindowInfo:WindowInterface;
    for (const windowKey in this.windows) {
        if (this.windows.hasOwnProperty(windowKey)) {
            const windowInfo = this.windows[windowKey];
            if (windowInfo.zIndex > maxZIndex) {
                maxZIndex = windowInfo.zIndex;
                topWindowInfo=windowInfo;
            }
        }
    }
    return topWindowInfo;
  }

  getWindowObject(windowKey:number){
    return JSON.parse(JSON.stringify(this.windows[windowKey]));
  }

  setPosition(windowKey:number,position:{x:number,y:number}){
    this.windows[windowKey].position=position;
  }


}
