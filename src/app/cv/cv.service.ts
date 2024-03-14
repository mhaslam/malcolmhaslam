// src/app/data.service.ts
import { ElementRef, Inject, Injectable } from '@angular/core';
import {  Subject } from 'rxjs';
import { DataManagementService, CvI18nInterface, CVLANG } from '../data-management.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { APP_BASE_HREF } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CvService {

    private data:CvI18nInterface;
    isDataLoaded=false;
    language:CVLANG;
    languageChanged = new Subject<CVLANG>();
    private printableArea:ElementRef;

    dataChanged = new Subject<{}>()
    constructor(@Inject(APP_BASE_HREF) public baseHref:string, private dataManagementService:DataManagementService ) { }


    
    getData():CvI18nInterface{
         return this.data; 
    }

    loadData(lang:CVLANG){

        this.dataManagementService.getCVLanguageJSON(lang).subscribe(data => {
            this.isDataLoaded = true;
            if(this.language!==lang){
              this.language=lang;
              this.languageChanged.next(this.language);              
            }
            this.setData(data);
          });
    }
    setData(data:CvI18nInterface){
        this.data=data;
        this.dataChanged.next(JSON.parse(JSON.stringify(data)));
    }

    setPrintableArea(printableArea:ElementRef){
      this.printableArea=printableArea;
    }
    printCV():Promise<void | HTMLCanvasElement>{
      return html2canvas(this.printableArea.nativeElement,{
        scale: 3
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('MalcolmHaslam-CV.pdf');
      });
    }
}
