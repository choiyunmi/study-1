# checkbox, radio

## 정리

### toggleClass

- toggleClass로 addClass, removeClass 한번에 처리 가능

```javascript
// toggleClass 미사용
if (welTarget.is(':checked')) {
  welTarget.parent(this.sTarget).addClass(this.sActiveClass);
} else {
  welTarget.parent(this.sTarget).removeClass(this.sActiveClass);
}
```

```javascript
// toggleClass 사용
welTarget.parent(this.sTarget).toggleClass(this.sActiveClass, welTarget.is(':checked'));
```

* toggleClass(className, state)
  * [jquery api - toggleClass](http://api.jquery.com/toggleclass/#toggleClass-className-state)
* state값이 true이면 addClass, false이면 removeClass



### stop

* 현재 움직이고 있는 애니메이션 효과를 멈춤

* .stop( \[clearQueue\] \[, jumpToEnd\] )

  * [jquery api - stop](http://api.jquery.com/stop/#stop-clearQueue-jumpToEnd)
  * `clearQueue` : boolean 값을 세팅하여 대기중인 효과들의 제거를 결정합니다. 기본값은 false.
  * `jumpToEnd` : boolean 값을 세팅하여 현재 진행중인 애니메이션을 완료할지를 결정합니다. 기본값은 false.

  ​

### event.namespace

* 해당하는 이벤트만 off 시킬 때 사용

```javascript
// clickoutside.closeSelect 이벤트 등록
this.welSelectWrap.on('clickoutside.closeSelect', $.proxy(this.onClickOutside, this));

// clickoutside.closeSelect 이벤트 삭제
this._welSelectWrap.off('clickoutside.closeSelect');
```

* event.namespace
  * [jquery api - event.namespace](https://api.jquery.com/event.namespace/)

