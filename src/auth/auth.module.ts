import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { DatabaseModule } from "src/database/database.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";

@Module({
    imports:[JwtModule.register({global:true})],
    controllers:[AuthController],
    providers:[AuthService]
})

export class AuthModule{}