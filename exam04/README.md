# lineplay

## 작업방식 1

> `랜덤한 index`를 배열에 저장
>
> 배열에 랜덤한 index를 저장할 때 첫번째로 저장되는 index가 이전 index와 겹치면 제거(`pop`)
>
> 선택된 아바타 보이기
>
> 선택된 아바타 index 배열에서 제거(`shift`)

## 작업방식 2

> index를 순서대로 배열에 저장
>
> index에서 `랜덤한 순서`에 있는 값을 선택
>
> 선택된 index가 이전 index와 겹치면 index 다시 선택
>
> 선택된 아바타 보이기
>
> 선택된 아바타 index 배열에서 제거(`splice`)



## 정리

* ssg 방식 익히기
  * 엘리먼트를 저장하는 방식 wrap을 타고 find로 찾기
  * 엘리먼트를 저장하는 변수에는 접두사 wel(wrap element)
* `var oSelf = this;`
  * function 안에서 this가 object를 가리키게 하기 위해서 변수 `oSlef`에 저장