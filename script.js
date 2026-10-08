// ==============================
// Math RPG
// ==============================


// ==============================
// 遊戲規則
// ==============================

const MAX_BOSS_HP = 100;

const MAX_PLAYER_HP = 60;

const TOTAL_QUESTIONS = 20;

const BOSS_DAMAGE = 7;

const PLAYER_DAMAGE = 20;

const MAX_MISTAKES = 3;


// ==============================
// 遊戲資料
// ==============================

let playerHP = MAX_PLAYER_HP;

let bossHP = MAX_BOSS_HP;

let questionNumber = 1;

let mistakeCount = 0;

let correctAnswer = 0;

let gameStarted = false;

let gameOver = false;


// ==============================
// 計時器資料
// ==============================

let timeLeft = 20;

let timerInterval = null;


// ==============================
// 找到網頁元件
// ==============================

const questionElement =
    document.getElementById("question");

const questionNumberElement =
    document.getElementById("question-number");

const answerElement =
    document.getElementById("answer");

const attackButton =
    document.getElementById("attack");

const startGameButton =
    document.getElementById("start-game");

const bossHPText =
    document.getElementById("boss-hp-text");

const playerHPText =
    document.getElementById("player-hp-text");

const bossHPBar =
    document.getElementById("boss-hp-bar");

const playerHPBar =
    document.getElementById("player-hp-bar");

const mistakesElement =
    document.getElementById("mistakes");

const messageElement =
    document.getElementById("message");

const timerElement =
    document.getElementById("timer");


// ==============================
// 隨機產生 0～100
// ==============================

function randomNumber() {

    return Math.floor(Math.random() * 101);

}


// ==============================
// 隨機產生 1～100
// ==============================

function randomPositiveNumber() {

    return Math.floor(Math.random() * 100) + 1;

}


// ==============================
// 根據 Boss HP 決定時間
// ==============================

function getTimeLimit() {


    if (bossHP >= 100) {

        return 20;

    }


    if (bossHP >= 93) {

        return 19;

    }


    if (bossHP >= 86) {

        return 18;

    }


    if (bossHP >= 79) {

        return 17;

    }


    if (bossHP >= 72) {

        return 16;

    }


    if (bossHP >= 65) {

        return 15;

    }


    if (bossHP >= 58) {

        return 14;

    }


    if (bossHP >= 51) {

        return 13;

    }


    if (bossHP >= 44) {

        return 12;

    }


    if (bossHP >= 37) {

        return 11;

    }


    return 10;

}


// ==============================
// 開始倒數
// ==============================

function startTimer() {


    // 清除上一個計時器
    clearInterval(timerInterval);


    // 根據 Boss HP 決定本題時間
    timeLeft = getTimeLimit();


    updateTimerDisplay();


    // 每秒倒數
    timerInterval = setInterval(

        function() {


            if (gameOver) {

                clearInterval(timerInterval);

                return;

            }


            timeLeft--;


            updateTimerDisplay();


            // 時間到
            if (timeLeft <= 0) {

                clearInterval(timerInterval);

                timeOut();

            }

        },

        1000

    );

}


// ==============================
// 更新倒數畫面
// ==============================

function updateTimerDisplay() {


    timerElement.textContent =
        "⏱️ " +
        timeLeft +
        " 秒";


    // 低於 5 秒時警告
    if (timeLeft <= 5) {

        timerElement.classList.add("warning");

    }

    else {

        timerElement.classList.remove("warning");

    }

}


// ==============================
// 時間到
// ==============================

function timeOut() {


    if (gameOver) {

        return;

    }


    messageElement.textContent =
        "⏰ 時間到！玩家 -" +
        PLAYER_DAMAGE +
        " HP";


    // 視為答錯
    playerHP -= PLAYER_DAMAGE;

    mistakeCount++;


    if (playerHP < 0) {

        playerHP = 0;

    }


    updateDisplay();


    // 玩家死亡
    if (playerHP === 0) {

        finishGame(false);

        return;

    }


    // 錯誤達到上限
    if (mistakeCount >= MAX_MISTAKES) {

        finishGame(false);

        return;

    }


    // 20 題完成
    if (questionNumber === TOTAL_QUESTIONS) {

        finishGame(false);

        return;

    }


    // 下一題
    questionNumber++;

    createQuestion();

}


