// src/app/data.service.ts
import { ElementRef, Injectable } from '@angular/core';
import {  Subject } from 'rxjs';
import { DataManagementService, I18nInterface, LANG } from '../data-management.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class CvService {

    private data:I18nInterface;
    isDataLoaded=false;
    language:string;
    private printableArea:ElementRef;

    dataChanged = new Subject<{}>()
    constructor(private dataManagementService:DataManagementService ) { }


    
    getData():I18nInterface{
         return this.data; 
    }

    loadData(lang:LANG){

        this.dataManagementService.getJSON(lang).subscribe(data => {
            this.isDataLoaded = true;
            this.language=lang;
            this.setData(data);
          });
    }
    setData(data:I18nInterface){
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
