import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';
import {GameSystem} from '../gameSystem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goals', [
      transition('* => *', [
        query(':enter', style({ opacity:0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset:0}),
            style({opacity: .5, transform: 'translateY(35xp)', offset:.3}),
            style({opacity: 1, transform: 'translateY(0)', offset:1}),
          ]))]), {optional: true}),
        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset:0}),
            style({opacity: .5, transform: 'translateY(35xp)', offset:.3}),
            style({opacity: 0, transform: 'translateY(-75%)', offset:1}),
          ]))]), {optional: true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  count: number;
  name: string;
  description: string;
  gameSystems: GameSystem[];

  constructor(private service: DataService) { }

  ngOnInit() {
    this.get();
  }

  get() {
    return this.service.getGameSystems().subscribe( (gameSystemList: any) => {
      this.gameSystems = gameSystemList;
      this.count = this.gameSystems.length;
    });
  }

  post() {
    const gameSystem = new GameSystem();

    gameSystem.name = this.name;
    gameSystem.description = this.description;

    return this.service.postGameSystem(gameSystem).subscribe((response: any) => {
      console.log(response);
      this.name = '';
      this.description = '';
      this.get();
    });
  }

  delete(id) {
    return this.service.deleteGameSystem(id).subscribe((response: any) => {
      console.log(response);
      this.get();
    });
  }
}
