import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { Attempt } from "../account.interface";

const maxBlockedCount = 2;
const maxAttemptsCount = 3;
const awaitingDelay = 5 * 1000;

@Injectable()
export class RegistrationService {
  public resetCache() {
    this.numberOfAttempts = {};
    this.registrationTokens = {};
  }

  public registerNewUser(phone: string) {
    this.processAttempts(phone);

    const token = this.createRegistrationToken(phone);

    return { token };
  }

  private registrationTokens: Object = {};
  private numberOfAttempts: Record<string, Attempt> = {};

  private createRegistrationToken(phone: string) {
    const timeStamp = Math.round(new Date().getTime() / 1000);
    const randomNumber = Math.round(Math.random() * 1000);
    const token = `jwt:${timeStamp}-${randomNumber}`;

    return (this.registrationTokens[phone] = token);
  }

  private processAttempts(phone: string) {
    const isPhoneSaved = phone in this.numberOfAttempts;

    if (!isPhoneSaved) {
      this.numberOfAttempts[phone] = {
        attemptCount: 1,
        blockedCount: 0,
      };

      return;
    }

    const userAttempt = this.numberOfAttempts[phone];
    const isBlockedCountReached = userAttempt.blockedCount >= maxBlockedCount;

    if (isBlockedCountReached) {
      throw new HttpException({ message: "You are blocked" }, HttpStatus.FORBIDDEN);
    }

    if (isDelayNotEnding(userAttempt)) {
      throw new HttpException(
        { message: "Maximum number attempts exceeded. Please try again later." },
        HttpStatus.FORBIDDEN,
      );
    }

    userAttempt.attemptCount++;

    if (userAttempt.attemptCount >= maxAttemptsCount) {
      this.numberOfAttempts[phone] = {
        attemptCount: 0,
        attemptDelay: createDelay(),
        blockedCount: userAttempt.blockedCount + 1,
      };
    }
  }
}

function createDelay() {
  return +new Date() + awaitingDelay;
}

function isDelayNotEnding({ attemptDelay }: Attempt) {
  if (!attemptDelay) return false;

  const currentTime = +new Date();

  return currentTime <= attemptDelay;
}
