import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rock';
  userScore = 0;
  compScore = 0;
  userSelected: any;
  compSelected: any;
  action: string | undefined;
  status: string | undefined;
  user:any;
  comp:any;
  playerDisp:string='Player'
  compWeapons = [
    'rock',
    'paper',
    'scissors'
  ];
  startTimer = 60;
  open = false;
  time: any;
  min: number | undefined;
  sec: number | undefined;

  start() {
    this.playerDisp='Player'
    this.startTimer=60;
    this.userScore = 0;
    this.compScore = 0;
    let date = new Date()
    this.min = date.getMinutes();
    this.min/100
    this.sec = date.getSeconds();
    console.log(this.min);
    console.log(this.sec);

    this.time = setInterval(() => {
      this.startTimer -= 1
      if(this.startTimer===0){
        clearInterval(this.time)
      }
    }, 1000);
    this.open = true
  } 
  pickOne(userWeapon: string): void {
    this.userSelected = userWeapon;
    console.log( this.userSelected);
    setTimeout( () => {
      const randomNum = Math.floor(Math.random() * 3);
      this.compSelected = this.compWeapons[randomNum];
      console.log(this.compSelected);
      this.checkResult();
    }, 1000);
  }
  clearField() {
    setTimeout(() => {
      this.status = '';
      this.userSelected = ''; 
      this.compSelected = '';
    }, 2500);
  }

  win(user: string, comp: string) {
    this.userScore ++;
    this.userSelected = user;
    this.compSelected = comp;
    this.action = 'beats';
    this.status = '. You win!';
    this.clearField();
  }


  lose(user: string, comp: string) {
    this.compScore ++;
    this.userSelected = user;
    this.compSelected = comp;
    this.action = 'loses to';
    this.status = '. You lose!';
    this.clearField();
  }

  draw(user: string, comp: string) {
    this.userSelected = user;
    this.compSelected = comp;
    this.action = 'and';
    this.status = '. You draw!';
    this.clearField();
  }

  checkResult() {
    const userChoice = this.userSelected;
    const compChoice = this.compSelected;
    switch (userChoice + compChoice) {
      case 'rockscissors':
      case 'paperrock':
      case 'scissorspaper':
        this.win(userChoice, compChoice);
        break;
      case 'rockpaper':
      case 'scissorsrock':
      case 'paperscissors':
        this.lose(userChoice, compChoice);
        break;
      default:
        this.draw(userChoice, compChoice);
        break;
    }

  }
  computer(){
    this.start();
    this.playerDisp='Computer'
    this.userScore = 0;
    this.compScore = 0;
  }
  reset() {
    this.start()
    this.userScore = 0;
    this.compScore = 0;
  }
  message: any;
  result: any;

  ngAfterContentChecked() {
    if(this.startTimer == 0) {
      clearInterval(this.time)
    }
  }
}
