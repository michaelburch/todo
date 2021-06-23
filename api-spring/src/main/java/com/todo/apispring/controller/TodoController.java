package com.todo.apispring.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.todo.apispring.ApiSpringApplication;
import com.todo.apispring.dao.TodoItems;
import com.todo.apispring.model.TodoItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@CrossOrigin(origins = "${client.url}")
@RestController
public class TodoController {

    private static Logger logger = LoggerFactory.getLogger(TodoController.class);
   
    @Autowired
    private TodoItems todoItemRepository;

    public TodoController() {
    }

    @RequestMapping("/healthz")
    public ResponseEntity<?> home() {
        logger.info("Request '/healthz' path.");
        return new ResponseEntity<>("ok",HttpStatus.OK);
    }
    
    /**
     * Get Todo Items
     */
    @RequestMapping(value = "/api/{tenantId}/todos", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getAllTodoItems(@PathVariable("tenantId") String tenantId) {
        logger.info("Listing todo items");
        try {
            List<TodoItem> todoItems = new ArrayList<>();
            Iterable<TodoItem> iterable = todoItemRepository.findByTenantId(tenantId);
            if (iterable != null) {
                iterable.forEach(todoItems::add);
            }
            ApiSpringApplication.itemsRetrieved.increment(todoItems.size());
            return new ResponseEntity<>(todoItems, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Nothing found", HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Create Todo Item
     */
    @PostMapping(value = "/api/{tenantId}/todos", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addNewTodoItem(@RequestBody TodoItem item, @PathVariable("tenantId") String tenantId) {
        logger.info("Creating new todo item");
        try {
            item.setTenantId(tenantId);
            item.setId(UUID.randomUUID().toString());
            todoItemRepository.save(item);
            return new ResponseEntity<>("Created item", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Entity creation failed", HttpStatus.CONFLICT);
        }
    }

    /**
     * Update Todo Item
     */
    @PutMapping(value = "/api/{tenantId}/todos/{itemId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateTodoItem(@RequestBody TodoItem item, @PathVariable("tenantId") String tenantId, @PathVariable("itemId") String itemId) {
        logger.info("Updating todo item with id {}", itemId);
        try {
            Optional<TodoItem> todoItem = todoItemRepository.findById(itemId);
            if (todoItem.isPresent()) {
                item.setId(itemId);
                item.setTenantId(tenantId);
                todoItemRepository.save(item);
                return new ResponseEntity<>("Updated Todo Item", HttpStatus.OK);
            }
            return new ResponseEntity<>("Error processing Todo item", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Error processing Todo item: ", e);
            return new ResponseEntity<>("Error processing Todo item", HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Delete Todo Item
     */
    @DeleteMapping(value = "/api/{tenantId}/todos/{itemId}")
    public ResponseEntity<String> deleteTodoItem(@PathVariable("tenantId") String tenantId, @PathVariable("itemId") String itemId) {
        logger.info("Deleting Todo Item: {}", itemId);
        try {
            Optional<TodoItem> todoItem = todoItemRepository.findByTenantIdAndItemId(tenantId, itemId);
            if (todoItem.isPresent()) {
                todoItemRepository.deleteById(itemId);
                return new ResponseEntity<>("Entity deleted", HttpStatus.OK);
            }
            return new ResponseEntity<>("Not found the entity", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Delete errors: ", e);
            return new ResponseEntity<>("Entity deletion failed", HttpStatus.NOT_FOUND);
        }

    }
}