import { IUserRepository } from "../../Domain/Interfaces/IUserRepository";
import { User } from "Domain/Entities/User";
import { DataSource } from "typeorm";
import { GenericRepository } from "./GenericRepository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository
  extends GenericRepository<User>
  implements IUserRepository
{
  constructor(dataSource: DataSource) {
    super(User, dataSource, "id");
  }
  async getByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }
  async find(userid: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id: userid } });
    return user;
  }
}
