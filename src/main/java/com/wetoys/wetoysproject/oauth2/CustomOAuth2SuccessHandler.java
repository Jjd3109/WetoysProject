package com.wetoys.wetoysproject.oauth2;

import com.wetoys.wetoysproject.configuration.JwtTokenProvider;
import com.wetoys.wetoysproject.token.JwtToken;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    /*
     * 1. 성공시 토큰값 생성
     * 2. 토큰값을 넣어준뒤 sendRedirect로 보내주기.
     */

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws ServletException, IOException {

        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();

        String targetUrl;
        JwtToken tokenInfo = jwtTokenProvider.generateToken(oAuth2User.getName());

        targetUrl = UriComponentsBuilder.fromUriString("http://localhost:3001/kakaoLogin")
                .queryParam("accessToken", tokenInfo.getAccessToken())
                .queryParam("accessToken", tokenInfo.getRefreshToken())
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, targetUrl);

    }



}
