---
layout: post
author: Joel
tag : back
---

Spring JDBC
===========
<br>
<br>
> 이 글은 '부스트코스'의 강의 내용의 흐름을 따라가며 작성했음을 미리 밝힙니다.

<br>
<br>
<br>
<br>
전에 자바에서 mysql db에 접근할 때 연결 작업이 여간 귀찮은 일이 아니었다.
다행히도 Spring에서는 JDBC 작업을 지원한다.
Spring JDBC라는 패키지가 그것인데,
이는 개발하기 지루한 JDBC의 모든 저수준 세부사항을 처리해준다.

<br>
<br>
## Spring JDBC Packages
<br>
<br>
Spring JDBC의 추상화 프레임워크는 다음과 같은 패키지로 이루어져있다.

* org.springframework.jdbc.core
* org.springframework.jdbc.datasource
* org.springframework.jdbc.object
* org.springframework.jdbc.support

각 패키지의 역할과 기능은 더 공부해가면서 알아보도록 하자.

우선 org.springframework.jdbc.core에서 가장 중요한 클래스인 JdbcTemplate에 대해 알아보자.

이 클래스는 리소스 생성, 해지를 처리해서 연결을 닫는 것을 잊어 발생하는 문제 등을 피할 수 있도록 한다. 또 스테이트먼트의 생성과 실행을 처리하고 SQL 조회, 업데이트, 저장 프로시저 호출, ResultSet 반복 호출 등을 실행한다.

<br>
<br>
## 구조
<br>
<br>
자 우리가 Spring JDBC를 사용하여 만들 프로그램의 구조이다.

<br>
![Alt text](../../../assets/img/2020-05-18/overallstructure.jpg){: width="70%" height="70%"}
<br>

하나씩 살펴보자.

ApplicationContext는 spring에서 제공하는 총 관리자격의 Ioc/DI 컨테이너이다. ApplicationConfig는 ApplicationContext에게 어떤 설정을 사용할 것인가를 알려주는 파일이다. DBConfig 파일은 데이터베이스 설정만 따로 담고 있는 파일이다. DBConfig에서 Connection Pool을 관리하는 DataSource 객체도 생성한다. 

RoleDto는 우리가 데이터베이스에서 가져온 데이터들을 담을 객체이다.  RoleDaoSqls는 우리가 쓸 sql 문들을 미리 상수 형태로 저장해두는 파일이다. RoleDao는 데이터베이스에서 가져온 데이터를 조회하거나 조작하는 기능을 전담하도록 만든 객체이다. NamedParameterJDBCTemplate라든가 SimpleJdbcInsert 같은 객체들은 Spring JDBC가 제공해주는 객체이다. Dao가 실제 실행할 때 Spring JDBC가 실제 JDBC를 조금 편하게 하기 위해서 미리 구현해둔 객체들이라고 보면 된다. 

<br>
<br>
## 구현
<br>
<br>
프로젝트 생성, 라이브러리 추가, 기타 설정은 넘어가기로 하자. 대신 링크를 남겨두겠다.

[부스트코스에서 자세하게 보기][link]

[link]: https://www.edwith.org/boostcourse-web/lecture/20661/

아까 위에서 살펴봤던 클래스와 객체가 실제 어떻게 구현되는지 살펴보자.

ApplicationConfig.java
<br>
<br>

```
package kr.or.connect.daoexam.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({DBConfig.class})
@ComponentScan(basePackages = { "kr.or.connect.daoexam.dao" })
public class ApplicationConfig {

}
```
<br>
<br>
DBConfig.java
<br>
<br>

```
package kr.or.connect.daoexam.config;

import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
public class DBConfig {
	private String driverClassName = "com.mysql.jdbc.Driver";
    private String url = "jdbc:mysql://localhost:3306/connectdb?useUnicode=true&characterEncoding=utf8";

    private String username = "connectuser";
    private String password = "connect123!@#";

    @Bean
    public DataSource dataSource() {
    	BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;

    }
}
```
<br>
<br>

DBConfig에서 생성한 DataSource 객체가 실제로 Connection Pool에서 커넥션을 얻어왔는지 확인해보자.

DataSourceTest.java
<br>
<br>

```
package kr.or.connect.daoexam.main;

import java.sql.Connection;

import javax.sql.DataSource;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import kr.or.connect.daoexam.config.ApplicationConfig;

public class DataSourceTest {

	public static void main(String[] args) {
		ApplicationContext ac = new AnnotationConfigApplicationContext(ApplicationConfig.class);
		DataSource ds = ac.getBean(DataSource.class);
		Connection conn = null;
		try {
			conn = ds.getConnection();
			if(conn != null)
				System.out.println("접속 성공^^");
		}catch (Exception e) {
			e.printStackTrace();
		}finally {
			if(conn != null) {
				try {
					conn.close();
				}catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

}
```
<br>
<br>

