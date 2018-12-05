import createStore from "redux-zero";
import { applyMiddleware } from "redux-zero/middleware";
import { connect } from "redux-zero/devtools";
import { getWords, categories } from "./word";

const INITIAL_STATE = {
  isPlaying: false,
  gameOver: false,
  redTurn: true,
  score: {
    red: 0,
    blue: 0,
  },
  word: "",
  selectedCategory: "",
  categories,
};
const middlewares = connect ? applyMiddleware(connect(INITIAL_STATE)) : [];
export const store = createStore(INITIAL_STATE, middlewares);

const selectCategory = (state, selectedCategory) => ({ selectedCategory });

const startPlaying = (state) => {
  const wordlist = getWords(state.selectedCategory).slice();
  const index = Math.floor(Math.random() * wordlist.length);
  const word = wordlist.splice(index, 1)[0];

  return {
    isPlaying: true,
    gameOver: false,
    word,
    wordlist,
  };
};

const nextWord = (state) => {
  const wordlist = state.wordlist.slice();
  const index = Math.floor(Math.random() * wordlist.length);
  const word = wordlist.splice(index, 1)[0];

  return {
    word,
    wordlist,
    redTurn: !state.redTurn,
  };
};

const endGame = (state) => {
  const newScore = {
    red: state.score.red,
    blue: state.score.blue,
  };

  if (state.redTurn) {
    newScore.blue++;
  } else {
    newScore.red++;
  }

  return {
    isPlaying: false,
    gameOver: true,
    score: newScore,
  };
};

export const actions = (store) => ({
  selectCategory,
  startPlaying,
  nextWord,
  endGame,
});
