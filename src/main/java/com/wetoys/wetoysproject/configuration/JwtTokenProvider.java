package com.wetoys.wetoysproject.configuration;

import com.wetoys.wetoysproject.entity.MemberEntity;
import com.wetoys.wetoysproject.repository.MemberRepository;
import com.wetoys.wetoysproject.repository.RefreshTokenRepository;
import com.wetoys.wetoysproject.token.JwtToken;
import com.wetoys.wetoysproject.token.RefreshToken;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.security.core.authority.SimpleGrantedAuthority;


import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtTokenProvider {
    private final Key key;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    //property에서 저장
    public JwtTokenProvider(@Value("${jwt.secretKey}") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // Member 정보를 가지고 AccessToken, RefreshToken을 생성하는 메서드
    public JwtToken generateToken(Authentication authentication) {
        // 권한 가져오기
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();

        log.info("authorities 값 = {}", authorities);

        // Access Token 생성
        Date accessTokenExpiresIn = new Date(now + 86400000);
        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim("auth", authorities)
                .setExpiration(accessTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        // Refresh Token 생성
//        String refreshToken = Jwts.builder()
//                .setExpiration(new Date(now + 86400000))
//                .signWith(key, SignatureAlgorithm.HS256)
//                .compact();

        // Refresh Token redis 생성
        String refreshToken = UUID.randomUUID().toString();

        // Refresh Token redis에 넣기
        RefreshToken redis = new RefreshToken(refreshToken, authentication.getName());

        refreshTokenRepository.save(redis);

        return JwtToken.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    // Jwt 토큰을 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
    public Authentication getAuthentication(String accessToken) {
        // Jwt 토큰 복호화
        Claims claims = parseClaims(accessToken);

        System.out.println(claims);
        if (claims.get("auth") == null) {
            System.out.println(claims);
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }



        // 클레임에서 권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities = Arrays.stream(claims.get("auth").toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        // UserDetails 객체를 만들어서 Authentication return
        // UserDetails: interface, User: UserDetails를 구현한 class
        UserDetails principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    // 토큰 정보를 검증하는 메서드
    public boolean validateToken(String token, String refreshToken) {

        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            return true;
        } catch (SecurityException | MalformedJwtException e) {

            log.info("Invalid JWT Token", e);
        } catch (ExpiredJwtException e) {
           //만료가 되었으니까 이 때 시작 검증 과정을 거친다

            JwtToken jwtToken = reGenertedToken(refreshToken);
            return false;


        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty.", e);
        }
        return false;
    }


    // accessToken
    private Claims parseClaims(String accessToken) {

        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(accessToken)
                    .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    // refreshToken 값이 있다면 AccessToken 재발행
    private JwtToken reGenertedToken(String refreshToken){

        long now = (new Date()).getTime();

        // Refresh Token 값 가져오기
        HashOperations<String, Object, Object> hashOperations = redisTemplate.opsForHash();
        Map<Object, Object> map = hashOperations.entries("refreshToken:"+refreshToken);


        //refreshToken 값이 존재 한다면 다시 accessToken 생성
        if(map.size() > 0){

            //이메일로 조회
            String email = (String) map.get("email");
            Optional<MemberEntity> memberEntity = memberRepository.findByEmail(email);


            // Access Token 생성
            Date accessTokenExpiresIn = new Date(now + 1000);
            String accessToken = Jwts.builder()
                    .setSubject(email)
                    .claim("auth", memberEntity.get().getRoles()) //권한 넣어주기.
                    .setExpiration(accessTokenExpiresIn)
                    .signWith(key, SignatureAlgorithm.HS256)
                    .compact();


            return JwtToken.builder()
                    .grantType("Bearer")
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();
        }

        return null;

    }

}