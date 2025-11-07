import { User } from "Domain/Entities/User";
import { IGenericRepository } from "./IGenericRepository";
import { Injectable } from "@nestjs/common";

export interface IUserRepository extends IGenericRepository<User> {
  find(userId: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
}
