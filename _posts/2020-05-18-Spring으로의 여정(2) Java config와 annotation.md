---
layout: post
author: Joel
tag : back
---

Java config와 Annotation
========================
<br>
<br>
> 이 글은 '부스트코스'의 강의 내용의 흐름을 따라가며 작성했음을 미리 밝힙니다.

<br>
<br>
<br>
<br>
지난 포스팅에서 xml 파일 설정으로 Bean 클래스에 DI(의존성 주입)을 해보았다.

사실 더 간단하고 직관적인 방법으로 DI를 적용할 수 있다.

<br>
<br>
## Java config 파일과 Annotation
<br>
<br>
이 포스팅에서는 Java config 파일과 annotation 태그로 DI를 적용하는 방법에 대해 알아보겠다.

방법은 더 직관적이다.

우선 Java Config 파일을 만들어주자.

<br>
<br>

```java
package kr.or.connect.diexam01;
import org.springframework.context.annotation.*;

@Configuration
public class ApplicationConfig {
	@Bean
	public Car car(Engine e) {
		Car c = new Car();
		c.setEngine(e);
		return c;
	}
	
	@Bean
	public Engine engine() {
		return new Engine();
	}
}
```
<br>
<br>

이 파일에서 우리가 사용할 Bean 클래스의 정의와 DI가 이루어진다.

하나씩 살펴보자.

일단 앞에 @가 붙은 것들이 annotation들이다. 이 파일에서 작성한 클래스와 메소드들이 어떤 역할을 하는지 스프링에게 알리는 것이다.

@Configuration annotation이 붙은 ApplicationConfig 클래스는 JavaConfig로 설정할 클래스임을 명시한다.

@Bean annotation이 붙은 메소드들은 AnnotationConfigApplicationContext가 자동으로 실행하여 그 결과로 리턴하는 객체들을 기본적으로 싱글턴으로 관리를 하게 된다.

DI가 적용됐음을 확인해보자.

<br>
<br>

```java
package kr.or.connect.diexam01;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class ApplicationContextExam03 {

	public static void main(String[] args) {
		ApplicationContext ac = new AnnotationConfigApplicationContext(ApplicationConfig.class);
		   
		Car car = (Car)ac.getBean("car");
		car.run();
		
	}
}
```
<br>
<br>

전에 xml 파일 설정으로 ClassPath에서 설정을 읽어왔기 때문에 ClassPathXMLApplicationContext를 이용했다면, 이제는 AnnotationConfigApplicationContext를 이용한다.

아까 Java Config 파일에서 설정해준 Bean 클래스를 getBean 메서드로 가져오는 코드이다. 

다시 ApplicationConfig 파일로 돌아가서..

사실 annotation을 좀 더 활용하면 ApplicationConfig에서 작성한 설정을 더욱 간단하게 만들 수 있다.

<br>
<br>

```java
package kr.or.connect.diexam01;
import org.springframework.context.annotation.*;

@Configuration
@ComponentScan("kr.or.connect.diexam01")
public class ApplicationConfig2 {
}
```

<br>
<br>

짠! 더 간단해졌다.

기존의 코드에서 Bean을 생성하는 메서드를 모두 제거했다. 단, @Configuration 아래 @ComponentScan이라는 annotation을 추가해줬다.

@ComponentScan annotation은 파라미터로 들어온 패키지 이하에서 @Controller, @Service, @Repository, @Component 어노테이션이 붙어 있는 클래스를 찾아 메모리에 모두 올려준다.

그렇다면 파라미터로 설정한 패키지에 Car 클래스와 Engine 클래스를 작성해주도록 하자.

<br>
<br>

```java
package kr.or.connect.diexam01;

import org.springframework.stereotype.Component;

@Component
public class Engine {
	public Engine() {
		System.out.println("Engine 생성자");
	}
	
	public void exec() {
		System.out.println("엔진이 동작합니다.");
	}
}
```

<br>
<br>

```java
package kr.or.connect.diexam01;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Car {
	@Autowired
	private Engine v8;
	
	public Car() {
		System.out.println("Car 생성자");
	}
	
	public void run() {
		System.out.println("엔진을 이용하여 달립니다.");
		v8.exec();
	}
}
```
<br>
<br>

@Autowired라는 annotation이 새로 등장했다. 이게 뭐냐면 Engine 타입의 객체가 생성된 게 있으면 v8에 주입을 해달라는 거다. @Autowired가 알아서 해주기 때문에 setter 메서드는 이제 필요없다.

그리고 다음은 수정된 JavaConfig를 읽어들여 실행하는 클래스이다.

<br>

```java
package kr.or.connect.diexam01;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class ApplicationContextExam04 {

	public static void main(String[] args) {
		ApplicationContext ac = new AnnotationConfigApplicationContext(ApplicationConfig2.class);
		   
		Car car = ac.getBean(Car.class);
		car.run();
		
	}
}
```
<br>
<br>

Spring에서 사용하기에 알맞게 @Controller, @Service, @Repository, @Component annotation이 붙어 있는 객체들은 ComponentScan을 이용해서 읽어들이고 이러한 annotation이 붙어 있지 않은 객체는 @Bean annotation을 이용하여 직접 생성해주는 방식으로 클래스들을 관리하면 편리하다.


<br>
<br>
### 출처 
<br>
<br>
<https://www.edwith.org/boostcourse-web/lecture/20658/>
<br