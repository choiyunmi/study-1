# cocaplay

## 작업방식

> radio 버튼 선택
>
> 선택하기 버튼 클릭 시 #gameLst 영역으로 스크롤 이동
>
> 승자 모드는 무조건 성공, 패자 모드 실패

------------

## 정리

### SSG 방식 익히기

* 외부에서 접근 가능, 접근 불가능
	* 함수, 변수명 앞에 언더스코어(`_`)로 구분

### 화면 스크롤 애니메이션

* 크로스브라우징을 위해 html, body에 같이 적용

```javascript
$("html, body").animate({scrollTop : $('#gameLst').offset().top - 10}, nDuration);
```

* Complete 함수가 두번 실행 문제
	* setTimeout을 사용하여 animate 시간과 동일한 시간 뒤 실행되도록 함(처리 속도에 따라 thread가 바쁠 경우 시간차가 있을 수 있음)
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

### 병뚜껑 애니메이션

* 각각의 병뚜껑에 for문을 이용해서 animate를 적용할 때 promise 사용
* winlane addClass가 실행되기 전에 결과 alert가 뜸
	* delay, queue, dequeue 사용

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
