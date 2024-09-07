import { sleep } from "./helpers/util.js";
import { sortingalgorithms } from "./helpers/sortingalgo.js";

let nbars = 10;
let numbersbars = document.getElementById('numbersbars');
const stage = document.getElementById('stage');
stage.style.width = `${nbars * 30}px`;

const selectalgorithm = document.getElementById('selectalgorithm');
const generatebtn = document.getElementById('generatebtn');
const solvebtn = document.getElementById('solvebtn');

let bars = [];
let barsdivs = [];

const sortingAlgorithms = new sortingalgorithms();

const start = () => {
    stage.innerHTML = '';
    bars = Array(nbars).fill(0).map(_ => {
        return {
            width: 20,
            height: Math.floor(Math.random() * 200) + 1
        };
    });
    barsdivs = [];
    for (let i = 0; i < bars.length; i++) {
        const bar = document.createElement('div');
        bar.style.width = `${bars[i].width}px`;
        bar.style.height = `${bars[i].height}px`;
        bar.style.left = `${5 + i * 30}px`;
        bars[i] = { ...bars[i], position: i };
        bar.classList.add('bar');
        barsdivs.push(bar);
        stage.appendChild(bar);
    }
}
start();

async function swapbars(barsdivs, i, j) {
    barsdivs[i].style.left = `${5 + j * 30}px`;
    barsdivs[i].classList.add(`activate`);
    barsdivs[j].style.left = `${5 + i * 30}px`;
    barsdivs[j].classList.add(`activate`);
    await sleep(300);
    barsdivs[i].classList.remove(`activate`);
    barsdivs[j].classList.remove(`activate`);
    let temp = barsdivs[i];
    barsdivs[i] = barsdivs[j];
    barsdivs[j] = temp;
}

const algorithms = [
    sortingAlgorithms.bubblesort,
    sortingAlgorithms.selectionsort,
    sortingAlgorithms.quicksort
];

const solve = async () => {
    const array = structuredClone(bars.map(el => el.height));
    const swaps = algorithms[selectalgorithm.selectedIndex](array);
    for (let i = 0; i < swaps.length; i++) {
        if (swaps[i].firstPosition !== swaps[i].lastPosition) {
            await swapbars(barsdivs, swaps[i].firstPosition, swaps[i].lastPosition);
        }
    }
}

generatebtn.addEventListener('click', () => {
    nbars = parseInt(numbersbars.value, 10);
    stage.style.width = `${nbars * 30}px`;
    start();
});

solvebtn.addEventListener('click', () => {
    solve();
});
