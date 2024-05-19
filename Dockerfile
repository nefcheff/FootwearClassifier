# docker build -t nefcheff/footwearclassification .

FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /usr/src/app

# Copy all files to the working directory
COPY . .

# Ensure mvnw is executable
RUN chmod +x ./mvnw

# Install the application
RUN ./mvnw -Dmaven.test.skip=true package

# List target directory to check for the JAR file
RUN ls -l /usr/src/app/target/

# Expose the port
EXPOSE 8082

# Run the application
CMD ["java", "-jar", "/usr/src/app/target/project2-0.0.1-SNAPSHOT.jar"]
