# Resilient Email Sending Service

## Overview

This project implements a resilient email sending service in JavaScript. It includes features like retry logic, fallback between providers, idempotency, rate limiting, and status tracking.

## Features

1. **Retry Mechanism**: If an email fails to send, the service retries with exponential backoff.
2. **Fallback Between Providers**: If one provider fails, the service switches to another.
3. **Idempotency**: Prevents duplicate sends by tracking sent emails.
4. **Rate Limiting**: Ensures that the service doesn't exceed a specified rate of sending.
5. **Status Tracking**: Basic logging for email sending attempts and provider switching.

## Assumptions

1. You have Node.js and npm (Node Package Manager) installed on your system.
2. You're familiar with JavaScript.
3. You have basic knowledge of mocking and testing.

## Setup Instructions

1. **Clone this repository**:

   ```bash
   git clone <repository-url>
   cd resilient-email-service
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create mock email providers**:
   - Implement your own email providers (e.g., actual SMTP providers or other services).
   - For now, we'll use mock providers (`MockEmailProvider1` and `MockEmailProvider2`).

4. **Configure providers**:
   - Edit `src/index.js` to add your actual email providers or modify the mock providers.
   - Adjust the `rateLimit` as needed.

5. **Build the JavaScript code**:

   ```bash
   npm run build
   ```

6. **Run the service**:

   ```bash
   npm start
   ```

7. **Package**:
   - Make sure to install json package like uuid to run the program.

## Usage

1. Create an instance of `EmailService` with your providers:

   ```javascript
   const providers = [new MockEmailProvider1(), new MockEmailProvider2()];
   const emailService = new EmailService(providers);
   ```

2. Create an email object:

   ```javascript
   const email = new Email('example@example.com', 'Test Email', 'This is a test email.');
   ```

3. Send the email:

   ```javascript
   emailService.sendEmail(email);
   ```

## Bonus Features

Feel free to enhance the service with these bonus features:

1. **Circuit Breaker Pattern**: Track consecutive failures and temporarily disable a provider.
2. **Simple Logging**: Improve logging by using a proper logging library.
3. **Basic Queue System**: Implement a more robust queue system (e.g., using Redis or RabbitMQ).

## Unit Tests
Run the tests:
npx jest EmailService.test.js

