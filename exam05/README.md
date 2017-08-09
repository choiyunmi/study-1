# layerpopup

## 작업방식

> 레이어 띄우기 버튼을 클릭할 경우 `.js-layer-area`를 보여지게 한다.
> 
> `.js-layer-area`가 보이면, 포커스를 해당 레이어로 이동시킨다. tip) tabIndex & focus
>
> 닫기 버튼을 누르면, `.js-layer-area`가 닫힌 후 레이어 띄우기 버튼으로 포커스를 이동 시킨다.
> 
> 버튼을 여러개 존재할 때, 각 버튼을 클릭할 때마다 해당 레이어를 띄우지만, 레이어가 닫힐 경우 클릭한 버튼으로 포커스를 이동시킨다.

-------------------

## 정리

### 옵션 값 받아오기

* 옵션 값 받아오기(`$.extend()` 사용)
* 참고
  - [jquery api - extend](https://api.jquery.com/jquery.extend/)

```javascript
exam.View.layerpopup = function(htOptions) {
    $.extend(this, htOptions || {});
    this.init();
};

...

$(function() {
    var oExamViewLayerpopup = new exam.View.layerpopup({
        sLayer: '.layer_pos'    // 옵션 변경(layer 클래스명)
    });
});
```

<br>

### clickoutside 이벤트

* 타겟레이어를 보이고 나서 곧바로 `clickoutside` 이벤트를 등록하면, 즉시 `_onClickClearLayer` 이벤트가 실행되어 버림
* `delay` 필요
* 플러그인을 사용하지 않을 시 `e.stopPropagation();` 활용 (부모태그로의 이벤트 전파 중지)
* 참고
  - [jquery api - stoppropagation](https://api.jquery.com/event.stoppropagation/)

```javascript
// 타겟레이어 보이고 나서 clickoutside 이벤트 등록
this._welTargetLayer.show().delay(50).queue(function() {
    var $this = $(this);
    $this.on('clickoutside.closeLayer', $.proxy(oSelf._onClickClearLayer, oSelf));
    $(this).dequeue();
});
```

<br>

### 레이어팝업 안에서 포커스 이동

* 레이어팝업 영역 전과 후에 포커스를 받을 수 있는 element 추가
* 해당 element에 포커스가 갔을 때 타겟 레이어 혹은 닫기 버튼으로 포커스 이동

```javascript
_setFocusTag: function() {
    var focusOutTagClass = 'js-focusout',
        focusOutTag = '<span class="' + focusOutTagClass + '" tabindex="0" style="overflow:hidden;position:absolute;left:0;top:0;z-index:-1;width:1px;height:1px;font-size:0;line-height:0"></span>';
        
    this._welLayerArea.before(focusOutTag);
    this._welLayerArea.after(focusOutTag);
    
    this._welPrevFocus = this._welLayerArea.prev();
    this._welNextFocus = this._welLayerArea.next();
    
    this._welPrevFocus.on('focusin', $.proxy(this._prevFocusFunc, this));
    this._welNextFocus.on('focusin', $.proxy(this._nextFocusFunc, this));
},
```

<br>

### 이벤트 삭제

* 중복으로 이벤트가 등록 되지 않도록 이벤트 삭제 필요

```javascript
_onHideTargetLayer: function() {
    this._welTargetLayer.hide().off('clickoutside.closeLayer');    // 타겟레이어 숨기고 clickoutside 이벤트 삭제
    this._welLayerCloseBtn.off('click.closeLayer');    // 타켓레이어의 닫기 버튼 이벤트 삭제
},
```

<br>

-------------------

<br>

# tab_carousel

## 작업방식

> 테마(Number)를 클릭할 경우, 각 Number와 매칭되는 컨텐츠(Number)를 보여지게 한다.
> 
> 이전/다음 버튼을 클릭할 경우, 기존 Number들을 -/+ 하면서 보여지게 하고, loop 되게 한다.
> 
> 해당 컨텐츠에 맞는 Number를 페이징처럼 보여지게 한다. ( 4번째 컨텐츠이면, 4 / 8 )
> 
> fade, slide 인터렉션 적용

-------------------

## 정리

### 인터렉션 타입에 따라 분리하여 처리

* `default`, `fade`, `slide`

```javascript
// show 처리
switch (this.sType) {
    case 'default':
        this._showTypeDefault();
        break;
    case 'fade':
        this._showTypeFade();
        break;
    case 'slide':
        this._showTypeSlide(-1);
        break;
    default:
        alert('default, fade, slide만 가능합니다.');
}
```

<br>

### 인터렉션 slide 처리

* 방향에 따라 `direction` (1, -1)로 처리

```javascript
// 이전 슬라이드로 이동
this._showTypeSlide(-1);

// 다음 슬라이드로 이동
this._showTypeSlide(1);

...

// current 슬라이드, next 슬라이 뷰처리
this._welCarouselArticle.eq(this.nCurrentIndex).animate({'left': -100 * direction + '%'}, 400);
this._welCarouselArticle.eq(this.nNextIndex).css('left', 100 * direction + '%').animate({'left': 0}, 400, function () {
    oSelf.isAnimated = false;
});
```
