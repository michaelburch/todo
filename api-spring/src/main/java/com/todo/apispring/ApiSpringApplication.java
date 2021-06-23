package com.todo.apispring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.Metrics;

@SpringBootApplication
public class ApiSpringApplication {
	
	public static Counter itemsRetrieved = Metrics.counter("todo.items.retrieved");

	public static void main(String[] args) {
		SpringApplication.run(ApiSpringApplication.class, args);
	}
	
}
