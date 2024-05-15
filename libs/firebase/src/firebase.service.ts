import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class FirebaseService {

  constructor(
    @Inject('FIREBASE_APP') private app: app.App
  ) { }


  async getAuth() {
    return this.app.auth();
  }

  async verifyIdToken(idToken: string) {
    return this.app.auth().verifyIdToken(idToken);
  }



}
