package com.scpm.inmemory.scpminmemory.userService.rate_limitier;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RateLimit {
    String key() default "";
    int limit() default 100;
    int duration()default 60;
    String fallbackMethod() default "";
}
