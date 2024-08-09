import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { StoreService } from "./store.service";

@Controller("store")
@UseGuards(AuthGuard("jwt"))
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get("showset")
  async showset() {
    const models = await this.storeService.find({});
    return models[0];
  }

  @Post("showsetStore")
  async showsetStore(@Request() req) {
    const id = 1;
    const values = req.body;
    this.storeService.edit(id, values);

    return values;
  }
}
