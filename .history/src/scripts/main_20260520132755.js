'use strict';

const Game = require('../modules/Game.class');
const game = new Game();

const cells = document.querySelectorAll('.field-cell');
const startBtn = document.querySelector('.button');
const scoreElement = document.querySelector('.game-score');
const msgWin = document.querySelector('.message-win');
const msgLose = document.querySelector('.message-lose');
const msgStart = document.querySelector('.message-start');

let previousState = null;

function updateView() {
  const state = game.getState();
  const score = game.getScore();
  const GameStatus = game.getStatus();

  cells.forEach((cell, index) => {
    const r = Math.floor(index / 4);
    const c = index % 4;
    const value = state[r][c];

    const prevValue = previousState ? previousState[r][c] : 0;

    cell.className = 'field-cell';

    if (value > 0) {
      cell.textContent = value;
      cell.classList.add(`field-cell--${value}`);
    }

    if (prevValue > 0 && value > prevValue) {
      cell.classList.add('tile-merged');

      setTimeout(() => {
        cell.classList.remove('tile-merged');
      }, 150);
    } else {
      cell.textContent = '';
    }
  });

  previousState = state.map(row => [...row]);

  scoreElement.textContent = score;

  msgWin.classList.add('hidden');
  msgLose.classList.add('hidden');
  msgStart.classList.add('hidden');

  if (GameStatus === 'win') {
    msgWin.classList.remove('hidden');
  }

  if (GameStatus === 'lose') {
    msgLose.classList.remove('hidden');
  }

  if (GameStatus === 'idle') {
    msgStart.classList.remove('hidden');
  }

  if (GameStatus !== 'idle') {
    startBtn.textContent = 'Restart';
    startBtn.classList.remove('start');
    startBtn.classList.add('restart');
  }
}

startBtn.addEventListener('click', (events) => {
  if (game.getStatus() === 'idle') {
    game.start();
  } else {
    game.restart();
  }
  updateView();
});

document.addEventListener('keydown', (events) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  if (events.key === 'ArrowLeft') {
    game.moveLeft();
  }

  if (events.key === 'ArrowRight') {
    game.moveRight();
  }

  if (events.key === 'ArrowUp') {
    game.moveUp();
  }

  if (events.key === 'ArrowDown') {
    game.moveDown();
  }

  updateView();
});
