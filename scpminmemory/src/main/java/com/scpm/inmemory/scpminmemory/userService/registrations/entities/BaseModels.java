package com.scpm.inmemory.scpminmemory.userService.registrations.entities;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.concurrent.atomic.AtomicLong;

@Getter
@Setter
public abstract class  BaseModels {
    private static final AtomicLong idGenerator = new AtomicLong(1);
    private long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public BaseModels() {
        this.id = idGenerator.getAndIncrement();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public void generateCurrentTime() {
        this.createdAt = LocalDateTime.now();
    }

    public void generateUpdatedTime() {
        this.updatedAt = LocalDateTime.now();
    }
}