DataSource 객체 ds에서 getConnection 메서드로 접속을 하는 코드이다.

RoleDto.java
<br>
<br>

```
package kr.or.connect.daoexam.dto;

public class RoleDto {
	private int roleId;
	private String description;
	
	public int getRoleId() {
		return roleId;
	}
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	@Override
	public String toString() {
		return "Role [roleId=" + roleId + ", description=" + description + "]";
	}
	
}
```

RoleDaoSqls.java
<br>
<br>

```java
package kr.or.connect.daoexam.dao;

public class RoleDaoSqls {
	public static final String SELECT_ALL = "SELECT role_id, description FROM role order by role_id";
    
    public static final String UPDATE = "UPDATE role SET description = :description WHERE ROLE_ID = :roleId";

    public static final String SELECT_BY_ROLE_ID = "SELECT role_id, description FROM role where role_id = :roleId";

    public static final String DELETE_BY_ROLE_ID = "DELETE FROM role WHERE role_id = :roleId";
}


```
<br>
<br>

이제 여기에 우리의 목적에 맞게 데이터베이스 또는 데이터를 조작하는 메서드를 작성해주면 된다.

RoleDao.java
<br>
<br>

```java
package kr.or.connect.daoexam.dao;

import static kr.or.connect.daoexam.dao.RoleDaoSqls.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import kr.or.connect.daoexam.dto.Role;
@Repository
public class RoleDao {
	private NamedParameterJdbcTemplate jdbc;
	private SimpleJdbcInsert insertAction;
	private RowMapper<Role> rowMapper = BeanPropertyRowMapper.newInstance(Role.class);

	public RoleDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
		this.insertAction = new SimpleJdbcInsert(dataSource)
                .withTableName("role");
	}
	
	public int insert(Role role) {
		SqlParameterSource params = new BeanPropertySqlParameterSource(role);
		return insertAction.execute(params);
	}

	public int update(Role role) {
		SqlParameterSource params = new BeanPropertySqlParameterSource(role);
		return jdbc.update(UPDATE, params);
	}

    public int deleteById(Integer id) {
		Map<String, ?> params = Collections.singletonMap("roleId", id);
		return jdbc.update(DELETE_BY_ROLE_ID, params);
	}
	
	public Role selectById(Integer id) {
		try {
			Map<String, ?> params = Collections.singletonMap("roleId", id);
			return jdbc.queryForObject(SELECT_BY_ROLE_ID, params, rowMapper);		
		}catch(EmptyResultDataAccessException e) {
			return null;
		}
	}

}
```
<br>
<br>
Dao 클래스를 정의할 때는 @Repository 어노테이션을 붙인다. 데이터베이스 테이블을 조회하고 조작하기 위한 insert, update, delete, select 메서드가 구현되었다. 데이터베이스를 조작한 정보로 갱신할 때는 NamedparameterJdbcTemplate이 가지고 있는 update 메서드를 사용한다.select 메서드의 경우 1건 select하는 경우와 여러 건 select하는 경우가 다른데 여기선 1건만 select하는 경우로 구현하기 위해 NamedparameterJdbcTemplate이 가지고 있는 queryForObject 메서드를 사용한다.
또, 만족하는 값이 없다면 예외가 발생하므로 위와 같이 예외 처리를 해주면 되겠다. 
데이터베이스를 조작한 정보로 갱신할 때는 NamedparameterJdbcTemplate이 가지고 있는 update 메서드를 사용한다.

한번 시험해보자.

JDBCTest.java
<br>
<br>

```java
package kr.or.connect.daoexam.main;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import kr.or.connect.daoexam.config.ApplicationConfig;
import kr.or.connect.daoexam.dao.RoleDao;
import kr.or.connect.daoexam.dto.Role;

public class JDBCTest {

	public static void main(String[] args) {
		ApplicationContext ac = new AnnotationConfigApplicationContext(ApplicationConfig.class);

		RoleDao roleDao = ac.getBean(RoleDao.class);
		
		Role role = new Role();
		role.setRoleId(201);
		role.setDescription("PROGRAMMER");
		
		int count = roleDao.insert(role);
		System.out.println(count + "건 입력하였습니다.");
			
		int count = roleDao.update(role);
		System.out.println(count +  " 건 수정하였습니다.");

        Role resultRole = roleDao.selectById(201);
        System.out.println(resultRole);
                
        int deleteCount = roleDao.deleteById(500);
        System.out.println(deleteCount + "건 삭제하였습니다.");
            
        Role resultRole2 = roleDao.selectById(500);
        System.out.println(resultRole2);

	}

}
```
<br>
<br>

RoleDao에서 정의한 메서드들을 사용해 데이터베이스의 데이터들을 조회, 조작하는 것을 볼 수 있다.

<br>
<br>
### 출처 및 참고
<br>
<https://www.edwith.org/boostcourse-web/lecture/20661/>