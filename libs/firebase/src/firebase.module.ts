import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Module({
  imports: [ConfigModule.forRoot({ cache: true })],
  providers: [FirebaseService, {
    provide: 'FIREBASE_APP',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {

      const json_cert = await import('@app/firebase/swap-tools-firebase-admin.json') as admin.ServiceAccount;

      return admin.initializeApp({ credential: admin.credential.cert(json_cert) })
    },
  }],
  exports: [FirebaseService],
})
export class FirebaseModule { }
