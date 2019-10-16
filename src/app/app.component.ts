import { Component } from '@angular/core';
import { CatFactsService } from './services/cat-facts.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        transform: 'translate(50vw)',
        opacity: 1,
      })),
      state('closed', style({
        transform: 'translate(150vw)',
        opacity: 0,
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class AppComponent {
  title = 'cat-facts';
  isOpen = true;
  facts: any[];
  currentFact: string;

  catRegEx = /^[ACEGIKMOQSUEWYacegikmoqsuewy]/

  constructor(private catFacts: CatFactsService) {
    this.catFacts.getFacts().subscribe((facts: any) => {
      this.facts = facts.all.filter(f => this.catRegEx.test(f.text))
      this.displayRandomFact();
    });
  }

  displayRandomFact() {
    this.isOpen = true;
    this.currentFact = this.facts[Math.floor(Math.random() * this.facts.length)].text;
    setTimeout(() => this.isOpen = false, 5000);
    setTimeout(() => this.displayRandomFact(), 6000);
  }
}
