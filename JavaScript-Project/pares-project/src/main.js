import '../sass/main.scss';

import game from "./class/game";
import box from "./class/box";
import { shuffleArray } from './utils/utils';

let reset = document.getElementById('reset');

reset.addEventListener('click', () => {
    game.resetGame();
});

let data = Game.getRowsCols();
let game = new Game(data.rows, data.cols, "game");