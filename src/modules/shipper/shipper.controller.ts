import { Body, Controller, Get, Post, Query, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ShipperService } from "../../services/shipper.service";
import { SettingsService } from "../../services/settings.service";
import { Like } from "typeorm";
import {
  DTO_Shipper_Remove,
  DTO_Shipper_EnabledStatus,
  DTO_Shipper_GetDetailInfoById,
  DTO_Shipper_Save,
  DTO_Shipper_UpdateSort,
  DTO_Shipper_ChangeAutoStatus,
  DTO_Shipper_StoreShipperSettings,
  DTO_Shipper_List,
} from "./dto/shipper.dto";

@Controller("shipper")
@UseGuards(AuthGuard("jwt"))
export class ShipperController {
  constructor(
    private shipperService: ShipperService,
    private settingsService: SettingsService,
  ) {}

  // 获取使用中的快递公司信息列表
  @Get("usingDeliveryCompanyList")
  async usingDeliveryCompanyList() {
    const infoArray = await this.shipperService.repository.find({
      where: {
        enabled: true,
      },
    });
    return infoArray;
  }

  // 获取目前设置的发货地址
  @Get("getSenderInfo")
  async getSenderInfo() {
    return await this.settingsService.getSenderInfo();
  }

  // 设置是否自动发货
  @Post("changeAutoStatus")
  async changeAutoStatus(@Body() body: DTO_Shipper_ChangeAutoStatus) {
    const { enable } = body;
    await this.settingsService.setAutoDelivery(enable);
  }

  // 保存设置的发货地址
  @Post("storeShipperSettings")
  async storeShipperSettings(@Body() body: DTO_Shipper_StoreShipperSettings) {
    await this.settingsService.updateSenderInfo(body);
  }

  // 删除候选快递公司信息
  @Post("remove")
  async remove(@Body() body: DTO_Shipper_Remove) {
    const { id } = body;
    return await this.shipperService.repository.delete(Number(id));
  }

  @Get("enabledStatus")
  async enabledStatus(@Query() query: DTO_Shipper_EnabledStatus) {
    const { id, enable } = query;
    await this.shipperService.repository.update(id, {
      enabled: enable,
    });
  }

  @Get("getDetailInfoById")
  async getDetailInfoById(@Query() query: DTO_Shipper_GetDetailInfoById) {
    const { id } = query;
    return await this.shipperService.repository.findOneById(id);
  }

  @Post("save")
  async save(@Body() body: DTO_Shipper_Save) {
    const { id, ...values } = body;

    if (id > 0) {
      await this.shipperService.repository.update(id, values);
      return { id, ...values };
    } else {
      return await this.shipperService.repository.save(values);
    }
  }

  @Get("list")
  async list(@Query() query: DTO_Shipper_List) {
    const { page = 1, size = 10, name = "" } = query;
    const queryBuilder = await this.shipperService.repository.createQueryBuilder();
    const data = await queryBuilder
      .where([{ name: Like(`%${name}%`) }, { code: Like(`%${name}%`) }])
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
  async updateSort(@Body() body: DTO_Shipper_UpdateSort) {
    const { id, sort } = body;
    return await this.shipperService.repository.update(id, { sort_order: sort });
  }
}
