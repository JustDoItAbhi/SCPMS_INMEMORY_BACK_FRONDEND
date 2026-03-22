package com.scpm.inmemory.scpminmemory.userService.rate_limitier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class RateLimitMonitorController {

    @Autowired
    private CacheManager cacheManager;

    @GetMapping("/rate-limit-stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getRateLimitStats() {
        Map<String, Object> stats = new HashMap<>();

        Cache cache = cacheManager.getCache("rateLimit");
        if (cache != null && cache.getNativeCache() instanceof com.github.benmanes.caffeine.cache.Cache) {
            com.github.benmanes.caffeine.cache.Cache nativeCache =
                    (com.github.benmanes.caffeine.cache.Cache) cache.getNativeCache();

            stats.put("estimatedSize", nativeCache.estimatedSize());
            stats.put("hitCount", nativeCache.stats().hitCount());
            stats.put("missCount", nativeCache.stats().missCount());
        }

        return ResponseEntity.ok(stats);
    }
}
