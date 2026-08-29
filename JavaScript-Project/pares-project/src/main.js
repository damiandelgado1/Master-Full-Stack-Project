import '../sass/main.scss';

import game from "./class/game";
import box from "./class/box";
import { shuffleArray } from './utils/utils';

let rows = parseInt(prompt(`Ingresa un numero de filas`));
let cols = parseInt(prompt(`Ingresa un numero de columnas`));

let game = new Game();
let box = new Box();