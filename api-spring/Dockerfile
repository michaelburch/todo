FROM mcr.microsoft.com/openjdk/jdk:11-ubuntu as build
COPY . /
RUN ./mvnw package 
FROM adoptopenjdk/openjdk11:debianslim-jre
ARG JAR_FILE=target/*.jar
COPY --from=build ${JAR_FILE} todo-api.jar
ENTRYPOINT ["java","-jar","/todo-api.jar"]