import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as Express from "express";
import { CartService } from "../../services/cart.service";
import { Like } from "typeorm";
import { cloneDeep } from "lodash";
import * as dayjs from "dayjs";

@Controller("cart")
@UseGuards(AuthGuard("jwt"))
export class CartController {
  constructor(private cartService: CartService) {}

  @Get("keywords")
  async indexAction(@Request() req: Express.Request) {
    const { page = 1, size = 10, name = "" } = req.query;

    const [_data, count] = await this.cartService.findAndCount({
      where: {
        goods_name: Like(`%${name}%`),
      },
      order: {
        id: "DESC",
      },
      skip: (Number(page) - 1) * Number(size),
      take: Number(size),
    });

    const data = cloneDeep(_data);

    for (const item of data) {
      (item as any).add_time = dayjs(item.add_time).format("YYYY-MM-DD HH:mm:ss");
    }

    return {
      count,
      data,
      currentPage: page,
    };
  }
}
