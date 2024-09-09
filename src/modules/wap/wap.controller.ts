import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as Express from "express";
import { GoodsService } from "../../services/goods.service";
import { CategoryService } from "../../services/category.service";
import { CartService } from "../../services/cart.service";
import { ProductService } from "../../services/product.service";
import { GoodsSpecification } from "src/entities/goods_specification.entity";

@Controller("address")
@UseGuards(AuthGuard("jwt"))
export class WapController {
  constructor(
    private cartService: CartService,
    private goodsService: GoodsService,
    private categoryService: CategoryService,
    private productService: ProductService,
  ) {}

  // async indexAction() {
  //   // const product = await this.model('product').where({is_delete:1}).delete()
  //   const product = await this.model("product")
  //     .field(["c.goods_sn", "c.goods_id", "c.goods_specification_ids", "c.retail_price", "g.value"])
  //     .alias("c")
  //     .join({
  //       table: "goods_specification",
  //       join: "left",
  //       as: "g",
  //       on: ["c.goods_specification_ids", "g.id"],
  //     })
  //     .select(); // 如果出错了，不会更新数据的
  //   console.log(product);
  //   // const goods = await this.model('goods').where({is_delete:0}).select();
  //   const goods = await this.model("goods")
  //     .where({
  //       is_delete: 0,
  //     })
  //     .select();
  //   for (const item of product) {
  //     const goods_id = item.goods_id;
  //     for (const jtem of goods) {
  //       if (goods_id == jtem.id) {
  //         // const product = await this.model('product').where({goods_id:jtem.id}).update({is_delete:0})
  //         item.name = jtem.name + "-" + item.value;
  //         item.is_on_sale = jtem.is_on_sale;
  //         item.list_pic_url = jtem.list_pic_url;
  //         if (item.is_on_sale == 1) {
  //           item.is_on_sale = true;
  //         } else {
  //           item.is_on_sale = false;
  //         }
  //       }
  //     }
  //   }
  //   return this.success(product);
  // }

  @Get("onsale")
  async onsaleAction() {
    const product = await this.productService
      .createQueryBuilder("c")
      .leftJoin(GoodsSpecification, "g", "c.goods_specification_ids = g.id")
      .select([
        "c.goods_sn",
        "c.goods_id",
        "c.goods_specification_ids",
        "c.retail_price",
        "g.value",
      ])
      .getMany();

    const goods = await this.goodsService.find({
      where: {
        is_on_sale: 1,
        is_delete: false,
      },
    });
    // const goods = await this.model("goods")
    //   .where({
    //     is_on_sale: 1,
    //     is_delete: 0,
    //   })
    //   .select();
    console.log(goods);
    const info = [];
    for (const item of product) {
      const goods_id = item.goods_id;
      for (const jtem of goods) {
        if (goods_id == jtem.id) {
          (item as any).name = jtem.name + "-" + (item as any).value;
          (item as any).is_on_sale = jtem.is_on_sale;
          (item as any).list_pic_url = jtem.list_pic_url;
          if (Number(item.is_on_sale) == 1) {
            item.is_on_sale = true;
            info.push(item);
          }
        }
      }
    }
    return info;
  }
  // async outsaleAction() {
  //   const product = await this.model("product")
  //     .field(["c.goods_sn", "c.goods_id", "c.goods_specification_ids", "c.retail_price", "g.value"])
  //     .alias("c")
  //     .join({
  //       table: "goods_specification",
  //       join: "left",
  //       as: "g",
  //       on: ["c.goods_specification_ids", "g.id"],
  //     })
  //     .select(); // 如果出错了，不会更新数据的
  //   const info = [];
  //   const goods = await this.model("goods")
  //     .where({
  //       is_on_sale: 0,
  //       is_delete: 0,
  //     })
  //     .select();
  //   console.log(goods);
  //   for (const item of product) {
  //     const goods_id = item.goods_id;
  //     for (const jtem of goods) {
  //       if (goods_id == jtem.id) {
  //         item.name = jtem.name + "-" + item.value;
  //         item.is_on_sale = jtem.is_on_sale;
  //         item.list_pic_url = jtem.list_pic_url;
  //         if (item.is_on_sale == 0) {
  //           item.is_on_sale = false;
  //           info.push(item);
  //         }
  //       }
  //     }
  //   }
  //   console.log(product);
  //   return this.success(info);
  // }

