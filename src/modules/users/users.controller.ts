import { Controller, Get, UseGuards, Request, Post, Query, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../../services/users.service";
import * as dayjs from "dayjs";
import { cloneDeep } from "lodash";
import { BUSINESS_ERROR_CODE } from "src/common/exceptions/business.error.codes";
import { BusinessException } from "src/common/exceptions/business.exception";
import { CartService } from "../../services/cart.service";
import { ILike, LessThan } from "typeorm";
import { OrderGoodsService } from "../../services/order_goods.service";
import { RegionService } from "../../services/region.service";
import { OrderService } from "../../services/order.service";
import { AddressService } from "../../services/address.service";
import * as Express from "express";
import { FootprintService } from "../../services/footprint.service";
import {
  DTO_User_Address_List,
  DTO_User_List,
  DTO_User_Save_Address,
  IUser_Address_List,
  OUT_User_Address_List,
} from "./dto/user.dto";

@Controller("user")
@UseGuards(AuthGuard("jwt"))
export class UsersController {
  constructor(
    private userService: UserService,
    private cartService: CartService,
    private orderService: OrderService,
    private orderGoodsService: OrderGoodsService,
    private regionService: RegionService,
    private addressService: AddressService,
    private footPrintService: FootprintService,
  ) {}

  @Post("list")
  async list(@Body() body: DTO_User_List) {
    const { page, size, sortField, sortType, filters } = body;
    const { total, data } = await this.userService.getUserList({
      page,
      pageSize: size,
      sortField,
      filters,
      sortType,
    });

    return {
      total,
      data,
      currentPage: page,
    };
  }

  @Post("accountEnable")
  async accountEnable(@Body() body) {
    const { id, enable } = body;

    return await this.userService.accountEnable(id, enable);
  }

  @Post("addressList")
  async getAddressList(@Body() body: DTO_User_Address_List) {
    const { page, size, id } = body;

    const { total, data: originData } = await this.addressService.getAddressList({
      id,
      page,
      pageSize: size,
    });

    const d = originData.map(async (origin) => {
      const data = new IUser_Address_List();
      data.id = origin.id;
      data.fullAddress = await this.regionService.getCombinedAddress(
        origin.district_id,
        origin.address,
      );
      data.mobile = origin.mobile;
      data.is_default = !!origin.is_default;
      data.name = origin.name;
      data.province_id = origin.province_id;
      data.city_id = origin.city_id;
      data.district_id = origin.district_id;
      data.address = origin.address;
      return data;
    });

    const obj = new OUT_User_Address_List();
    obj.currentPage = page;
    obj.total = total;
    obj.data = await Promise.all(d);
    return obj;
  }

  @Post("deleteAddress")
  async deleteAddress(@Body() body: { id: string }) {
    const { id } = body;

    return await this.addressService.repository.delete(id);
  }

  @Post("setDefaultAddress")
  async setDefaultAddress(@Body() body: { userId: number; recordId: number }) {
    const { userId, recordId } = body;

    return await this.addressService.setDefaultAddress({ userId, recordId });
  }

  @Post("saveAddress")
  async saveAddressAction(@Body() body: DTO_User_Save_Address) {
    const { user_id, id, name, mobile, address, selectedRegionOptions } = body;

    if (id) {
      return await this.addressService.repository.update(
        {
          id: id,
        },
        {
          name: name,
          mobile: mobile,
          address: address,
          province_id: selectedRegionOptions[0],
          district_id: selectedRegionOptions[2],
          city_id: selectedRegionOptions[1],
        },
      );
    } else {
      return await this.addressService.repository.save({
        user_id: user_id,
        name: name,
        mobile: mobile,
        address: address,
        province_id: selectedRegionOptions[0],
        district_id: selectedRegionOptions[2],
        city_id: selectedRegionOptions[1],
      });
    }
  }

  @Get("")
  async indexAction(@Request() req) {
    const { page = 1, size = 10, nickname = "" } = req.query;
    const buffer = Buffer.from(nickname);
    const nick = buffer.toString("base64");
    const queryBuilder = await this.userService.repository.createQueryBuilder("user");

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
    const info = await this.userService.repository.findOneById(id);
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
      (item as any).goodsList = await this.orderGoodsService.find({
        where: {
          order_id: item.id,
          is_delete: false,
        },
        select: [
          "goods_name",
          "list_pic_url",
          "number",
          "goods_specifition_name_value",
          "retail_price",
        ],
      });
      (item as any).goodsCount = 0;
      (item as any).goodsList.forEach((v) => {
        (item as any).goodsCount += v.number;
      });

      (item as any).full_region = await this.regionService.getCombinedAddress(
        Number(item.district),
      );
      item.postscript = Buffer.from(item.postscript, "base64").toString();
      (item as any).add_time = dayjs(item.add_time).format("YYYY-MM-DD HH:mm:ss");
      (item as any).order_status_text = await this.orderService.getOrderStatusText(item.id);
      (item as any).button_text = await this.orderService.getOrderBtnText(item.id);
    }
    return {
      data,
      currentPage: Number(page),
      count: count,
    };
  }

  @Get("address")
  async addressAction(@Request() req) {
    const { id, page = 1, size = 10 } = req.query;

    const [_data, total] = await this.addressService.repository.findAndCount({
      where: { user_id: id },
      skip: (page - 1) * size,
      take: size,
    });
    const data = cloneDeep(_data);
    for (const item of data) {
      (item as any).full_region = await this.regionService.getCombinedAddress(
        item.district_id,
        item.address,
      );
    }
    return {
      data: data,
      count: total,
      currentPage: page,
    };
  }


  @Get("cartdata")
  async cartdataAction(@Request() req) {
    const { id, page = 1, size = 10 } = req.body;

    const [_data, total] = await this.cartService.findAndCount({
      where: { user_id: id },
      order: { add_time: "DESC" },
      skip: (page - 1) * size,
      take: size, // 每页数量
    });

    const data = cloneDeep(_data);

    for (const item of data) {
      (item as any).add_time = dayjs(item.add_time).format("YYYY-MM-DD HH:mm:ss");
    }

    return {
      data,
      count: total,
      currentPage: page,
    };
  }

  @Get("foot")
  async footAction(@Request() req: Express.Request) {
    const { id, page = 1, size = 10 } = req.query;

    const _page = Number(page);
    const _size = Number(size);

    const queryBuilder = await this.footPrintService.createQueryBuilder("f");
    const [data, total] = await queryBuilder
      .leftJoinAndSelect("f.goods_id", "g")
      .where("f.user_id = :userId", { userId: id })
      .skip((_page - 1) * _size)
      .take(_size)
      .getManyAndCount();

    return {
      data,
      count: total,
      currentPage: _page,
    };
  }

  @Post("updateInfo")
  async updateInfoAction(@Request() req: Express.Request) {
    const { id, nickname } = req.body;

    const buffer = Buffer.from(nickname);
    const _nickname = buffer.toString("base64");
    const model = await this.userService.repository.update(
      {
        id: id,
      },
      {
        nickname: _nickname,
      },
    );
    return model;
  }

  @Post("destory")
  async destoryAction(@Request() req: Express.Request) {
    const { id } = req.body;
    await this.userService.repository.remove(id);
    return true;
  }

  @Post("updateMobile")
  async updateMobileAction(@Request() req: Express.Request) {
    const { id, mobile } = req.body;

    await this.userService.repository.update(
      {
        id: id,
      },
      {
        mobile: mobile,
      },
    );
    const data = await this.userService.repository.findOneById(id);

    return data;
  }

  // @Post("updateName")
  // async updateNameAction(@Request() req: Express.Request) {
  //   const { id, name } = req.body;

  //   await this.userService.repository.update({ id: id }, { name: name });

  //   const data = await this.userService.repository.findOneById(id);

  //   return data;
  // }

  @Get("shopcart")
  async indesxAction(@Request() req: Express.Request) {
    const { page = 1, size = 10, name = "" } = req.query;

    const [_data, total] = await this.cartService.findAndCount({
      where: {
        goods_name: ILike(`%${name}%`),
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
      const userInfo = await this.userService.repository.findOneById(item.user_id);

      if (userInfo) {
        (item as any).nickname = Buffer.from(userInfo.nickname, "base64").toString();
      } else {
        (item as any).nickname = "已删除";
      }
    }

    return {
      data,
      count: total,
      currentPage: page,
    };
  }
}
