import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "Application/Services/AuthService";
import { JwtStrategy } from "jwt.strategy";
import { InfrastructureProviders } from "Infrastructure/providers";
import { DatabaseModule } from "Infrastructure/Database/database.module";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || "super_secreto",
      signOptions: { expiresIn: "1h" },
    }),
    DatabaseModule,
  ],
  providers: [AuthService, JwtStrategy, ...InfrastructureProviders],
  exports: [AuthService],
})
export class AuthModule {}