  @Post("updatePrice")
  async updatePriceAction(@Request() req: Express.Request) {
    const { sn, id, price } = req.body;
    await this.productService.update(
      {
        goods_sn: sn,
      },
      {
        retail_price: price,
      },
    );

    const raw2 = await this.productService
      .createQueryBuilder("product")
      .where({
        goods_id: id,
      })
      .select("MIN(product.retail_price)", "min")
      .getRawOne();
    const min = raw2.min;

    await this.cartService.update({ goods_sn: sn }, { retail_price: price });
    await this.goodsService.update({ id: id }, { retail_price: min });
  }

  // async outAction() {
  //   const page = this.get("page") || 1;
  //   const size = this.get("size") || 10;
  //   const model = this.model("goods");
  //   const data = await model
  //     .where({
  //       is_delete: 0,
  //       goods_number: ["<=", 0],
  //     })
  //     .order(["id DESC"])
  //     .page(page, size)
  //     .countSelect();
  //   for (const item of data.data) {
  //     const info = await this.model("category")
  //       .where({
  //         id: item.category_id,
  //       })
  //       .find();
  //     item.category_name = info.name;
  //     if (info.parent_id != 0) {
  //       const parentInfo = await this.model("category")
  //         .where({
  //           id: info.parent_id,
  //         })
  //         .find();
  //       item.category_p_name = parentInfo.name;
  //     }
  //     if (item.is_on_sale == 1) {
  //       item.is_on_sale = true;
  //     } else {
  //       item.is_on_sale = false;
  //     }
  //   }
  //   return this.success(data);
  // }

  @Get("drop")
  async dropAction(@Request() req: Express.Request) {
    const { page = 1, size = 10 } = req.query;
    const [data, count] = await this.goodsService.findAndCount({
      where: {
        is_delete: false,
        is_on_sale: 0,
      },
      order: {
        id: "DESC",
      },
      skip: (Number(page) - 1) * Number(size),
      take: Number(size),
    });

    for (const item of data) {
      const info = await this.categoryService.findOneById(item.category_id);

      (item as any).category_name = info.name;
      if (info.parent_id != 0) {
        const parentInfo = await this.categoryService.findOneById(info.parent_id);

        (item as any).category_p_name = parentInfo.name;
      }
      if (item.is_on_sale == 1) {
        (item as any).is_on_sale = true;
      } else {
        (item as any).is_on_sale = false;
      }
    }
    return {
      currentPage: page,
      count,
      data,
    };
  }

  // async sortAction() {
  //   const page = this.get("page") || 1;
  //   const size = this.get("size") || 10;
  //   const model = this.model("goods");
  //   const index = this.get("index");
  //   if (index == 1) {
  //     const data = await model
  //       .where({
  //         is_delete: 0,
  //       })
  //       .order(["sell_volume DESC"])
  //       .page(page, size)
  //       .countSelect();
  //     for (const item of data.data) {
  //       const info = await this.model("category")
  //         .where({
  //           id: item.category_id,
  //         })
  //         .find();
  //       item.category_name = info.name;
  //       if (info.parent_id != 0) {
  //         const parentInfo = await this.model("category")
  //           .where({
  //             id: info.parent_id,
  //           })
  //           .find();
  //         item.category_p_name = parentInfo.name;
  //       }
  //       if (item.is_on_sale == 1) {
  //         item.is_on_sale = true;
  //       } else {
  //         item.is_on_sale = false;
  //       }
  //     }
  //     return this.success(data);
  //   } else if (index == 2) {
  //     const data = await model
  //       .where({
  //         is_delete: 0,
  //       })
  //       .order(["retail_price DESC"])
  //       .page(page, size)
  //       .countSelect();
  //     for (const item of data.data) {
  //       const info = await this.model("category")
  //         .where({
  //           id: item.category_id,
  //         })
  //         .find();
  //       item.category_name = info.name;
  //       if (info.parent_id != 0) {
  //         const parentInfo = await this.model("category")
  //           .where({
  //             id: info.parent_id,
  //           })
  //           .find();
  //         item.category_p_name = parentInfo.name;
  //       }
  //       if (item.is_on_sale == 1) {
  //         item.is_on_sale = true;
  //       } else {
  //         item.is_on_sale = false;
  //       }
  //     }
  //     return this.success(data);
  //   } else if (index == 3) {
  //     const data = await model
  //       .where({
  //         is_delete: 0,
  //       })
  //       .order(["goods_number DESC"])
  //       .page(page, size)
  //       .countSelect();
  //     for (const item of data.data) {
  //       const info = await this.model("category")
  //         .where({
  //           id: item.category_id,
  //         })
  //         .find();
  //       item.category_name = info.name;
  //       if (info.parent_id != 0) {
  //         const parentInfo = await this.model("category")
  //           .where({
  //             id: info.parent_id,
  //           })
  //           .find();
  //         item.category_p_name = parentInfo.name;
  //       }
  //       if (item.is_on_sale == 1) {
  //         item.is_on_sale = true;
  //       } else {
  //         item.is_on_sale = false;
  //       }
  //     }
  //     return this.success(data);
  //   }
  // }

