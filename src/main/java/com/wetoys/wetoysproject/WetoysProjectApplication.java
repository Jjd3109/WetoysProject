package com.wetoys.wetoysproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class WetoysProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(WetoysProjectApplication.class, args);
	}

}