// ==============================
// 產生數學題
// ==============================

function createQuestion() {

    let a;

    let b;

    let operator;


    // 隨機選擇運算
    const operators = [

        "+",
        "-",
        "×",
        "÷"

    ];


    operator =
        operators[
            Math.floor(
                Math.random() * operators.length
            )
        ];


    // ==============================
    // 加法
    // ==============================

    if (operator === "+") {

        a = randomNumber();

        b = randomNumber();

        correctAnswer = a + b;

    }


    // ==============================
    // 減法
    // ==============================

    else if (operator === "-") {

        a = randomNumber();

        b = randomNumber();


        // 避免負數
        if (a < b) {

            const temp = a;

            a = b;

            b = temp;

        }


        correctAnswer = a - b;

    }


    // ==============================
    // 乘法
    // 至少一個乘數是個位數
    // ==============================

    else if (operator === "×") {


        // 第一個數字 1～100
        a = randomPositiveNumber();


        // 第二個數字 1～9
        b =
            Math.floor(
                Math.random() * 9
            ) + 1;


        correctAnswer = a * b;

    }


    // ==============================
    // 除法
    // ==============================

    else {

        // 除數一定是 1～100
        b =
            Math.floor(
                Math.random() * 100
            ) + 1;


        // 產生 0～10 的商
        const answer =
            Math.floor(
                Math.random() * 11
            );


        a = b * answer;


        // 被除數不能超過 100
        while (a > 100) {

            b =
                Math.floor(
                    Math.random() * 100
                ) + 1;


            const newAnswer =
                Math.floor(
                    Math.random() * 11
                );


            a = b * newAnswer;

        }


        correctAnswer = a / b;

    }


    // ==============================
    // 顯示題目
    // ==============================

    questionElement.textContent =
        a + " " + operator + " " + b + " = ?";


    questionNumberElement.textContent =
        "第 " +
        questionNumber +
        " / " +
        TOTAL_QUESTIONS +
        " 題";


    // 清空答案
    answerElement.value = "";


    // 游標放到輸入框
    answerElement.focus();


    // 開始本題倒數
    startTimer();

}


// ==============================
// 更新畫面
// ==============================

function updateDisplay() {


    // Boss HP
    bossHPText.textContent =
        "Boss HP：" +
        bossHP +
        " / " +
        MAX_BOSS_HP;


    // 玩家 HP
    playerHPText.textContent =
        "玩家 HP：" +
        playerHP +
        " / " +
        MAX_PLAYER_HP;


    // Boss HP 條
    bossHPBar.style.width =
        bossHP + "%";


    // 玩家 HP 條
    playerHPBar.style.width =
        (playerHP / MAX_PLAYER_HP * 100) + "%";


    // 錯誤次數
    mistakesElement.textContent =
        "❌ 錯誤次數：" +
        mistakeCount +
        " / " +
        MAX_MISTAKES;

}


// ==============================
// 玩家攻擊
// ==============================

function attack() {


    // 尚未開始或遊戲結束
    if (!gameStarted || gameOver) {

        return;

    }


    // 沒有輸入答案
    if (answerElement.value === "") {

        messageElement.textContent =
            "⚠️ 請輸入答案！";

        return;

    }


    // 停止倒數
    clearInterval(timerInterval);


    // 取得玩家答案
    const playerAnswer =
        Number(answerElement.value);


    // ==============================
    // 答對
    // ==============================

    if (playerAnswer === correctAnswer) {


        // Boss 扣 7 HP
        bossHP -= BOSS_DAMAGE;


        messageElement.textContent =
            "✅ 答對！Boss -" +
            BOSS_DAMAGE +
            " HP";

    }


    // ==============================
    // 答錯
    // ==============================

    else {


        // 玩家扣 20 HP
        playerHP -= PLAYER_DAMAGE;


        // 錯誤次數 +1
        mistakeCount++;


        messageElement.textContent =
            "❌ 答錯！正確答案是 " +
            correctAnswer +
            "。玩家 -" +
            PLAYER_DAMAGE +
            " HP";

    }


    // ==============================
    // 防止 HP 變成負數
    // ==============================

    if (bossHP < 0) {

        bossHP = 0;

    }


    if (playerHP < 0) {

        playerHP = 0;

    }


    // 更新畫面
    updateDisplay();


    // ==============================
    // Boss 死亡
    // ==============================

    if (bossHP === 0) {

        finishGame(true);

        return;

    }


    // ==============================
    // 玩家死亡
    // ==============================

    if (playerHP === 0) {

        finishGame(false);

        return;

    }


    // ==============================
    // 錯誤次數達到上限
    // ==============================

    if (mistakeCount >= MAX_MISTAKES) {

        finishGame(false);

        return;

    }


    // ==============================
    // 20 題完成
    // ==============================

    if (questionNumber === TOTAL_QUESTIONS) {

        finishGame(false);

        return;

    }


    // ==============================
    // 下一題
    // ==============================

    questionNumber++;

    createQuestion();

}