  // async saleStatusAction() {
  //   const id = this.get("id");
  //   const status = this.get("status");
  //   let sale = 0;
  //   if (status == "true") {
  //     sale = 1;
  //   }
  //   const model = this.model("goods");
  //   await model
  //     .where({
  //       id: id,
  //     })
  //     .update({
  //       is_on_sale: sale,
  //     });
  // }
  // async infoAction() {
  //   const id = this.get("id");
  //   const model = this.model("goods");
  //   const data = await model
  //     .where({
  //       id: id,
  //     })
  //     .find();
  //   console.log(data);
  //   const category_id = data.category_id;
  //   const cateData = [];
  //   const c_data = await this.model("category")
  //     .where({
  //       id: category_id,
  //     })
  //     .find();
  //   const f_data = await this.model("category")
  //     .where({
  //       id: c_data.parent_id,
  //     })
  //     .find();
  //   cateData.push(f_data.id, c_data.id);
  //   const productInfo = await this.model("product")
  //     .where({
  //       goods_id: id,
  //     })
  //     .select();
  //   if (productInfo.length > 1) {
  //   }
  //   const infoData = {
  //     info: data,
  //     cateData: cateData,
  //   };
  //   return this.success(infoData);
  // }

  // goods.js中有一样的
  // async getAllCategory1Action() {
  //   // 我写的算法
  //   const model = this.model("category");
  //   const data = await model
  //     .where({
  //       is_show: 1,
  //       level: "L1",
  //     })
  //     .select();
  //   const c_data = await model
  //     .where({
  //       is_show: 1,
  //       level: "L2",
  //     })
  //     .select();
  //   const newData = [];
  //   for (const item of data) {
  //     const children = [];
  //     for (const citem of c_data) {
  //       if (citem.parent_id == item.id) {
  //         children.push({
  //           value: citem.id,
  //           label: citem.name,
  //         });
  //       }
  //     }
  //     newData.push({
  //       value: item.id,
  //       label: item.name,
  //       children: children,
  //     });
  //   }
  //   return this.success(newData);
  // }

  // goods.js中有一样的
  // async getAllCategoryAction() {
  //   // 老婆的算法
  //   const model = this.model("category");
  //   const data = await model
  //     .where({
  //       is_show: 1,
  //       level: "L1",
  //     })
  //     .field("id,name")
  //     .select();
  //   const newData = [];
  //   for (const item of data) {
  //     const children = [];
  //     const c_data = await model
  //       .where({
  //         is_show: 1,
  //         level: "L2",
  //         parent_id: item.id,
  //       })
  //       .field("id,name")
  //       .select();
  //     for (const c_item of c_data) {
  //       children.push({
  //         value: c_item.id,
  //         label: c_item.name,
  //       });
  //     }
  //     newData.push({
  //       value: item.id,
  //       label: item.name,
  //       children: children,
  //     });
  //   }
  //   return this.success(newData);
  // }

  // not used，not copy
  // async getGoodsSnNameAction() {
  //   const cateId = this.get("cateId");
  //   const model = this.model("goods");
  //   const data = await model
  //     .where({
  //       category_id: cateId,
  //       is_delete: 0,
  //     })
  //     .field("goods_sn,name")
  //     .order({
  //       goods_sn: "DESC",
  //     })
  //     .select();
  //   return this.success(data);
  // }

  // not used，not copy
  // async storeAction() {
  //   const values = this.post("info");
  //   const model = this.model("goods");
  //   const picUrl = values.list_pic_url;
  //   const goods_id = values.id;
  //   await this.model("cart")
  //     .where({
  //       goods_id: goods_id,
  //     })
  //     .update({
  //       list_pic_url: picUrl,
  //     });
  //   values.is_new = values.is_new ? 1 : 0;
  //   const id = values.id;
  //   if (id > 0) {
  //     await model
  //       .where({
  //         id: id,
  //       })
  //       .update(values);
  //   } else {
  //     delete values.id;
  //     const goods_id = await model.add(values);
  //     await model
  //       .where({
  //         id: goods_id,
  //       })
  //       .update({
  //         goods_sn: goods_id,
  //       });
  //   }
  //   return this.success(values);
  // }

  // not used，not copy
  // async destoryAction() {
  //   const id = this.post("id");
  //   await this.model("goods")
  //     .where({
  //       id: id,
  //     })
  //     .limit(1)
  //     .delete();
  //   return this.success();
  // }
}
