package com.wetoys.wetoysproject.configuration;

import com.wetoys.wetoysproject.oauth2.CustomOAuth2UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomOAuth2UserService customOAuth2UserService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable);
        http.httpBasic(AbstractHttpConfigurer::disable);
        http.authorizeHttpRequests(
                authorize -> authorize
                        .requestMatchers("/api/v1/project/*").hasRole("USER")
                        .requestMatchers("/api/v1/project").permitAll()
                        .requestMatchers("/api/v1/join").permitAll()
                        .requestMatchers("/api/v1/viewProject").permitAll()
                        .requestMatchers("/api/v1/projectView/{category}").permitAll()
                        .requestMatchers("/api/v1/viewProject/*").permitAll()
                        .requestMatchers("/api/v1/project/like").hasRole("USER")
                        .requestMatchers("/api/v1/update/project").hasRole("USER")
                        .requestMatchers("/api/v1/saveProject").hasRole("USER")
                        .requestMatchers("/api/v1/project/likeCancel").hasRole("USER")
                        .requestMatchers("/api/v1/update/member").hasRole("USER")
                        .anyRequest().anonymous()
        );
        //oauth2로그인 방식
        http.oauth2Login(configure ->
                configure.userInfoEndpoint(userInfo ->
                        userInfo.userService(customOAuth2UserService))
        );
        //필터로 확인 하는것
        http.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
        return http.build();


    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCrypt Encoder 사용
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


}