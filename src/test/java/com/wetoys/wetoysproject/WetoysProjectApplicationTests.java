package com.wetoys.wetoysproject;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.wetoys.wetoysproject.entity.MemberEntity;
import com.wetoys.wetoysproject.entity.QMemberEntity;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class WetoysProjectApplicationTests {

	@Test
	void contextLoads() {
	}

	@Autowired
	EntityManager em;

	JPAQueryFactory queryFactory;

	// 테스트 실행 전에 JPAQueryFactory 초기화
	@BeforeEach
	public void setUp() {
		queryFactory = new JPAQueryFactory(em);
	}

	//쿼리dsl test
	@Test
	void querydslTest() {
		//given

		//when

		//then
		QMemberEntity member = QMemberEntity.memberEntity;
		MemberEntity result = queryFactory.selectFrom(member)
				.where(member.email.eq("123"))
				.fetchOne();

		// 결과 처리
		// ...
		System.out.println(result.getPosition());

	}

}
