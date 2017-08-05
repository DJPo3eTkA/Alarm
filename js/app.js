function onReady() {
  var clock = new App.Clock('.clock');

}

Date.__interval = 0;
Date.__aDates = [];
Date.addToInterval = function (date) {
  this.__aDates.push(date);

  if (!this.__interval) {
    this.__interval = setInterval(function(){Date.updateDates();}, 1000);
  }
}

Date.updateDates = function () {
  for (var i = 0; i < this.__aDates.length; i++) {
    if (this.__aDates[i] instanceof Date) {
      this.__aDates[i].updateSeconds();
    } else if (this.__aDates[i] instanceof Function) {
      this.__aDates[i]();
    } else if (this.__aDates[i] && this.__aDates[i]['update']) {
      this.__aDates[i].update();
    }
    // this.__aDates[i].updateSeconds();
  }
}

Date.prototype.updateSeconds = function() {
  this.setSeconds(this.getSeconds() + 1);
};
Date.prototype.autoClock = function(isAuto) {
  if (isAuto) {
    Date.addToInterval(this);
  }
};
  var dBoy = dBoy || {};
  dBoy.fresh = dBoy.fresh || {};
  var App = dBoy.fresh;

App.Clock = function (id, almH, almM) {
  var that = this;
  var d = new Date();
  this.d = d;
  this.d.autoClock(true);
  this.id = id;
  this.dom = document.querySelector(id);
  this.dom.contentEditable = true;
  this.dom.addEventListener('focus', function (e) {
      this.innerHTML = this.innerHTML.slice(0, this.innerHTML.lastIndexOf(':'));
      that.tick(false);
    });
    this.dom.addEventListener('blur', function (e) {
      var a = this.innerHTML.split(':');

      that.almH = parseInt(a[0]);
      that.almM = parseInt(a[1]);
      
      if ( (that.almH >= 0 && that.almH < 24) && (that.almM >= 0 && that.almM < 60) ) {
        var newEvent = new Event('restart_tick');
        this.dispatchEvent(newEvent);
      }
    });
    this.dom.addEventListener('restart_tick', function() {
      that.tick(true);
    });

    this.tick(true);
  Date.addToInterval(function(){that.updateClock();});
  }

  App.Clock.snd = new Audio('you_know_you_like_it.mp3');
  
  
  // setInterval(function(){that.updateClock();}, 1000);
  // this.updateClock();
  


App.Clock.prototype.tick = function(isTick) {
  this.isTicking = isTick;
};

App.Clock.prototype.updateClock = function() {
  if (this.isTicking) {
    var date = this.d,
        clock = document.querySelector(this.id);
        body = document.body,
        color = document.getElementById('color');
        h = this.formatDigits(date.getHours());
        min = this.formatDigits(date.getMinutes());
        sec = this.formatDigits(date.getSeconds());
    clock.innerHTML = this.formatOutput(date.getHours(), date.getMinutes(), date.getSeconds());
    color.textContent = '#' + h + min + sec;
    body.style.background = '#' + h + min + sec;
  }
  
};

  App.Clock.prototype.formatOutput = function(h, m, s) {
    var output, snd = App.Clock.snd;
    if (h === this.almH && m === this.almM) {
     snd.play();
     output = 'WAKE UP';
   } else {
       snd.pause();
       output = this.formatDigits(h) + ':' + this.formatDigits(m) 
    + ':' + this.formatDigits(s);  
  }
    return output; 
  }
  App.Clock.prototype.formatDigits = function(val) {
    if (val < 10) {
    val = '0' + val;
    }
    return val;
  };



window.onload = onReady;