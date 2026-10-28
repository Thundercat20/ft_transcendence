import { Injectable } from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class SessionService {

  async start(request: Request, userId: string): Promise<void> {
    // Create a new session ID after authentication
    await new Promise<void>((resolve, reject) => {
      request.session.regenerate((error: unknown) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });

    request.session.userId = userId;

    await new Promise<void>((resolve, reject) => {
      request.session.save((error: unknown) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  async end(request: Request): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      request.session.destroy((error: unknown) => {
		
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
}
