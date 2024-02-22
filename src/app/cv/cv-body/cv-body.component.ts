import { Component } from '@angular/core';
import { Skills } from "./skills/skills.component";
import { ExperiencesComponent } from "./experiences/experiences.component";

@Component({
    selector: 'app-cv-body',
    standalone: true,
    templateUrl: './cv-body.component.html',
    styleUrl: './cv-body.component.css',
    imports: [Skills, ExperiencesComponent]
})
export class CvBodyComponent {

}
