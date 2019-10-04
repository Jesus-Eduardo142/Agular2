import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { Game } from '../game';

@Component({
  selector: 'app-home',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
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
export class AboutComponent implements OnInit {
  count: number;
  name: string;
  developer: string;
  gameSystem: string;
  genre: string;
  year: string;

  games: Game[];

  constructor(private service: DataService) { }

  ngOnInit() {
    this.get();
  }

  get() {
    return this.service.getGames().subscribe( (gameSystemList: any) => {
      this.games = gameSystemList;
      this.count = this.games.length;
    });
  }

  post() {
    const game = new Game();

    game.name = this.name;
    game.developer = this.developer;
    game.gamesystem = this.gameSystem;
    game.genre = this.genre;
    game.year = parseInt(this.year, 10);

    return this.service.postGame(game).subscribe((response: any) => {
      console.log(response);
      this.name = '';
      this.developer = '';
      this.gameSystem = '';
      this.genre = '';
      this.year = '';
      this.get();
    });
  }

  delete(id) {
    return this.service.deleteGame(id).subscribe((response: any) => {
      console.log(response);
      this.get();
    });
  }
}
