# sticky

## 정리

### Waypoints(Sticky) 활용

* [Waypoints plugin - Sticky Elements](http://imakewebthings.com/waypoints/shortcuts/sticky-elements/)

```javascript
this._welSticky = new Waypoint.Sticky({
    element: oSelf._welFixed[0]
});
```

### window resize, scroll 발생 체크

* sticky 처리를 위해 window `resize`, `scroll` 이벤트를 체크하는데 복잡한 소스에서는 부하가 걸릴 수 있다.
* 이를 보완하여 사용하는 것이 [Throttle/debounce plugin](http://benalman.com/projects/jquery-throttle-debounce-plugin/)

* `Throttle`

> 밀리세컨드마다 실행의 흐름을 일정하게 유지    
> 로직 실행 주기를 만드는 함수    
> 밀리세컨드 단위로 시간을 설정하면 스로틀에 넘긴 콜백함수는 설정한 시간 동안 최대 한 번만 호출

* `Debounce`

> 갑작스러운 이벤트(키 입력 등)를 하나로 그룹화함    
> 과다한 이벤트 실행을 방지하기 위해 몇 가지 함수를 한 개의 그룹으로 묶고 특정 시간이 지난 후에야 호출될 수 있도록 구조화하는 것

```javascript
this._window.on('resize', $.debounce( 250, $.proxy(this._onResizeWindow, this)));
this._window.on('scroll', $.debounce( 250, $.proxy(this._onScrollWindow, this)));
```
