import { Module } from "@nestjs/common";
import { AddressService } from "./address.service";
import { AddressController } from "./address.controller";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Address } from "src/database/address.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [AddressService, JwtStrategy],
  controllers: [AddressController],
  exports: [AddressService],
})
export class AddressModule {}
