let timeBlocksShows: number = 0; // 4.5sec
let timeUntilLose: number = 0; // 12sec
let correctBlocksNum: number = 0;
let maxIncorrectBlocksNum: number = 0;
const allBlocksNum: number = 36;
let activateClicking: boolean = false;

const ThermiteNew: any = {};

$(document).ready(function () {
    $(".container").hide();
});

$(document).ready(function () {
    ThermiteNew.Start = function (data: any) {

        $(".container").show();
        $(".grid").removeClass("won");

        $(".grid").removeClass("won");
        $(".grid").removeClass("lost");
        hideAllBlocks();
        maxIncorrectBlocksNum = data.incorrect;
        correctBlocksNum = data.correct;
        timeBlocksShows = data.showtime;
        timeUntilLose = data.losetime;
        const gridCorrectBlocks: number[] = generateRandomNumberBetween(1, 36, data.correct);
        activateClicking = false;
        showCorrectBlocks();
        setTimeout(() => {
            hideAllBlocks();
            activateClicking = true;
        }, timeBlocksShows * 1000);
        setTimeout(() => {
            isGameForeited();
        }, timeUntilLose * 1000);
    };


    window.addEventListener('message', function (event) {
        const action = event.data.action;
        switch (action) {
            case "Start":
                ThermiteNew.Start(event.data);
                break;
        }
    });
});

$(document.body).on("click", ".block", onBlockClick);

function generateRandomNumberBetween(min: number = 1, max: number = allBlocksNum, length: number = correctBlocksNum): number[] {
    const arr: number[] = [];
    while (arr.length < length) {
        const r: number = Math.floor(Math.random() * (max + 1 - min)) + min;
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

function onBlockClick(e: any) {
    if (!activateClicking) {
        return;
    }

    const clickedBlock = e.target;

    let blockNum: number = clickedBlock.classList.value.match(/(?:block-)(\d+)/)[1];
    blockNum = Number(blockNum);
    const correctBlocks: number[] = gridCorrectBlocks;

    const correct: boolean = correctBlocks.indexOf(blockNum) !== -1;
    clickedBlock.classList.add("clicked");
    if (correct) {
        clickedBlock.classList.remove("incorrect");
        clickedBlock.classList.add("correct");
    }
    else {
        clickedBlock.classList.add("incorrect");
        clickedBlock.classList.remove("correct");
    }
    checkWinOrLost();
}

function showCorrectBlocks() {

    $(".block").each((i, ele) => {
        let blockNum: number = ele.classList.value.match(/(?:block-)(\d+)/)[1];
        blockNum = Number(blockNum);
        const correctBlocks: number[] = gridCorrectBlocks;
        const correct: boolean = correctBlocks.indexOf(blockNum) !== -1;
        if (correct) {
            ele.classList.add("show");
        }
    });
}
function hideAllBlocks() {
    $(".block").each((i, ele) => {
        ele.classList.remove("show");
        ele.classList.remove("correct");
        ele.classList.remove("incorrect");
        ele.classList.remove("clicked");
    });
}

function checkWinOrLost() {
    if (isGameWon()) {
        hideAllBlocks();
        activateClicking = false;
        $(".container").hide();
        $.post('http://memorygame/ThermiteResult', JSON.stringify({
            success: true
        }));
    }
    if (isGameLost()) {
        hideAllBlocks();
        $(".container").hide();
        activateClicking = false;
        $.post('http://memorygame/ThermiteResult', JSON.stringify({
            success: false
        }));
    }

}

function isGameWon(): boolean {
    return $(".correct").length >= (correctBlocksNum);
}
function isGameLost(): boolean {
    return $(".incorrect").length >= maxIncorrectBlocksNum;
};

function isGameForeited() {
    if (activateClicking) {
        hideAllBlocks();
        $(".container").hide();
        activateClicking = false;
        $.post('http://memorygame/ThermiteResult', JSON.stringify({
            success: false
        }));
    }
}