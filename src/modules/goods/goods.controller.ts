import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as Express from "express";
import { GoodsService } from "./goods.service";
import { ILike } from "typeorm";
import { cloneDeep } from "lodash";
import { CategoryService } from "../category/category.service";
import { ProductService } from "../product/product.service";
import { GoodsSpecificationService } from "../goodsSpecification/goodsSpecification.service";

@Controller("goods")
@UseGuards(AuthGuard("jwt"))
export class GoodsController {
  constructor(
    private goodsService: GoodsService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private goodsSpecificationService: GoodsSpecificationService,
  ) {}

  @Get("")
  async indexAction(@Request() req: Express.Request) {
    const { page = 1, size, name = "" } = req.query;
    const [_data, count] = await this.goodsService.findAndCount({
      where: {
        name: ILike(`%${name}%`),
        is_delete: false,
      },
      order: { sort_order: "ASC" },
      skip: (Number(page) - 1) * Number(size),
      take: Number(size),
    });

    const data = cloneDeep(_data);

    for (const item of data) {
      const info = await this.categoryService.findOneById(item.category_id);

      (item as any).category_name = info?.name;
      if (item.is_on_sale == 1) {
        (item as any).is_on_sale = true;
      } else {
        (item as any).is_on_sale = false;
      }
      if (item.is_index == 1) {
        (item as any).is_index = true;
      } else {
        (item as any).is_index = false;
      }
      const _product = await this.productService.find({
        where: {
          goods_id: item.id,
          is_delete: false,
        },
      });

      const product = cloneDeep(_product);

      for (const ele of product) {
        const spec = await this.goodsSpecificationService.findOne({
          where: {
            id: Number(ele.goods_specification_ids),
            is_delete: false,
          },
        });

        (ele as any).value = spec.value;
        (ele as any).is_on_sale = ele.is_on_sale ? "1" : "0";
      }
      (item as any).product = product;
    }
    return {
      data,
      count,
      currentPage: page,
    };
  }

  @Get("sort")
  async sortAction(@Request() req: Express.Request) {
    const { page = 1, size, index } = req.query;

    if (index == 1) {
      const [data1, count] = await this.goodsService.findAndCount({
        where: { is_delete: false },
        order: {
          sell_volume: "DESC",
        },
        skip: (page - 1) * size,
        take: size,
      });

      const data = cloneDeep(data1);
      for (const item of data) {
        const info = await this.categoryService.findOneById(item.category_id);

        (item as any).category_name = info.name;
        if (item.is_on_sale == 1) {
          (item as any).is_on_sale = true;
        } else {
          (item as any).is_on_sale = false;
        }
        if (item.is_index == 1) {
          (item as any).is_index = true;
        } else {
          (item as any).is_index = false;
        }
        const _product = await this.productService.find({
          where: {
            goods_id: item.id,
            is_delete: false,
          },
        });

        const product = cloneDeep(_product);
        for (const ele of product) {
          const _sepc = await this.goodsSpecificationService.findOne({
            where: {
              id: Number(ele.goods_specification_ids),
              is_delete: false,
            },
          });

          (ele as any).value = _sepc.value;
          (ele as any).is_on_sale = ele.is_on_sale ? "1" : "0";
        }
        (item as any).product = product;
      }
      return {
        count,
        data,
        currentPage: page,
      };
    } else if (index == 2) {
      const _data = this.goodsService.find({
        where: { is_delete: false },
        order: {
          retail_price: "DESC",
        },
        skip: (page - 1) * size,
        take: size,
      });

      const data = cloneDeep(_data);
      for (const item of data) {
        const info = await this.model("category")
          .where({
            id: item.category_id,
          })
          .find();
        item.category_name = info.name;
        if (item.is_on_sale == 1) {
          item.is_on_sale = true;
        } else {
          item.is_on_sale = false;
        }
        if (item.is_index == 1) {
          item.is_index = true;
        } else {
          item.is_index = false;
        }
        const product = await this.model("product")
          .where({
            goods_id: item.id,
            is_delete: 0,
          })
          .select();
        for (const ele of product) {
          const spec = await this.model("goods_specification")
            .where({
              id: ele.goods_specification_ids,
              is_delete: 0,
            })
            .find();
          ele.value = spec.value;
          ele.is_on_sale = ele.is_on_sale ? "1" : "0";
        }
        item.product = product;
      }
      return this.success(data);
    } else if (index == 3) {
      const data = await model
        .where({
          is_delete: 0,
        })
        .order(["goods_number DESC"])
        .page(page, size)
        .countSelect();
      for (const item of data.data) {
        const info = await this.model("category")
          .where({
            id: item.category_id,
          })
          .find();
        item.category_name = info.name;
        if (item.is_on_sale == 1) {
          item.is_on_sale = true;
        } else {
          item.is_on_sale = false;
        }
        if (item.is_index == 1) {
          item.is_index = true;
        } else {
          item.is_index = false;
        }
        const product = await this.model("product")
          .where({
            goods_id: item.id,
            is_delete: 0,
          })
          .select();
        for (const ele of product) {
          const spec = await this.model("goods_specification")
            .where({
              id: ele.goods_specification_ids,
              is_delete: 0,
            })
            .find();
          ele.value = spec.value;
          ele.is_on_sale = ele.is_on_sale ? "1" : "0";
        }
        item.product = product;
      }
      return this.success(data);
    }
  }
}
