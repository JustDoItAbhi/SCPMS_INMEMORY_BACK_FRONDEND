package com.scpm.inmemory.scpminmemory.userService.rate_limitier;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimitService {

    private final Map<String, Bucket>bucketMap=new ConcurrentHashMap<>();
    @Cacheable(value = "rateLimit",key = "#key")
    public Bucket resolveBucket(String key,int limit, int durationSeconds){
        Bandwidth bandwidth=Bandwidth.classic(limit, Refill.greedy(limit, Duration.ofSeconds(durationSeconds)));


    return Bucket.builder()
            .addLimit(bandwidth)
            .build();
    }
    public boolean tryConsume(String key,int limit, int durationSeconds){
        Bucket bucket=resolveBucket(key,limit,durationSeconds);
        return bucket.tryConsume(1);
    }
    public long getRemainingToken(String key, int limit, int durationSeconds){
        Bucket bucket=resolveBucket(key,limit,durationSeconds);
        return bucket.getAvailableTokens();
    }
}
