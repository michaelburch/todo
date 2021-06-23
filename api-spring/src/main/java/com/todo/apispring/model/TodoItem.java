package com.todo.apispring.model;
import org.springframework.data.annotation.Id;

import java.util.Objects;


public class TodoItem {
    @Id
    private String itemId;
    private String tenantId;
    private String name;
    private boolean isComplete;

    public TodoItem() {
        
    }

    public TodoItem(String id, String name, String tenantId) {
        this.name = name;
        this.itemId = id;
        this.tenantId = tenantId;
        this.isComplete = false;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    public String getId() {
        return itemId;
    }

    public void setId(String id) {
        this.itemId = id;
    }

    public void setComplete(boolean isComplete) {
        this.isComplete = isComplete;
    }

    public boolean getComplete() {
        return isComplete;
    }
    @Override
    public boolean equals(Object o) {
        if (o == this) {
            return true;
        }
        if (!(o instanceof TodoItem)) {
            return false;
        }
        final TodoItem group = (TodoItem) o;
        return Objects.equals(this.getName(), group.getName())
                && Objects.equals(this.getTenantId(), group.getTenantId())
                && Objects.equals(this.getId(), group.getId())
                && Objects.equals(this.getComplete(), group.getComplete());
    }

     
}