import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class LocalStorageService {

  constructor(private storage: Storage) {
  }

  public set(key: string, value: any): Promise<any> {
    return this.storage.set(key, value);
  }

  public get(key: string): Promise<any> {
    return this.storage.get(key);
  }

  public delete(key: string): Promise<any> {
    return this.storage.remove(key);
  }

  public clear() : Promise<void> {
    return this.storage.clear();
  }
}