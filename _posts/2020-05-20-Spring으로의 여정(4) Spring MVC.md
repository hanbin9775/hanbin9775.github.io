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
## Spring MVC 설정하기
<br>
Spring MVC를 사용하기 위해 필요한 설정들을 알아보자.

<br>
### FrontController
<br>

Spring MVC에서 FrontController의 역할을 하는 DispatcherServlet을 제공한다. 

제일 먼저 해야할 것은 DispatcherServlet을 FrontController로 등록하는 일이다. 등록하는 방법은 3가지가 존재한다.

<br>

1. web.xml 파일에서 설정
2. ServletContainerInitializer를 구현하는 클래스를 이용해서 설정
3. WebApplicationInitializer 인터페이스를 구현하는 방법

<br>
아래는 web.xml 파일에서 설정하는 방법이다.

<br>

```html
<?xml version="1.0" encoding="UTF-8"?>
<web-app>

  <display-name>Spring JavaConfig Sample</display-name>

  <servlet>
    <servlet-name>mvc</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
      <param-name>contextClass</param-name>
      <param-value>org.springframework.web.context.support.AnnotationConfigWebApplicationContext</param-value>
    </init-param>
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>kr.or.connect.mvcexam.config.WebMvcContextConfiguration</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
  </servlet>
  <servlet-mapping>
    <servlet-name>mvc</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>


</web-app>
```
<br>

Java Config Spring 설정을 읽어들이도록 DispatcherServlet을 설정하는 코드이다.

servlet-class 태그는 servlet을 DispatcherServlet으로 할 것임을 명시한다.

init-param 태그는 실제로 어떤 작업을 핸들러 컨트롤러에 위임할 것인지를 명시한다. 

xml에서 이러한 설정을 한다는 걸 명시한다면 java config에서는 그런 설정을 어떻게 할 것인가를 명시한다.

<br>

```java
package kr.or.connect.mvcexam.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = { "kr.or.connect.mvcexam.controller" })
public class WebMvcContextConfiguration extends WebMvcConfigurerAdapter {
	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/assets/**").addResourceLocations("classpath:/META-INF/resources/webjars/").setCachePeriod(31556926);
        registry.addResourceHandler("/css/**").addResourceLocations("/css/").setCachePeriod(31556926);
        registry.addResourceHandler("/img/**").addResourceLocations("/img/").setCachePeriod(31556926);
        registry.addResourceHandler("/js/**").addResourceLocations("/js/").setCachePeriod(31556926);
    }
 
    // default servlet handler를 사용하게 합니다.
    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
   
    @Override
    public void addViewControllers(final ViewControllerRegistry registry) {
    		System.out.println("addViewControllers가 호출됩니다. ");
        registry.addViewController("/").setViewName("main");
    }
    
    @Bean
    public InternalResourceViewResolver getInternalResourceViewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/views/");
        resolver.setSuffix(".jsp");
        return resolver;
    }
}
```
<br>
@Configuration 어노테이션은 이게 java config 클래스임을 명시한다.

@EnableWebMvc는 web에 필요한 빈들을 대부분 자동으로 설정해준다. 기본 설정 이외의 설정이 필요하다면 WebMvcConfigurerAdaptor를 상속받아 필요한 메소드를 오버라이딩하면 된다.

@ComponentScan 어노테이션은 매개변수로 주어진 패키지 이하의 Controller, Service, Repository, Component 어노테이션이 붙은 클래스를 찾아 스프링 컨테이너가 관리하게 된다.

addResourceHandlers 메서드는 dispatcherservlet에 들어오는 특정 요청을 처리하는 메서드이다.

configureDefaultServletHandling은 default servlet handler를 사용하게 하는 메서드이다.

addViewController 메서드는 특정 url에 대한 처리를 controller 클래스를 작성하지 않고 처리할 수 있게하는 메서드이다. 위에서는 '/' 의 요청이 들어온다면 main이라는 뷰로 보여준다. 이 main이라는 정보로만은 해당 뷰를 찾을 수 없다. 그래서 아래의 viewResolver 메서드에서 해당 뷰를 찾을 수 있게끔 가공되어 반환된다.

<br>

### Handler Controller
<br>

실제 요청을 처리하는 Controller(handler) 클래스

<br>

```java
package kr.or.connect.mvcexam.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PlusController {
	@GetMapping(path = "/plusform")
	public String plusform() {
		return "plusForm";
	}

	@PostMapping(path = "/plus")
	public String plus(@RequestParam(name = "value1", required = true) int value1,
			@RequestParam(name = "value2", required = true) int value2, ModelMap modelMap) {
		int result = value1 + value2;

		modelMap.addAttribute("value1", value1);
		modelMap.addAttribute("value2", value2);
		modelMap.addAttribute("result", result);
		return "plusResult";
	}
}
```
<br>

@Controller는 이 클래스가 컨트롤러 클래스임음 명시한다.

@GetMapping은 get의 http request를 처리하는 메서드임을 명시한다.

@PostMapping은 post의 http request를 처리하는 메서드임을 명시한다.

@RequestParam은 mapping된 메서드의 인자에 붙일 수 있는 어노테이션이다. name에는 http parameter의 name과 mapping이 된다. required는 필수인지 아닌지 판단한다.

plus 메서드의 인자로 ModelMap 객체가 있는 것이 보인다. spring을 사용할 때는 보통 httpservletrequest 객체에 직접 값을 저장하는 것이 아니라 modelmap 객체에 값을 매핑한다.

<br>
## View
<br>

다음은 MVC 모델의 View가 될 jsp 파일이다.

plusForm.jsp
<br>

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<form method="post" action="plus">  
value1 : <input type="text" name="value1"><br>
value2 : <input type="text" name="value2"><br>
<input type="submit" value="확인">  
</form>  
</body>
</html>
```
<br>

plusResult.jsp
<br>

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
${value1} 더하기 ${value2} (은/는) ${result} 입니다.
</body>
</html>
```
<br>

post http request로 넘겨 받은 값을 컨트롤러 클래스에서 ModelMap 객체에 매핑시키고 이를 처리해서 다시 보여준다.

<br>

### 출처

<https://www.edwith.org/boostcourse-web/lecture/16764/>