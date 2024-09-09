import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SpecificationService } from "../../services/specification.service";
import * as Express from "express";
import { ProductService } from "../../services/product.service";
import { GoodsSpecificationService } from "../../services/goodsSpecification.service";
import { BusinessException } from "src/common/exceptions/business.exception";
import { BUSINESS_ERROR_CODE } from "src/common/exceptions/business.error.codes";
import { GoodsService } from "../../services/goods.service";
import { CartService } from "../../services/cart.service";
import { MoreThan } from "typeorm";

@Controller("specification")
@UseGuards(AuthGuard("jwt"))
export class SpecificationController {
  constructor(
    private specificationService: SpecificationService,
    private productService: ProductService,
    private goodsSpecificationService: GoodsSpecificationService,
    private goodsService: GoodsService,
    private cartService: CartService,
  ) {}

  @Get("")
  async indexAction() {
    const data = await this.specificationService.find({
      where: {
        id: MoreThan(0),
      },
    });

    return data;
  }

  @Post("getGoodsSpec")
  async getGoodsSpecAction(@Request() req: Express.Request) {
    const { id } = req.body;

    const data = await this.productService.find({
      where: {
        goods_id: id,
        is_delete: false,
      },
    });

    //TODO 这里只有一层，以后如果有多重型号，如一件商品既有颜色又有尺寸时，这里的代码是不对的。以后再写。
    const specData = [];
    let specification_id = 0;
    for (const item of data) {
      const goods_spec_id = item.goods_specification_ids;
      const specValueData = await this.goodsSpecificationService.findOne({
        where: {
          id: Number(goods_spec_id),
          is_delete: false,
        },
      });
      specification_id = specValueData.specification_id;
      (item as any).value = specValueData.value;
    }
    const dataInfo = {
      specData: data,
      specValue: specification_id,
    };
    return dataInfo;
  }

  @Post("productUpdate")
  async productUpdateAction(@Request() req: Express.Request) {
    const { goods_number, goods_weight, goods_sn, retail_price, cost, value } = req.body;

    const updateInfo = {
      goods_number: goods_number,
      goods_weight: goods_weight,
      cost: cost,
      retail_price: retail_price,
    };

    await this.cartService.update(
      {
        goods_sn: goods_sn,
      },
      {
        retail_price: retail_price,
      },
    );

    await this.productService.update(
      {
        goods_sn: goods_sn,
      },
      updateInfo,
    );

    const idData = await this.productService.findOne({
      where: {
        goods_sn: goods_sn,
      },
      select: ["goods_specification_ids", "goods_id"],
    });

    const goods_specification_id = idData.goods_specification_ids;
    await this.goodsSpecificationService.update(
      {
        id: Number(goods_specification_id),
      },
      {
        value: value,
      },
    );

    const goods_id = idData.goods_id;
    // todo 价格显示为区间
    const pro = await this.productService.find({
      where: {
        goods_id: goods_id,
      },
    });
    if (pro.length > 1) {
      const raw = await this.productService
        .createQueryBuilder("product")
        .where({
          goods_id: goods_id,
        })
        .select("SUM(product.goods_number)", "sum")
        .getRawOne();
      const goodsNum = raw.sum;

      const raw1 = await this.productService
        .createQueryBuilder("product")
        .where({
          goods_id: goods_id,
        })
        .select("MAX(product.retail_price)", "max")
        .getRawOne();
      const maxPrice = raw1.max;

      const raw2 = await this.productService
        .createQueryBuilder("product")
        .where({
          goods_id: goods_id,
        })
        .select("MIN(product.retail_price)", "min")
        .getRawOne();
      const minPrice = raw2.min;

      const raw3 = await this.productService
        .createQueryBuilder("product")
        .where({
          goods_id: goods_id,
        })
        .select("MAX(product.cost)", "max")
        .getRawOne();
      const maxCost = raw3.max;

      const raw4 = await this.productService
        .createQueryBuilder("product")
        .where({
          goods_id: goods_id,
        })
        .select("MIN(product.cost)", "min")
        .getRawOne();
      const minCost = raw4.min;

      const goodsPrice = minPrice + "-" + maxPrice;
      const costPrice = minCost + "-" + maxCost;
      await this.goodsService.update(
        {
          id: goods_id,
        },
        {
          goods_number: goodsNum,
          retail_price: goodsPrice,
          cost_price: costPrice,
          min_retail_price: minPrice,
          min_cost_price: minCost,
        },
      );
    } else {
      await this.goodsService.update(
        {
          id: goods_id,
        },
        {
          goods_number: goods_number,
          retail_price: retail_price,
          cost_price: cost,
          min_retail_price: retail_price,
          min_cost_price: cost,
        },
      );
    }
  }

