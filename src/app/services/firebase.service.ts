import { Injectable, OnInit } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, QueryFn, Query, QueryGroupFn} from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Login } from '../models/Login';
import { Platform } from '@ionic/angular';
import { map, tap } from 'rxjs/operators';
import { Cat } from '../models/Cat';
import { SitterCompany } from '../models/SitterCompany';
import { Observable } from 'rxjs';
import { Schedule } from '../models/Schedule';
import { Addr } from "../models/Addr";
import { Config } from "../models/Config";
import { ConfigService } from "./config.service";

@Injectable()
export class FirebaseService {
    private collectionPtr: AngularFirestoreCollection;

    constructor(private db: AngularFirestore, 
        private auth: AngularFireAuth,
        private platform: Platform,
        private config: ConfigService) 
    {
        this.platform.ready();
    }

    async updateCompany(sitterCompany: SitterCompany) {
    }

    async addUser(user: Login) {
    }

    async getLoggedUser() : Promise<Login> {
        return new Promise((resolve, reject) => { resolve(null)})
    }

    async login(email, password) : Promise<Login> {
        return new Promise((resolve, reject) => { resolve(null)})
    }

    async logout() {
        let userLogout = await this.auth.auth.signOut();
    }

    async changeLoginPassword(password) {
        let update = await this.auth.auth.currentUser.updatePassword(password);
    }

    getUser(id: string) {
    }

    async getConfig() : Promise<Config> {
        return new Promise((resolve, reject) => { resolve(null)})
    }

    async getCompanies(targetAddr?: Addr) : Promise<Array<SitterCompany>> {
        return new Promise((resolve, reject) => { resolve(null)})
    }

    async getCompany(id: string) : Promise<SitterCompany> {
        return new Promise((resolve, reject) => { resolve(null)})
    }
    
    async getCompanyUsers(login?: Login, withMe?: Boolean) : Promise<Array<Login>>  {
        return new Promise((resolve, reject) => { resolve(null)})
    }

    async updateUser(user: Login) {
        return new Promise((resolve, reject) => { resolve(null)})
    }

    async addCat(user: Login, cat: Cat): Promise<Cat> {
        return new Promise((resolve, reject) => { resolve(null)})
    }

    async updateCat(user: Login, cat: Cat): Promise<Cat> {
        return new Promise((resolve, reject) => { resolve(null)})
    }
    
    async addSchedule(client: Login, schedule: Schedule, initialSchedule: boolean) : Promise<Schedule> {
        return new Promise((resolve, reject) => { resolve(null)})
    }

    fetchSchedules = async (login: Login, status: number): Promise<Array<Schedule>> => {
        return new Promise((resolve, reject) => { resolve(null)})
    }
}