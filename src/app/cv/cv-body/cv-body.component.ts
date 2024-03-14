import { Component } from '@angular/core';
import { ExperiencesComponent } from "./experiences/experiences.component";
import { Skills } from "./skills/skills.component";

@Component({
    selector: 'app-cv-body',
    standalone: true,
    templateUrl: './cv-body.component.html',
    styleUrl: './cv-body.component.scss',
    imports: [Skills, ExperiencesComponent]
})
export class CvBodyComponent {

}