// ==============================
// 遊戲結束
// ==============================

function finishGame(playerWon) {


    gameOver = true;


    // 停止計時器
    clearInterval(timerInterval);


    // 禁用輸入
    attackButton.disabled = true;

    answerElement.disabled = true;


    // 禁用開始按鈕
    startGameButton.disabled = true;


    // ==============================
    // 勝利
    // ==============================

    if (playerWon) {

        messageElement.textContent =
            "🏆 勝利！你擊敗了 Boss！";

    }


    // ==============================
    // 戰敗
    // ==============================

    else {

        messageElement.textContent =
            "💀 戰敗！Boss 存活到了最後。";

    }


    // ==============================
    // 建立重新開始按鈕
    // ==============================

    const restartButton =
        document.createElement("button");


    restartButton.textContent =
        "🔄 重新開始";


    restartButton.className =
        "restart-button";


    restartButton.addEventListener(
        "click",
        restartGame
    );


    document
        .querySelector(".game")
        .appendChild(restartButton);

}


// ==============================
// 開始遊戲
// ==============================

function startGame() {


    // 防止重複開始
    if (gameStarted) {

        return;

    }


    gameStarted = true;

    gameOver = false;


    // 啟用輸入
    answerElement.disabled = false;

    attackButton.disabled = false;


    // 開始按鈕消失
    startGameButton.style.display = "none";


    // 更新訊息
    messageElement.textContent =
        "⚔️ 戰鬥開始！擊敗 Boss！";


    // 更新畫面
    updateDisplay();


    // 產生第一題
    createQuestion();

}


// ==============================
// 重新開始
// ==============================

function restartGame() {


    // 停止舊計時器
    clearInterval(timerInterval);


    // 重置資料
    playerHP = MAX_PLAYER_HP;

    bossHP = MAX_BOSS_HP;

    questionNumber = 1;

    mistakeCount = 0;

    correctAnswer = 0;

    gameStarted = false;

    gameOver = false;


    // 恢復輸入狀態
    answerElement.disabled = true;

    attackButton.disabled = true;


    // 恢復開始按鈕
    startGameButton.disabled = false;

    startGameButton.style.display = "inline-block";


    // 重設倒數
    timeLeft = 20;

    updateTimerDisplay();


    // 重設題目
    questionNumberElement.textContent =
        "尚未開始遊戲";


    questionElement.textContent =
        "準備好挑戰 Boss 了嗎？";


    answerElement.value = "";


    // 重設訊息
    messageElement.textContent =
        "🧮 按下「開始遊戲」開始挑戰！";


    // 更新畫面
    updateDisplay();


    // 移除舊的重新開始按鈕
    const oldRestartButton =
        document.querySelector(
            ".restart-button"
        );


    if (oldRestartButton) {

        oldRestartButton.remove();

    }

}


// ==============================
// 開始遊戲按鈕
// ==============================

startGameButton.addEventListener(
    "click",
    startGame
);


// ==============================
// 攻擊按鈕
// ==============================

attackButton.addEventListener(
    "click",
    attack
);


// ==============================
// Enter 鍵回答
// ==============================

answerElement.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            attack();

        }

    }
);


// ==============================
// 遊戲初始畫面
// ==============================

updateDisplay();

updateTimerDisplay();