  @Post("productDele")
  async productDeleAction(@Request() req: Express.Request) {
    const { id: productId } = req.body;

    const idData = await this.productService.findOne({
      where: {
        id: productId,
      },
      select: ["goods_specification_ids", "goods_id"],
    });

    const goods_specification_id = idData.goods_specification_ids;
    const goods_id = idData.goods_id;

    await this.productService.delete({
      id: productId,
    });

    await this.goodsSpecificationService.delete({
      id: Number(goods_specification_id),
    });

    const lastData = await this.productService.find({
      where: {
        goods_id: goods_id,
      },
    });

    if (lastData.length != 0) {
      const raw = await this.productService
        .createQueryBuilder("product")
        .where({
          goods_id: goods_id,
        })
        .select("SUM(product.goods_number)", "sum")
        .getRawOne();
      const goodsNum = raw.sum;

      const row1 = await this.productService
        .createQueryBuilder("product")
        .where({
          goods_id: goods_id,
        })
        .select("MIN(product.retail_price)", "min")
        .getRawOne();
      const goodsPrice = row1.min;

      await this.goodsService.update(
        {
          id: goods_id,
        },
        {
          goods_number: goodsNum,
          retail_price: goodsPrice,
        },
      );
    }
  }

  @Post("delePrimarySpec")
  async delePrimarySpecAction(@Request() req: Express.Request) {
    const { id: goods_id } = req.body;

    await this.productService.delete({
      goods_id: goods_id,
    });

    await this.goodsSpecificationService.delete({
      goods_id: goods_id,
    });

    await this.goodsService.update(
      {
        id: goods_id,
      },
      {
        goods_number: 0,
        retail_price: "0",
      },
    );
  }

  @Post("detail")
  async detailAction(@Request() req: Express.Request) {
    const { id } = req.body;
    const data = await this.specificationService.findOneById(id);
    return data;
  }

  @Post("add")
  async addAction(@Request() req: Express.Request) {
    const { name: value, sort_order: sort } = req.body;
    const info = {
      name: value,
      sort_order: sort,
    };
    await this.specificationService.add(info);
  }

  @Post("checkSn")
  async checkSnAction(@Request() req: Express.Request) {
    const { sn } = req.body;
    const data = await this.productService.find({
      where: {
        goods_sn: sn,
      },
    });

    if (data.length > 0) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: `sn已存在`,
      });
    }
  }

  @Post("update")
  async updateAction(@Request() req: Express.Request) {
    const { id, name: value, sort_order: sort } = req.body;
    const info = {
      name: value,
      sort_order: sort,
    };

    await this.specificationService.update(
      {
        id,
      },
      info,
    );
  }

  @Post("delete")
  async deleteAction(@Request() req: Express.Request) {
    const { id } = req.body;

    const goods_spec = await this.goodsSpecificationService.find({
      where: {
        specification_id: id,
        is_delete: false,
      },
    });

    console.log(goods_spec);
    if (goods_spec.length > 0) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: `该型号下有商品，暂不能删除`,
      });
    } else {
      await this.specificationService.delete({
        id: id,
      });
    }
  }
}
