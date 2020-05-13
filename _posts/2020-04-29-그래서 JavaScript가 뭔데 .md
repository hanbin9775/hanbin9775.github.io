---
layout: post
author: Joel
tag : front
---

그래서 JavaScript가 뭔데
=======================

<br>
<br>
조엘이 JavaScript에게 말했다.
<br>
<br>
"나 이제 솔직해 지려고.."
<br>
<br>
"무슨 말이야"
<br>
<br>
<strong>"솔직히 나... 아직도 너를 잘 모르겠어..."</strong>

<br>
<br>
<br>
<br>
## 그래서 알아보기로 했다.
<br>
<br>
> <strong>자바스크립트는 웹 페이지에서 작동하는 싱글스레드, 논 블로킹, 비동기 동적  언어이다. call stack, event loop, callback queue와 Browser API 및 기타 API들을 사용하여 작동한다.</strong>

<br>
<br>
음... 그렇구나...
<br>
다 한번 쯤은 들어본 단어들인데 그렇게 가슴에 와 닿지는 않는다.

그럼 JavaScript가 실행되는 런타임을 살펴보자.

JavaScript는 굉장히 다양한 런타임에서 실행되고 있지만 크롬과 Node.js의 런타임인 V8 엔진을 중점으로 살펴보았다. (어차피 핵심 동작 방식은 다 같다고 한다)

다음은 V8 엔진을 단순화해본 그림이다.
<br>
<br>
![Alt text](../../../assets/img/2020-04-29/v8.jpg){: width="70%" height="70%"}
<br>
<br>
메모리 할당이 일어나는 힙과 코드가 실행되면서 호출 스택이 쌓이는 스택이 보인다.

근데 이게 다야?

call stack이랑 event loop이랑 또 뭐 없어??

사실 런타임은 이게 다다.

<br>
<br>
![Alt text](../../../assets/img/2020-04-29/bigpicture.jpg){: width="70%" height="70%"}
<br>
<br>
이것이 JavaScript가 브라우저에서 작동하는 원리를 보여주는 그림이다.

그럼 이게 어떻게 작동하는지 알아보자.

<br>
<br>
<br>
## 싱글 스레드 런타임
<br>
<br>
조사해본 결과 JavaScript는 싱글 스레드 런타임을 가지고 있다고 한다.

이는 결국 하나의 싱글 콜 스택만을 가지고 있다는 말이다.

그럼 이 콜 스택은 어떻게 작동하는가.

간단하다.

함수의 호출이 있으면 스택에 해당 함수를 집어놓고 함수에서 리턴이 일어나면 스택에서 빠져나간다. 

<br>
<br>
![Alt text](../../../assets/img/2020-04-29/callstack.jpg){: width="70%" height="70%"}
<br>
<br>
<br>

## 비동기인 경우에
<br>
<br>
모든 코드가 동기적으로 작동한다면 위의 사실 말고는 더 이상 신경 쓸게 없다.

순서대로 <strong>'호출 = 스택 in' , '리턴 = 스택 out'</strong> 작동 방식만 따라가면 된다.

근데 JavaScript는 비동기적으로 작동한댄다.

스택만으로는 JavaScript의 비동기적 행위(?)를 이해할 수 없다.

여기서 Web API와 call back queue가 활약한다.

<br>
<br>
![Alt text](../../../assets/img/2020-04-29/setTimeout.jpg){: width="70%" height="70%"}
<br>
<br>

call back 함수와 setTimeout의 여행을 함께 따라가보자.

<br>
1. main.js에서 setTimeout 함수가 호출된다. 호출했으므로 스택에 들어간다.

2. setTimeout 함수 자체는 완료되었고 리턴되면서 스택에서 빠져나온다. 이때 중요한 것은 빠져나오면서 Web API에게 시간 정보와 call back (cb)함수를 넘겨 준다는 것이다.

3. 시간 정보와 cb를 넘겨받은 Web API는 넘겨받은 시간 정보만큼 timer를 작동시킨다. timer가 종료되면 task queue에 cb를 넘겨준다.

4. event loop는 task queue에 들어온 작업들을 stack으로 다시 보내는 역할을 한다. 이때 중요한 것은 stack이 비어있어야만 stack으로 보낼 수 있다. 그리고 cb는 스택에서 실행된다.

<br>

이 과정이 JavaScript에서 비동기 함수가 동작하는 방식이다.

<br>
<br>
<br>
## 아하 그래서..!
<br>
<br>
위의 방식으로 작동한다는 것을 알게된 Joel은 이제 왜 setTimeout 함수가 입력한 시간만큼 정확히 딜레이를 하지 않는 이유를 알게 되었다. 

stack -> Web Api -> call back queue -> stack 이라는 단계를 거치면서 작은 딜레이들이 발생할 뿐만 아니라 stack이 비워져 있지 않으면 call back queue에서 stack으로 넘어갈 수가 없었기 때문이었다.

결국 사람들이 event loop를 막지 말라는 것은 이런 것이었다.

스택에 필요없는 느린 코드를 쌓아서 브라우저가 할 일을 못하게 만들지 말아라.

예를 들어 이미지 처리나 애니메이션이 너무 잦으면 call back queue에 방대한 task들이 쌓이게 되면서 느려지게 되는 것이다.

이러한 사실을 통해 효율적인 코드를 실제로 작성하는 것은 또 다른 일이겠지만 그것은 다음에 다루도록 하자.

<br>
<br>
<br>
### 참고

<https://www.youtube.com/watch?v=8aGhZQkoFbQ&t=127s>

이 포스팅을 작성하는데 위 영상이 많은 도움이 되었습니다.

고마워요 Philip!


