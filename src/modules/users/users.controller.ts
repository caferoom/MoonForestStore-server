import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "./users.service";
import * as dayjs from "dayjs";
import { cloneDeep } from "lodash";
import { BUSINESS_ERROR_CODE } from "src/common/exceptions/business.error.codes";
import { BusinessException } from "src/common/exceptions/business.exception";
import { CartService } from "./cart.service";
import { OrderService } from "./order.service";
import { LessThan } from "typeorm";
import { OrderGoodsService } from "./order_goods.service";

@Controller("user")
@UseGuards(AuthGuard("jwt"))
export class UsersController {
  constructor(
    private usersService: UsersService,
    private cartService: CartService,
    private orderService: OrderService,
    private orderGoodsService: OrderGoodsService,
  ) {}

  @Get("")
  async indexAction(@Request() req) {
    const { page = 1, size = 10, nickname = "" } = req.query;
    const buffer = Buffer.from(nickname);
    const nick = buffer.toString("base64");

    const queryBuilder = await this.usersService.createQueryBuilder("user");

    const [data, total] = await queryBuilder
      .where("user.nickname LIKE :nickname", { nickname: `%${nick}%` })
      .orderBy("user.id", "DESC")
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();

    for (const item of data) {
      (item as any).register_time = dayjs(item.register_time * 1000).format("YYYY-MM-DD HH:mm:ss");
      (item as any).last_login_time = dayjs(item.last_login_time * 1000).format(
        "YYYY-MM-DD HH:mm:ss",
      );
      item.nickname = Buffer.from(item.nickname, "base64").toString();
    }
    const info = {
      userData: {
        data: data,
        currentPage: page,
        total,
      },
    };
    return info;
  }

  @Get("info")
  async infoAction(@Request() req) {
    const { id } = req.query;
    const info = await this.usersService.findOneById(id);
    if (info) {
      const cloned = cloneDeep(info);
      (cloned as any).register_time = dayjs(cloned.register_time * 1000).format(
        "YYYY-MM-DD HH:mm:ss",
      );
      (cloned as any).last_login_time = dayjs(cloned.last_login_time * 1000).format(
        "YYYY-MM-DD HH:mm:ss",
      );
      (cloned as any).nickname = Buffer.from(cloned.nickname, "base64").toString();
      return cloned;
    }

    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.COMMON,
      message: "未找到该Id对应用户数据",
    });
  }

  @Get("datainfo")
  async datainfoAction(@Request() req) {
    const { id } = req.query;
    const info = {};

    const queryBuilder = await this.orderService.createQueryBuilder("order");
    const orderSum = await queryBuilder
      .where("order.user_id = :userId", { userId: id })
      .andWhere("order.order_type < :orderType", { orderType: 8 })
      .andWhere("order.is_delete = :isDelete", { isDelete: false })
      .getCount();
    (info as any).orderSum = orderSum;

    const orderDone = await queryBuilder
      .where("order.user_id = :userId", { userId: id })
      .andWhere("order.order_status IN (:...orderStatuses)", {
        orderStatuses: ["302", "303", "401"],
      })
      .andWhere("order.order_type < :orderType", { orderType: 8 })
      .andWhere("order.is_delete = :isDelete", { isDelete: false })
      .getCount();
    (info as any).orderDone = orderDone;

    const orderMoney = await queryBuilder
      .where("order.user_id = :userId", { userId: id })
      .andWhere("order.order_status IN (:...orderStatuses)", {
        orderStatuses: ["302", "303", "401"],
      })
      .andWhere("order.order_type < :orderType", { orderType: 8 })
      .andWhere("order.is_delete = :isDelete", { isDelete: false })
      .select("SUM(order.actual_price)", "totalAmount")
      .getRawOne();
    (info as any).orderMoney = orderMoney.totalAmount;

    const cartQueryBuilder = await this.cartService.createQueryBuilder("cart");
    const cartSum = await cartQueryBuilder
      .where("cart.user_id = :userId", { userId: id })
      .andWhere("cart.is_delete = :isDelete", { isDelete: false })
      .select("SUM(cart.number)", "totalAmount")
      .getRawOne();

    (info as any).cartSum = cartSum.totalAmount;
    return info;
  }

  @Get("order")
  async orderAction(@Request() req) {
    const { page = 1, size = 10, id: user_id } = req.query;

    const [_data, count] = await this.orderService.findAndCount({
      where: {
        user_id,
        order_type: LessThan(8),
      },
      order: {
        id: "DESC",
      },
      skip: (page - 1) * size,
      take: size,
    });

    const data = cloneDeep(_data);

    for (const item of data) {
      (item as any).goodsList = this.orderGoodsService.find({
        where: {
          orderId: item.id,
          is_delete: 0,
        },
        select: [
          "goods_name",
          "list_pic_url",
          "number",
          "goods_specifition_name_value",
          "retail_price",
        ],
      });

      await this.model("order_goods")
        .field("goods_name,list_pic_url,number,goods_specifition_name_value,retail_price")
        .where({
          order_id: item.id,
          is_delete: 0,
        })
        .select();
      item.goodsCount = 0;
      item.goodsList.forEach((v) => {
        item.goodsCount += v.number;
      });
      const province_name = await this.model("region")
        .where({
          id: item.province,
        })
        .getField("name", true);
      const city_name = await this.model("region")
        .where({
          id: item.city,
        })
        .getField("name", true);
      const district_name = await this.model("region")
        .where({
          id: item.district,
        })
        .getField("name", true);
      item.full_region = province_name + city_name + district_name;
      item.postscript = Buffer.from(item.postscript, "base64").toString();
      item.add_time = moment.unix(item.add_time).format("YYYY-MM-DD HH:mm:ss");
      item.order_status_text = await this.model("order").getOrderStatusText(item.id);
      item.button_text = await this.model("order").getOrderBtnText(item.id);
    }
    return this.success(data);
  }
}
