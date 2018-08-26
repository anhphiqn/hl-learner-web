'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHoursMinutesSeconds = exports.getHoursMinutes = exports.getSeconds = exports.getMinutes = exports.getHours = undefined;

var _dates = require('react-clock/dist/shared/dates');

exports.getHours = _dates.getHours;
exports.getMinutes = _dates.getMinutes;
exports.getSeconds = _dates.getSeconds;
var getHoursMinutes = exports.getHoursMinutes = function getHoursMinutes(date) {
  if (!date) {
    return date;
  }

  var hours = ('0' + (0, _dates.getHours)(date)).slice(-2);
  var minutes = ('0' + (0, _dates.getMinutes)(date)).slice(-2);

  return hours + ':' + minutes;
};

var getHoursMinutesSeconds = exports.getHoursMinutesSeconds = function getHoursMinutesSeconds(date) {
  if (!date) {
    return date;
  }

  var hours = ('0' + (0, _dates.getHours)(date)).slice(-2);
  var minutes = ('0' + (0, _dates.getMinutes)(date)).slice(-2);
  var seconds = ('0' + (0, _dates.getSeconds)(date)).slice(-2);

  return hours + ':' + minutes + ':' + seconds;
};