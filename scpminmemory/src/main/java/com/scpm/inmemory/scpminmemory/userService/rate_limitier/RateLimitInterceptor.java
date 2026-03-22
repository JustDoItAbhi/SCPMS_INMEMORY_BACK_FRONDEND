package com.scpm.inmemory.scpminmemory.userService.rate_limitier;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;


@Component
public class RateLimitInterceptor implements HandlerInterceptor {
    @Autowired
    private RateLimitService rateLimitService;

    public final ObjectMapper objectMapper=new ObjectMapper();


    public RateLimitInterceptor(RateLimitService rateLimitService) {
        this.rateLimitService = rateLimitService;
    }

    @Override       //only intercept method with @rateLimit
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {

        if(handler instanceof HandlerMethod handlerMethod){
            RateLimit rateLimit=handlerMethod.getMethodAnnotation(RateLimit.class);

            if(rateLimit!=null){
                String clientId=getClientIdentifier(request,rateLimit.key());
            }


        }
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }

    private String getClientIdentifier(HttpServletRequest request,String keyType){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
     if( authentication !=null && authentication.isAuthenticated()&& !"anonymousUser".equals(authentication.getPrincipal()) ){
         return "user:"+authentication.getName();
     }
     String ip=request.getHeader("X-Forwared-For");
     if(ip==null ||ip.isEmpty() ){
         ip=request.getRemoteAddr();
     }
     if(keyType!=null && !keyType.isEmpty()){
         return keyType+":"+ip;
     }
     return "ip:"+ip;

    }
}
