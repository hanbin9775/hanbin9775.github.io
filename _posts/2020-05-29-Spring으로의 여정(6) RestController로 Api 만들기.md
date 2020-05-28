---
layout: post
author: Joel
tag : back
---

RestController로 Api 만들기
==============================

<br>
<br>
> 이 글은 '부스트코스'의 강의 내용의 흐름을 따라가며 작성했음을 미리 밝힙니다.

<br>
<br>
<br>
<br>

API..

Application Programming Interface의 약자로 특정 데이터들에 대한 기능을 보다 더 쉽게 접근, 사용할 수 있게 훌륭하신 개발자분들이 만들어둔 인터페이스다.

백엔드에 대한 개념이 없을 때 Api를 사용한 경험이 있었다. 그때는 코드 한줄로 엄청난 양의 데이터를 가져오거나 필요한 정보를 바로 바로 가져오는 API가 마법처럼 느껴졌었다.

이번엔 API를 직접 만들어보자. 아래 과정은 모두 eclipse 개발 통합 환경에서 진행되었다. 

<br>
## 구현
<br>

Spring 4에서 API를 만들기 위해서는 RestController 어노테이션을 사용한다. API는 기본적으로 데이터를 json 객체로 주고 받기 때문에 json 파일 형식을 처리하는 jackson 라이브러리를 porm.xml 파일에 추가해주도록 하자.

<br>
![Alt text](../../../assets/img/2020-05-29/jackson.jpg){: width="70%" height="70%"}
<br>

그 다음에는 실질적으로 API를 구현할 ControllerClass 이다.

<br>

```java
package kr.or.connect.guestbook.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.guestbook.dto.Guestbook;
import kr.or.connect.guestbook.service.GuestbookService;

@RestController
@RequestMapping(path="/guestbooks")
public class GuestbookApiController {
	@Autowired
	GuestbookService guestbookService;
	
	@GetMapping
	public Map<String, Object> list(@RequestParam(name="start", required=false, defaultValue="0") int start) {
		
		List<Guestbook> list = guestbookService.getGuestbooks(start);
		
		int count = guestbookService.getCount();
		int pageCount = count / GuestbookService.LIMIT;
		if(count % GuestbookService.LIMIT > 0)
			pageCount++;
		
		List<Integer> pageStartList = new ArrayList<>();
		for(int i = 0; i < pageCount; i++) {
			pageStartList.add(i * GuestbookService.LIMIT);
		}
		
		Map<String, Object> map = new HashMap<>();
		map.put("list", list);
		map.put("count", count);
		map.put("pageStartList", pageStartList);
		
		return map;
	}
	
	@PostMapping
	public Guestbook write(@RequestBody Guestbook guestbook,
						HttpServletRequest request) {
		String clientIp = request.getRemoteAddr();
		// id가 입력된 guestbook이 반환된다.
		Guestbook resultGuestbook = guestbookService.addGuestbook(guestbook, clientIp);
		return resultGuestbook;
	}
	
	@DeleteMapping("/{id}")
	public Map<String, String> delete(@PathVariable(name="id") Long id,
			HttpServletRequest request) {
		String clientIp = request.getRemoteAddr();
		
		int deleteCount = guestbookService.deleteGuestbook(id, clientIp);
		return Collections.singletonMap("success", deleteCount > 0 ? "true" : "false");
	}
}
```
<br>

부스트코스의 강의를 따라가며 정리하다보니깐 강의 중에 구현했던 서비스 객체를 그대로 사용하였다.

하나씩 살펴보자.

일단 이 컨트롤러가 api를 정의하는 컨트롤러임을 알리기 위해 @RestController를 붙인다.

@RequestMapping 어노테이션을 클래스 레벨에서 선언해줌으로써 클래스 내부의 mapping 메서드들이 공통적으로 매개변수로 주어준 패스를 url로 가지도록 한다. 

@GetMapping 어노테이션을 붙여 get 방식으로 요청이 들어오면 해당 메서드가 실행됨을 명시한다. 위에서 @GetMapping 어노테이션이 붙은 list 메서드는 map 객체를 반환하는데 이는 json 객체로 변환되어 반환된다.

@PostMapping 어노테이션을 붙여 post 방식으로 요청이 들어오면 해당 메서드가 실행됨을 명시한다. 이 메서드의 반환 값 또한 json 객체로 반환되어 클라이언트로 응답된다.

@DeleteMapping 어노테이션을 붙여 특정 데이터를 삭제하는 메서드임을 명시한다. 이 어노테이션은 패스 값이 주어지는데 위에서 @RequsetMapping의 path로 /guestbooks가 주어졌으므로 /guestbooks/5 따위로 요청이 오면 id가 5인 데이터를 삭제하라는 요청이 되겠다. 

<br>
## Restlet Client
<br>

위에서 만든 API를 시험해볼 수 있는 아주 좋은 크롬 확장 프로그램이 있다.

Restlet Client인데 한번 사용해보자.

<br>
![Alt text](../../../assets/img/2020-05-29/restlet.jpg){: width="90%" height="90%"}
<br>

위의 사진은 http://localhost:8080/guestbook/guestbooks의 url로 get 방식의 http 요청을 보내는 모습이다. 

<br>
![Alt text](../../../assets/img/2020-05-29/response.jpg){: width="90%" height="90%"}
<br>

성공적으로 api가 호출됐다면 이렇게 response도 보여준다!

<br>
### 출처 및 참고
<br>

<https://www.edwith.org/boostcourse-web/lecture/16774/>
<br>
<https://www.edwith.org/boostcourse-web/lecture/16773/>
