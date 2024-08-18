import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ShipperService } from "./shipper.service";
import { SettingsService } from "../settings/settings.service";

@Controller("shipper")
@UseGuards(AuthGuard("jwt"))
export class ShipperController {
  constructor(
    private shipperService: ShipperService,
    private settingsService: SettingsService,
  ) {}

  // 获取使用中的快递公司信息列表
  @Get("usingDeliveryCompanyList")
  async shipper() {
    const infoArray = await this.shipperService.find({
      enabled: true,
    });
    return infoArray;
  }

  // 获取目前设置的发货地址
  @Get("getShippingAddress")
  async getShippingAddress() {
    const settingsArray = await this.settingsService.find({
      id: 1,
    });
    return settingsArray[0];
  }

  // 设置是否自动发货
  @Post("changeAutoStatus")
  async changeAutoStatus(@Request() req) {
    const { status } = req.body;

    await this.settingsService.edit(1, { autoDelivery: status });
    return true;
  }

  // 保存设置的发货地址
  @Post("storeShipperSettings")
  async storeShipperSettings(@Request() req) {
    const { id, ...values } = req.body;
    await this.settingsService.edit(id, values);
    return true;
  }

  // 删除候选快递公司信息
  @Post("destory")
  async destory(@Request() req) {
    const { id } = req.body;
    return await this.shipperService.remove(Number(id));
  }

  @Get("enabledStatus")
  async enabledStatus(@Request() req) {
    const { id, status } = req.query;
    this.shipperService.edit(Number(id), { enabled: Boolean(status) });
    return true;
  }

  @Get("info")
  async info(@Request() req) {
    const { id } = req.query;

    const model = await this.shipperService.findOneById(id);

    return model;
  }

  @Post("store")
  async store(@Request() req) {
    const { id, ...values } = req.body;

    if (id > 0) {
      await this.shipperService.edit(id, values);
      return { id, ...values };
    } else {
      const v = await this.shipperService.add(values);
      return v;
    }
  }
  @Get("list")
  async list(@Request() req) {
    const { page = 1, size = 10, name = "" } = req.query;
    const queryBuilder = await this.shipperService.createQueryBuilder();
    const data = await queryBuilder
      .where("name LIKE :name OR code LIKE :name", { name: `%${name}%` })
      .orderBy("sort_order", "ASC")
      .skip((Number(page) - 1) * Number(size))
      .take(Number(size))
      .getManyAndCount();
    return {
      data: data[0],
      count: data[1],
      currentPage: page,
    };
  }
  @Post("updateSort")
  async updateSort(@Request() req) {
    const { id, sort } = req.body;
    return await this.shipperService.edit(id, { sort_order: sort });
  }
}
