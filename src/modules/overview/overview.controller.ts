import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("Overview")
export class OverviewController {
  @UseGuards(AuthGuard("jwt"))
  @Get("main")
  main() {
    const info = {
      newUser: 1,
      oldUser: 1,
      addCart: 1,
      newData: [],
      oldData: [],
      addOrderNum: 2,
      addOrderSum: 2,
      payOrderNum: 2,
      payOrderSum: 2,
    };
    return info;
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("index")
  index() {
    const info = {
      user: "user",
      goodsOnsale: "goodsOnsale",
      timestamp: Date.now(),
      orderToDelivery: "orderToDelivery",
    };
    return info;
  }
}
