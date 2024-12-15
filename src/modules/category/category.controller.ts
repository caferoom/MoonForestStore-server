import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { GoodsCateGoriesService } from "../../services/goods_categories.service";
import {
  CategoryStatusDTO,
  ChannelStatusDTO,
  DeleteIconImageDTO,
  ShowStatusDTO,
} from "./dto/category.dto";
import { BUSINESS_ERROR_CODE } from "src/common/exceptions/business.error.codes";
import { BusinessException } from "src/common/exceptions/business.exception";

@Controller("category")
@UseGuards(AuthGuard("jwt"))
export class CategoryController {
  constructor(private goodsCateGoriesService: GoodsCateGoriesService) {}

  @Get("all")
  async all() {
    return await this.goodsCateGoriesService.getAllAsTree();
  }

  @Post("updateSort")
  async updateSortAction(@Body() body) {
    const { id, sort } = body;

    const category = await this.goodsCateGoriesService.repository.findOne({ where: { id } });
    if (!category) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: `未查询到id: ${id} 的Category`,
      });
    }
    category.sort_order = sort;
    return this.goodsCateGoriesService.repository.save(category);
  }

  @Get("topCategory")
  async topCategoryAction() {
    const [data] = await this.goodsCateGoriesService.repository.findAndCount({
      where: {
        parent_id: 0,
      },
      order: {
        id: "ASC",
      },
    });

    return {
      data,
    };
  }

  @Get("info")
  async infoAction(@Query() query) {
    const { id } = query;
    return await this.goodsCateGoriesService.repository.findOneById(id);
  }

  @Post("store")
  async storeAction(@Body() body) {
    const values = body;
    const { id } = body;

    if (id > 0) {
      await this.goodsCateGoriesService.repository.update({ id: id }, values);
    } else {
      delete values.id;
      await this.goodsCateGoriesService.repository.save(values);
    }
    return values;
  }

  @Post("destory")
  async destoryAction(@Body() body: DeleteIconImageDTO) {
    const { id } = body;

    const data = await this.goodsCateGoriesService.repository.find({
      where: {
        parent_id: id,
      },
    });

    if (data.length > 0) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: "未查询到相关数据，删除失败",
      });
    } else {
      await this.goodsCateGoriesService.repository.delete({
        id: id,
      });
    }
  }

  @Get("showStatus")
  async showStatus(@Query() query: ShowStatusDTO) {
    return await this.goodsCateGoriesService.changeShowStatus(query);
  }

  @Post("deleteBannerImage")
  async deleteBannerImageAction(@Body() body: DeleteIconImageDTO) {
    const { id } = body;
    await this.goodsCateGoriesService.repository.update(
      {
        id: id,
      },
      {
        img_url: null,
      },
    );
  }
}
