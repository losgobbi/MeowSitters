import { Injectable } from '@angular/core';
import { AES256 } from '@ionic-native/aes-256/ngx';
import { Config } from '../models/Config';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class ConfigService {
  private config : Config;

  constructor(private aes256: AES256) {
  }

  init(config: Config) {
    this.config = config;
  }

  cypher(data: string) : Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(CryptoJS.AES.encrypt(data, CryptoJS.enc.Base64.parse(this.config.sec01), 
        { iv: CryptoJS.enc.Base64.parse(this.config.sec02) }).toString())
    })
  }

  getConsent(): string {
    return this.config.consent;
  }

  getPrivacy(): string {
    return this.config.privacyPolicy;
  }

  getDisablePlatform() {
    return this.config.disablePlatform;
  }

  async decypher(data: string) : Promise<string> {
    var plain = CryptoJS.AES.decrypt(data, CryptoJS.enc.Base64.parse(this.config.sec01), 
      { iv: CryptoJS.enc.Base64.parse(this.config.sec02) });

    return new Promise((resolve, reject) => {
      resolve(plain.toString(CryptoJS.enc.Utf8));
    })
  }
}