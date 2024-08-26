import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AdService } from "./ad.service";
import * as dayjs from "dayjs";
import { BusinessException } from "src/common/exceptions/business.exception";
import { BUSINESS_ERROR_CODE } from "src/common/exceptions/business.error.codes";
import { GoodsService } from "./goods.service";

@Controller("ad")
@UseGuards(AuthGuard("jwt"))
export class AdController {
  constructor(
    private adService: AdService,
    private goodsService: GoodsService,
  ) {}

  @Get("")
  async indexAction(@Request() req) {
    const { page = 1, size = 10 } = req.query;

    const [ads, total] = await this.adService.findAndCount({
      where: { is_delete: false },
      order: { id: "ASC" },
      skip: (page - 1) * size,
      take: size, // 每页数量
    });

    for (const item of ads) {
      if (item.end_time != 0) {
        (item as any).end_time = dayjs(item.end_time * 1000).format("YYYY-MM-DD HH:mm:ss");
      }
      if (item.enabled == 1) {
        (item as any).enabled = true;
      } else {
        (item as any).enabled = false;
      }
    }
    return {
      data: ads,
      currentPage: page,
      count: total,
    };
  }

  @Post("updateSort")
  async updateSortAction(@Request() req) {
    const { id, sort } = req.body;
    const model = await this.adService.update(
      { id: id },
      {
        sort_order: sort,
      },
    );
    return model;
  }

  @Get("info")
  async infoAction(@Request() req) {
    const { id } = req.query;
    const data = await this.adService.findOneById(id);
    return data;
  }

  @Post("store")
  async storeAction(@Request() req) {
    const values = req.body;
    values.end_time = parseInt(String(new Date(values.end_time).getTime() / 1000));
    const { id } = req.body;

    if (id > 0) {
      const ex = await this.adService.find({
        where: {
          goods_id: values.goods_id,
          is_delete: false,
        },
      });
      if (!(ex && ex.length !== 0)) {
        await this.adService.update({ id: id }, values);
      } else {
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.COMMON,
          message: "该商品已经有广告关联",
        });
      }
    } else {
      const ex = await this.adService.find({
        where: {
          goods_id: values.goods_id,
          is_delete: false,
        },
      });
      if (!(ex && ex.length !== 0)) {
        delete values.id;
        if (values.link_type == 0) {
          values.link = "";
        } else {
          values.goods_id = 0;
        }
        await this.adService.add(values);
      } else {
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.COMMON,
          message: "该商品已经有广告关联",
        });
      }
    }
    return values;
  }

  @Post("getallrelate")
  async getallrelateAction() {
    const data = await this.goodsService.find({
      where: { is_on_sale: 1, is_delete: false },
    });

    return data.map((d) => {
      return {
        id: d.id,
        name: d.name,
        list_pic_url: d.list_pic_url,
      };
    });
  }

  @Post("destory")
  async destoryAction(@Request() req) {
    const { id } = req.body;
    await this.adService.update({ id }, { is_delete: true });
    return true;
  }

  @Get("saleStatus")
  async saleStatusAction(@Request() req) {
    const { id, status } = req.query;
    let sale = 0;
    if (status == "true") {
      sale = 1;
    }
    return await this.adService.update({ id }, { enabled: sale });
  }
}
