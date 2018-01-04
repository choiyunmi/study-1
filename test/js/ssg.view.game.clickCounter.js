var ssg = ssg || {};
ssg.View = ssg.View || {};
ssg.Event = ssg.Event || {};
ssg.Event.emitter={subscribers:{},on:function(s,t,i){this.subscribers[s]=this.subscribers[s]||[],this.subscribers[s].push({callback:t,context:i})},off:function(s,t,i){var r,c,e=this.subscribers[s];if(e)for(r=e.length-1;r>=0;){if(c=e[r],c.callback===t&&(!i||c.context===i)){e.splice(r,1);break}r--}},emit:function(s){var t,i=this.subscribers[s],r=0,c=Array.prototype.slice.call(arguments,1);if(i)for(;r<i.length;)t=i[r],t.callback.apply(t.context||this,c),r++}};
ssg.Util = {
    CountDown: function(options){
        var timer,
            instance = this,
            seconds = options.seconds || 10,
            updateStatus = options.onUpdateStatus || function () {},
            counterEnd = options.onCounterEnd || function () {};

        function decrementCounter() {
            updateStatus(seconds);
            if (seconds === 0) {
                counterEnd();
                instance.stop();
            }
            seconds--;
        }

        this.start = function () {
            clearInterval(timer);
            timer = 0;
            seconds = options.seconds;
            timer = setInterval(decrementCounter, 1000);
        };

        this.stop = function () {
            clearInterval(timer);
        };

        this.restart = function(){
            seconds = options.seconds;
            this.stop();
            this.start();
        };
    }
};
ssg.View.game = ssg.View.game || {};
ssg.View.game.clickCounter = function(htOptions){
    $.extend(this, htOptions || {});
    this.init();
};

ssg.View.game.clickCounter.prototype = $.extend({
    nSeconds: null,
    htCountDown: {
        seconds: 10,
        onUpdateStatus: $.noop,
        onCounterEnd: $.noop
    },
    _bPaused: true,
    _nClickCount: 0,
    _nTotalCount: 0,
    _nEventGameStep: null,
    init: function(){
        if(this.nSeconds > 0){
            this._assignElements();
            this._attachEventHandlers();
            this._initVars();
            this._initTimer();
        }
    },
    _assignElements: function(){
        this._welEventWrap = $('#_evt_game');
        this._welEventTimer = this._welEventWrap.find('.evt_timer');
        this._welEventTimerFirst = this._welEventTimer.find('span').eq(0);
        this._welEventTimerSecond = this._welEventTimer.find('span').eq(1);
        this._welEventCounter = this._welEventWrap.find('.evt_counter');
        this._welEventGameArea = this._welEventWrap.find('.game');
        this._welEventGameImg = this._welEventGameArea.find('.img');
        this._welEventStartBtn = this._welEventWrap.find('#_btn_start');
        // this._welEventClickBtn = this._welEventWrap.find('#_btn_click');
    },
    _attachEventHandlers: function(){
        // this._welEventStartBtn.on('click', $.proxy(this._onClickStartBtn, this));
        this._welEventGameImg.on('touchstart', $.proxy(this._onTouchstartGameImg, this));
    },
    _initVars: function(){
        this._nEventGameStep = this._welEventGameImg.length;
        this.htCountDown.seconds = this.nSeconds;
        $.extend(true, this.htCountDown, {onUpdateStatus: $.proxy(this._onUpdateStatus, this), onCounterEnd: $.proxy(this._onCounterEnd, this)});
    },
    _initTimer: function(){
        this._setTimer(this._zeroFillLeft(this.nSeconds));
        this.CountDown = new ssg.Util.CountDown(this.htCountDown);
    },
    _initCounter: function(){
        this._nClickCount = 0;
        this._nTotalCount = 0;
        this._setCounter(0);
    },
    _onClickGameStartBtn: function(){
        this.start();
    },
    _onTouchstartGameImg: function(e){
        e.preventDefault();
        var oSelf = this;

        if (!this._bPaused) {
            this._nClickCount += 1;
            this._welEventGameImg.eq(this._nEventGameStep - this._nClickCount).hide();

            if(this._nClickCount > this._nEventGameStep - 1){
                this._nTotalCount += 1;
                this._nClickCount = 0;
                this._setCounter(this._nTotalCount);
                this._welEventGameImg.show();
            }

            this._bPaused = true;
            setTimeout(function() {
                oSelf._bPaused = false;
            }, 100);
        }
    },
    _setTimer: function(nSeconds){
        this._welEventTimerFirst.text(nSeconds.split('')[0]);
        this._welEventTimerSecond.text(nSeconds.split('')[1]);
    },
    _setCounter: function(nCount){
        this._welEventCounter.text(nCount);
    },
    _onUpdateStatus: function(nSecond){
        this._setTimer(this._zeroFillLeft(nSecond));
    },
    _onCounterEnd: function(){
        var oSelf = this;
        this.pause();

        setTimeout(function(){
            oSelf.emit('end.clickCounter');
        }, 200);
    },
    _zeroFillLeft: function (nNumber) {
        return nNumber < 10 ? '0' + nNumber : nNumber + '';
    },
    _getTotalCount: function(){
        return this._nTotalCount;
    },
    pause: function(){
        this._bPaused = true;
    },
    start: function(){
        this._bPaused = false;
        this.CountDown.start();
    },
    _reset: function(){
        this._bPaused = false;
        this._initCounter();
        this._welEventGameImg.show();
    },
    restart: function(){
        this._reset();
        this._initTimer();
        this.CountDown.start();
    }
}, ssg.Event.emitter);