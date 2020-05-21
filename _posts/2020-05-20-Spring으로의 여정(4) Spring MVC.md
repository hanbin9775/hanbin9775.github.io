---
layout: post
author: Joel
tag : back
---

Spring MVC
==========
<br>
<br>
> 이 글은 '부스트코스'의 강의 내용의 흐름을 따라가며 작성했음을 미리 밝힙니다.

<br>
<br>
<br>
<br>
Model, View, Controller의 약자. 어플리케이션을 세가지의 역할로 구분한 디자인 패턴이다.

Model은 어플리케이션에서 실질적으로 사용할 데이터다. 

View는 실질적으로 보이는 부분이며 Model을 사용해 렌더링을 한다. 

Controller는 사용자의 액션에 응답하는 컴포넌트이다. Model을 업데이트하고 다른 액션을 수행한다.

Spring의 모듈 중 하나인 Web 모듈에는 MVC 디자인 패턴이 구현이 되어 있는데 이를 Spring MVC라고 한다.

그럼 좀 더 자세히 살펴보자.

<br>
<br>
## 구조
<br>
![Alt text](../../../assets/img/2020-05-20/SpringMVC.jpg){: width="70%" height="70%"}
<br>
<br>
Spring MVC는 위와 같은 구조를 가진다.

특징이라고 하자면 컨트롤러가 요청을 받아들이는 프론트 컨트롤러와 실제 요청을 처리하는 핸들러 컨트롤러로 나뉘어져 있다.
실행 순서를 살펴보자.

1. 클라이언트가 서버에 요청을 한다. 모든 요청은 프론트 컨트롤러라는 서블릿에서 받아들인다. 
2. 받은 요청을 핸들러 컨트롤러로 보내 처리하도록 한다.
3. 핸들러 컨트롤러는 처리한 결과를 모델에 담고 다시 프론트 컨트롤러에게 보낸다.
4. 프론트 컨트롤러는 알맞은 뷰에게 모델을 전달한다.
5. 뷰에서 처리한 결과를 프론트 컨트롤러를 통해 클라이언트로 다시 내보낸다. 

<br>
<br>
## 구현
<br>
Spring MVC의 구성 요소들을 직접 구현해보자.

<br>
### FrontController
<br>

Spring MVC에서 FrontController의 역할을 하는 DispatcherServlet을 제공한다. 

제일 먼저 해야할 것은 DispatcherServlet을 FrontController로 등록하는 일이다. 등록하는 방법은 3가지가 존재한다.

<br>

1. web.xml 파일에서 설정
2. ServletContainerInitializer를 구현하는 클래스를 이용해서 설정
3. WebApplicationInitializer 인터페이스를 구현하는 방법


