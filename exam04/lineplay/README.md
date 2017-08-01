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
* 엘리먼트를 저장하는 변수에 접두사 wel(wrap element)
	* 헝가리안 표기법에서 Html Element를 뜻하는 el 앞에 wrap의 w를 붙여줌
	* wrapper가 되는 Element wel과 el 구분이 모호(SSG에서는 모두 wel로 사용 중)

### this 유지

* fadeIn Complete function 안에서 this가 해당 객체를 가리키게 하기 위해서 변수 `oSlef`에 저장

```javascript
var oSelf = this;

this._welSwiperSlide.eq(this._nCurrentIndex).css('z-index', 50).fadeIn(400, function(){
	oSelf._bIsAnimated = false;
});
```

### 기능별로 함수 분리해서 작성하기
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
