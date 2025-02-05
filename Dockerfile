# Step 1: Use the latest Go version to build PocketBase for x86_64
FROM golang:1.23 AS builder

WORKDIR /app

# Clone the PocketBase repository
RUN git clone --depth 1 https://github.com/pocketbase/pocketbase.git .

# Ensure we're building for x86_64 architecture
RUN go mod tidy && GOARCH=amd64 go build -o pocketbase

# Step 2: Create a minimal runtime image
FROM alpine:latest

WORKDIR /app

# Copy the built binary from the builder stage
COPY --from=builder /app/pocketbase .

# Set executable permissions for the PocketBase binary
RUN chmod +x /app/pocketbase

# Expose the PocketBase API port
EXPOSE 8090

# Run PocketBase
CMD ["./pocketbase", "serve", "--http", "0.0.0.0:8090"]
