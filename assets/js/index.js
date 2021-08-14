let buttonStart, ball, cpu, player, panelTextPoints, frames;
let positionBallX, positionBallY;
let positionPlayerX, positionPlayerY;
let positionCpuX, positionCpuY;
let directionPlayerY;
let positionPlayerInitialY = 129; //180
let positionPlayerInitialX = 0;
let positionCpuInititalY = 129; //180
let positionCpuInititalX = 705; //930
let positionBallInitialX = 362.5; //475
let positionBallInitialY = 175; //240
let fieldX = 0;
let fieldY = 0;
let fieldWidth = 735; //960
let fieldHeight = 370; //500
let barWidth = 20;
let barHeight = 112; //140
let ballWidth = 20;
let ballHeigth = 20;
let ballX, ballY;
let cpuY = 0;
let velocityBall, velocityCpu, velocityPlayer;
let points = 0;
let key;
game = false;

function controlPlayer() {
    if (game) {
        positionPlayerY += velocityPlayer * directionPlayerY;
        if (((positionPlayerY + barHeight) >= fieldHeight) || ((positionPlayerY) <= 0)) {
            positionPlayerY += (velocityPlayer * directionPlayerY) * (-1);
        }
        player.style.top = positionPlayerY + 'px';
    }
}

function controlCpu() {
    if (game) {
        if ((positionBallX > (fieldWidth / 2)) && (ballX > 0)) {
            if (((positionBallY + (ballHeigth / 2)) > ((positionCpuY + (barHeight / 2))) + velocityCpu)) {
                if ((positionCpuY + barHeight) <= fieldHeight) {
                    positionCpuY += velocityCpu;
                }
            } else if ((positionBallY + (ballHeigth / 2)) < (positionCpuY + (ballHeigth / 2)) - velocityCpu) {
                if (positionCpuY >= 0) {
                    positionCpuY -= velocityCpu;
                }
            }
        } else {
            if ((positionCpuY + (barHeight / 2)) < (fieldHeight / 2)) {
                positionCpuY += velocityCpu;
            } else if ((positionCpuY + (barHeight / 2)) > (fieldHeight / 2)) {
                positionCpuY -= velocityCpu;
            }
        }
        cpu.style.top = positionCpuY + 'px';
    }
}

function controlBall() {
    positionBallX += velocityBall * ballX;
    positionBallY += velocityBall * ballY;

    if (
        (positionBallX <= positionPlayerX + barWidth) &&
        ((positionBallY + ballHeigth >= positionPlayerY) && (positionBallY <= positionPlayerY + barHeight))
    ) {
        ballY = (((positionBallY + (ballHeigth / 2)) - (positionPlayerY + (barHeight / 2))) / 16);
        ballX *= -1;
    }

    if (
        (positionBallX >= positionCpuX - barWidth) &&
        ((positionBallY + ballHeigth >= positionCpuY) && (positionBallY <= positionCpuY + barHeight))
    ) {
        ballY = (((positionBallY + (ballHeigth / 2)) - (positionCpuY + (barHeight / 2))) / 16);
        ballX *= -1;
    }
    //480
    if ((positionBallY >= 350) || (positionBallY <= 0)) {
        ballY *= -1;
    }

    if (positionBallX >= (fieldWidth - ballWidth)) {
        velocityBall = 0;
        positionBallX = positionBallInitialX;
        positionBallY = positionBallInitialY;
        positionPlayerY = positionPlayerInitialY;
        positionCpuY = positionCpuInititalY;
        points++;
        panelTextPoints.value = points;
        game = false;
        player.style.top = positionPlayerY + 'px';
        cpu.style.top = positionCpuY = 'px';
    } else if (positionBallX <= 0) {
        velocityBall = 0;
        positionBallX = positionBallInitialX;
        positionBallY = positionBallInitialY;
        positionPlayerY = positionPlayerInitialY;
        positionCpuY = positionCpuInititalY;
        points--;
        panelTextPoints.value = points;
        game = false;
        player.style.top = positionPlayerY + 'px';
        cpu.style.top = positionCpuY = 'px';
    }
    ball.style.top = positionBallY + 'px';
    ball.style.left = positionBallX + 'px';
}

function keyDown() {
    key = event.keyCode;
    if (key === 38) {
        directionPlayerY = -1;
    } else if (key === 40) {
        directionPlayerY = 1;
    }
}

function keyUp() {
    key = event.keyCode;
    if (key === 38) {
        directionPlayerY = 0;
    } else if (key === 40) {
        directionPlayerY = 0;
    }
}

function gamePong() {
    if (game) {
        controlPlayer();
        controlBall();
        controlCpu();
    }
    frames = requestAnimationFrame(gamePong);
}

function start() {
    if (!game) {
        velocityBall = velocityCpu = velocityPlayer = 8;
        cancelAnimationFrame(frames);
        game = true;
        directionPlayerY = 0;
        ballY = 0;
        positionPlayerX = positionPlayerInitialX;
        positionCpuX = positionCpuInititalX;
        if ((Math.random() * 10) < 5) {
            ballX = -1;
        } else {
            ballX = 1;
        }
        positionBallX = positionBallInitialX;
        positionBallY = positionBallInitialY;
        positionPlayerY = positionPlayerInitialY;
        positionCpuY = positionCpuInititalY;
        gamePong();
    }
}

function bootUp() {
    velocityBall = velocityCpu = velocityPlayer = 8;
    buttonStart = document.querySelector('.start');
    buttonStart.addEventListener('click', start);
    player = document.querySelector('#div-player');
    cpu = document.querySelector('#div-cpu');
    ball = document.querySelector('.div-ball');
    panelTextPoints = document.querySelector('#text-points');
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
}

window.addEventListener('load', bootUp);
