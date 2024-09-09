import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { CategoryService } from "../../services/category.service";
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
  constructor(private categoryService: CategoryService) {}

  @Get("")
  async indexAction() {
    const data = await this.categoryService.find({
      order: {
        sort_order: "ASC",
      },
    });

    const topCategory = data.filter((item) => {
      return item.parent_id === 0;
    });

    data.forEach((d) => {
      if (d.is_show === 1) {
        (d as any).is_show = true;
      } else {
        (d as any).is_show = false;
      }
      if (d.is_channel === 1) {
        (d as any).is_channel = true;
      } else {
        (d as any).is_channel = false;
      }
      if (d.is_category === 1) {
        (d as any).is_category = true;
      } else {
        (d as any).is_category = false;
      }
    });
    const categoryList = [];

    topCategory.map((item) => {
      (item as any).level = 1;
      categoryList.push(item);

      data.map((child) => {
        if (child.parent_id === item.id) {
          (child as any).level = 2;
          categoryList.push(child);
        }
      });
    });
    return categoryList;
  }

  @Post("updateSort")
  async updateSortAction(@Body() body) {
    const { id, sort } = body;

    const category = await this.categoryService.findOne({ where: { id } });
    if (!category) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: `未查询到id: ${id} 的Category`,
      });
    }
    category.sort_order = sort;
    return this.categoryService.save(category);
  }

  @Get("topCategory")
  async topCategoryAction() {
    const [data] = await this.categoryService.findAndCount({
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
    return await this.categoryService.findOneById(id);
  }

  @Post("store")
  async storeAction(@Body() body) {
    const values = body;
    const { id } = body;

    if (id > 0) {
      await this.categoryService.update({ id: id }, values);
    } else {
      delete values.id;
      await this.categoryService.add(values);
    }
    return values;
  }

  @Post("destory")
  async destoryAction(@Body() body: DeleteIconImageDTO) {
    const { id } = body;

    const data = await this.categoryService.find({
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
      await this.categoryService.delete({
        id: id,
      });
    }
  }

  @Get("showStatus")
  async showStatusAction(@Query() query: ShowStatusDTO) {
    const { id, status } = query;
    await this.categoryService.update(
      {
        id: id,
      },
      {
        is_show: status ? 1 : 0,
      },
    );
  }

  @Get("channelStatus")
  async channelStatusAction(@Query() query: ChannelStatusDTO) {
    const { id, status } = query;
    await this.categoryService.update(
      {
        id: id,
      },
      {
        is_channel: status === "true" ? 1 : 0,
      },
    );
  }

  @Get("categoryStatus")
  async categoryStatusAction(@Query() query: CategoryStatusDTO) {
    const { id, status } = query;

    await this.categoryService.update(
      {
        id: id,
      },
      {
        is_category: status === "true" ? 1 : 0,
      },
    );
  }

  @Post("deleteBannerImage")
  async deleteBannerImageAction(@Body() body: DeleteIconImageDTO) {
    const { id } = body;
    await this.categoryService.update(
      {
        id: id,
      },
      {
        img_url: null,
      },
    );
  }

  @Post("deleteIconImage")
  async deleteIconImageAction(@Body() body: DeleteIconImageDTO) {
    const { id } = body;
    await this.categoryService.update({ id: id }, { icon_url: null });

    return true;
  }
}
