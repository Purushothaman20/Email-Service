const { v4: uuidv4 } = require('uuid');

class Email {
  constructor(to, subject, body) {
    this.id = uuidv4();
    this.to = to;
    this.subject = subject;
    this.body = body;
  }
}

class MockEmailProvider1 {
  async send(email) {
    // Simulate sending email
    console.log(`MockEmailProvider1 sending email to ${email.to}`);
  }
}

class MockEmailProvider2 {
  async send(email) {
    // Simulate sending email
    console.log(`MockEmailProvider2 sending email to ${email.to}`);
  }
}

class EmailService {
  constructor(providers, rateLimit = 5) {
    this.providers = providers;
    this.currentProviderIndex = 0;
    this.sentEmails = new Set();
    this.rateLimit = rateLimit;
    this.queue = [];
    this.isProcessingQueue = false;
  }

  async sendWithRetry(email, retries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await this.providers[this.currentProviderIndex].send(email);
        return;
      } catch (error) {
        console.error(`Attempt ${attempt} failed: ${error}`);
        if (attempt < retries) {
          await new Promise(res => setTimeout(res, delay * Math.pow(2, attempt - 1)));
        } else {
          this.switchProvider();
        }
      }
    }
  }

  switchProvider() {
    this.currentProviderIndex = (this.currentProviderIndex + 1) % this.providers.length;
    console.log(`Switched to provider ${this.currentProviderIndex}`);
  }

  async processQueue() {
    if (this.isProcessingQueue) return;
    this.isProcessingQueue = true;

    while (this.queue.length > 0) {
      const email = this.queue.shift();
      if (email) {
        await this.sendEmail(email);
      }
    }

    this.isProcessingQueue = false;
  }

  async sendEmail(email) {
    if (this.sentEmails.has(email.id)) {
      console.log(`Email with id ${email.id} already sent`);
      return;
    }

    this.sentEmails.add(email.id);
    this.queue.push(email);

    if (this.queue.length <= this.rateLimit) {
      await this.processQueue();
    }
  }
}

// Usage
const providers = [new MockEmailProvider1(), new MockEmailProvider2()];
const emailService = new EmailService(providers);

const email = new Email('example@example.com', 'Test Email', 'This is a test email.');

emailService.sendEmail(email);
