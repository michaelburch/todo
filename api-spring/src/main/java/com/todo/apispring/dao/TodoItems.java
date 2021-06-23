package com.todo.apispring.dao;

import com.todo.apispring.model.TodoItem;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TodoItems extends MongoRepository<TodoItem, String> {
    List<TodoItem> findByTenantId(String tenantId);
    Optional<TodoItem> findByTenantIdAndItemId(String tenantId, String itemId);
}