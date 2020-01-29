'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP_BIG = 50;
var GAP_SMALL = 10;
var BAR_WIDTH = 40;
var congratulationsGap = CLOUD_HEIGHT - GAP_BIG;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP_SMALL, CLOUD_Y + GAP_SMALL, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP_BIG, GAP_SMALL * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP_BIG, GAP_SMALL * 4);

  var maxTime = getMaxElement(times);
  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = 'hsl(240, ' + getRandomInt(0, 100) + '%, 50%)';
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    var barChartX = CLOUD_X + GAP_BIG + (GAP_BIG + BAR_WIDTH) * i;
    var barChartY = CLOUD_Y + congratulationsGap;
    var barHeight = (CLOUD_HEIGHT - GAP_BIG * 2 - GAP_SMALL * 2) * times[i] / maxTime;

    ctx.fillText(Math.round(times[i]), barChartX, barChartY - barHeight);
    ctx.fillText(players[i], barChartX, barChartY + GAP_SMALL);
    ctx.fillRect(barChartX, barChartY, BAR_WIDTH, GAP_SMALL * 2 - barHeight);
  }
};
