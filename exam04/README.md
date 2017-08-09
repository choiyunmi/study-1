# lineplay

## 작업방식 1

> `랜덤한 index`를 배열에 저장
> 
> 배열에서 첫번째 값 선택
> 
> 선택된 아바타 보이기
> 
> 선택된 아바타 index 배열에서 제거(`shift`)

## 작업방식 2

> index를 순서대로 배열에 저장
> 
> 배열에서 `랜덤한 순서`에 있는 값을 선택
> 
> 선택된 index가 이전 index와 겹치면 index 다시 선택
> 
> 선택된 아바타 보이기
> 
> 선택된 아바타 index 배열에서 제거(`splice`)

------------

## 정리

### SSG 방식 익히기

* 엘리먼트를 저장하는 방식 : wrapper 엘리먼트를 저장, 자식요소 find로 찾기
* 엘리먼트를 저장하는 변수에 접두사 `wel`(wrap element)
	* 헝가리안 표기법에서 Html Element를 뜻하는 `el` 앞에 wrap의 `w`를 붙여줌
	* wrapper가 되는 Element `wel`과  Element `el` 구분이 모호(SSG에서는 모두 `wel`로 사용 중)

```javascript
_assignElements: function() {
	this._welAvatarWrap = $('.create_wrap');
	this._welSwiperContainer = this._welAvatarWrap.find('.swiper-container');
	this._welSwiperWrapper = this._welSwiperContainer.find('.swiper-wrapper');
	this._welSwiperSlide = this._welSwiperWrapper.find('.swiper-slide');
	this._welRandomBtn = this._welAvatarWrap.find('.btn_random');
}
```

<br>

### this 유지

* fadeIn Complete function 안에서 this가 해당 객체를 가리키게 하기 위해서 변수 `oSlef`에 저장

```javascript
var oSelf = this;

this._welSwiperSlide.eq(this._nCurrentIndex).css('z-index', 50).fadeIn(400, function(){
	oSelf._bIsAnimated = false;
});
```

<br>

### 기능별로 분리하여  작성하기
```javascript
_setRandomArray: function() {
	// array 셋팅
},
_setCurrentIndex: function() {
	// 현재 index 셋팅
},
_activeAvatar: function() {
	// 현재 index 아바타 활성화
}
```

<br>
------------
<br>

# cocaplay

## 작업방식

> radio 버튼 선택
>
> 선택하기 버튼 클릭 시 `#gameLst` 영역으로 스크롤 이동
>
> 승자 모드는 무조건 성공, 패자 모드 실패

------------

## 정리

### SSG 방식 익히기

* 외부에서 접근 가능, 접근 불가능
	* 함수, 변수명 앞에 언더스코어(`_`)로 구분

<br>

### 화면 스크롤 애니메이션

* 크로스브라우징을 위해 `html`, `body`에 같이 적용

```javascript
$("html, body").animate({scrollTop : $('#gameLst').offset().top - 10}, nDuration);
```

<br>

* Complete 함수가 두번 실행 문제
	* setTimeout을 사용하여 animate 시간과 동일한 시간 뒤 실행되도록 함(처리 속도에 따라 thread가 바쁠 경우 시간 차가 발생할 수 있음)
	* 변수 flag로 구분하여 한번만 실행되도록 함

```javascript
// Complete 함수가 두번 실행 문제
$("html, body").animate({scrollTop : $('#gameLst').offset().top - 10}, nDuration, function() {
	oSelf._bIsAnimated = false;
	oSelf._startPlay();
});
```

```javascript
// setTimeout 사용
$("html, body").animate({scrollTop : $('#gameLst').offset().top - 10}, nDuration);
setTimeout(function() {
	oSelf._bIsAnimated = false;
	oSelf._startPlay();
}, nDuration);
```

```javascript
// 변수 flag 사용
var bFlag = false;
$('body, html').stop().animate({scrollTop: this.nWelSeWrapOffsetTop}, 200, function () {
	if (!bFlag) {
		oSelf._displayResult();
	};
	bFlag = true;
});
```

<br>

### 병뚜껑 애니메이션

* 각각의 병뚜껑에 for문을 이용해서 animate를 적용할 때 promise 사용
* winlane addClass가 실행되기 전에 결과 alert가 뜸
	* delay, queue, dequeue 사용
* 참고 (**추가적인 공부가 필요합니다!**)
	* [jquery api - promise](https://api.jquery.com/promise/#promise-type-target)
	* [jquery api - deferred object](https://api.jquery.com/category/deferred-object/)

```javascript
for (var i = 0, len = this._aResult.length; i < len; i++) {
	this.elResultLane.eq(i).addClass('grade' + this._aResult[i]);
	this.elResultObj.eq(i).animate({top: aDistance[i] + 'px'}, nDuration);
};

this.elResultObj.promise().done(function() {
	oSelf.elResultLane.eq(nWinIdx).addClass('winlane').delay(100).queue(function() {
		if (oSelf._nSelIdx === nWinIdx) {
			window.alert('당첨되셨습니다.');
		} else {
			window.alert(oSelf._aResult[oSelf._nSelIdx] + 1 + '등 입니다.');
		};
		$(this).dequeue();
	});
});
```
