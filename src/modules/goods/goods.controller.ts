import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as Express from "express";
import { GoodsService } from "./goods.service";
import { ILike, In, LessThanOrEqual, MoreThan, Not } from "typeorm";
import { cloneDeep } from "lodash";
import { CategoryService } from "../category/category.service";
import { ProductService } from "../product/product.service";
import { GoodsSpecificationService } from "../goodsSpecification/goodsSpecification.service";
import { CartService } from "../cart/cart.service";
import { SpecificationService } from "../specification/specification.service";
import { GoodsGalleryService } from "../goodsGallery/goodsGallery.service";
import { FreightTemplateService } from "../freight_template/freight_template.service";
import { BUSINESS_ERROR_CODE } from "src/common/exceptions/business.error.codes";
import { BusinessException } from "src/common/exceptions/business.exception";

@Controller("goods")
@UseGuards(AuthGuard("jwt"))
export class GoodsController {
  constructor(
    private goodsService: GoodsService,
    private categoryService: CategoryService,
    private specificationService: SpecificationService,
    private cartService: CartService,
    private productService: ProductService,
    private goodsGalleryService: GoodsGalleryService,
    private goodsSpecificationService: GoodsSpecificationService,
    private freightTemplate: FreightTemplateService,
  ) {}

  async updateStock(goods_sn, goods_number) {
    console.log("存在，现在就更新");
    await this.productService.update({ goods_sn: goods_sn }, { goods_number: goods_number });
  }

  @Get("getExpressData")
  async getExpressData() {
    const kd = [];
    const cate = [];
    const kdData = await this.freightTemplate.find({
      where: {
        is_delete: false,
      },
    });

    for (const item of kdData) {
      kd.push({
        value: item.id,
        label: item.name,
      });
    }

    const cateData = await this.categoryService.find({
      where: {
        parent_id: "0",
      },
    });

    for (const item of cateData) {
      cate.push({
        value: item.id,
        label: item.name,
      });
    }
    const infoData = {
      kd: kd,
      cate: cate,
    };
    return infoData;
  }

  @Post("copygoods")
  async copygoodsAction(@Request() req: Express.Request) {
    const { id: goodsId } = req.body;

    const _data = await this.goodsService.findOneById(goodsId);
    const data = cloneDeep(_data);
    delete data.id;
    data.is_on_sale = 0;

    const newAddGood = await this.goodsService.add(data);
    // const insertId = await this.model("goods").add(data);
    const goodsGallery = await this.goodsGalleryService.find({
      where: {
        goods_id: goodsId,
        is_delete: false,
      },
    });

    for (const item of goodsGallery) {
      const gallery = {
        img_url: item.img_url,
        sort_order: item.sort_order,
        goods_id: String(newAddGood.id),
      };
      await this.goodsGalleryService.add(gallery);

      // await this.model("goods_gallery").add(gallery);
    }
    return newAddGood.id;
  }

  @Post("updateGoodsNumber")
  async updateGoodsNumberAction() {
    const all_goods = await this.goodsService.find({
      where: {
        is_delete: false,
        is_on_sale: 1,
      },
    });

    for (const item of all_goods) {
      const queryBuilder = await this.productService.createQueryBuilder("product");
      const row = await queryBuilder
        .where({
          good_id: item.id,
        })
        .select("SUM(product.goods_number)", "goodsSum")
        .getRawOne();

      const goodsSum = row.goodsSum;
      await this.goodsService.update(
        {
          id: item.id,
        },
        {
          goods_number: goodsSum,
        },
      );
    }
    return true;
  }

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

    if (Number(index) == 1) {
      const [data1, count] = await this.goodsService.findAndCount({
        where: { is_delete: false },
        order: {
          sell_volume: "DESC",
        },
        skip: (Number(page) - 1) * Number(size),
        take: Number(size),
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
    } else if (Number(index) == 2) {
      const [_data, count] = await this.goodsService.findAndCount({
        where: { is_delete: false },
        order: {
          retail_price: "DESC",
        },
        skip: (Number(page) - 1) * Number(size),
        take: Number(size),
      });

      const data = cloneDeep(_data);
      for (const item of data) {
        const info = await this.categoryService.findOneById(item.category_id);
        (item as any).category_name = info?.name;
        if (!info) {
          console.log("这里逻辑上不是不应该没有info?");
        }
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
    } else if (Number(index) == 3) {
      const [_data, count] = await this.goodsService.findAndCount({
        where: {
          is_delete: false,
        },
        order: { goods_number: "DESC" },
        skip: (Number(page) - 1) * Number(size),
        take: Number(size),
      });

      const data = cloneDeep(_data);
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
        const product = await this.productService.find({
          where: {
            goods_id: item.id,
            is_delete: false,
          },
        });

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
        currentPage: page,
        data,
        count,
      };
    }
  }

  @Get("onsale")
  async onsaleAction(@Request() req: Express.Request) {
    const { page = 1, size } = req.query;

    const [_data, count] = await this.goodsService.findAndCount({
      where: {
        is_delete: false,
        is_on_sale: 1,
      },
      order: {
        sort_order: "asc",
      },
      skip: (Number(page) - 1) * Number(size),
      take: Number(size),
    });

    const data = cloneDeep(_data);

    for (const item of data) {
      const info = await this.categoryService.findOneById(item.category_id);

      if (!info) {
        console.log("这里逻辑上不是不应该没有info?");
      }
      (item as any).category_name = info?.name;
      // if (info.parent_id != 0) {
      //     const parentInfo = await this.model('category').where({id: info.parent_id}).find();
      //     item.category_p_name = parentInfo.name;
      // }
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
      const product = await this.productService.find({
        where: {
          goods_id: item.id,
          is_delete: false,
        },
      });

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
      currentPage: page,
      data,
      count,
    };
  }

  @Get("out")
  async outAction(@Request() req: Express.Request) {
    const { page = 1, size } = req.query;

    const [_data, count] = await this.goodsService.findAndCount({
      where: {
        is_delete: false,
        goods_number: LessThanOrEqual(0),
      },
      order: {
        sort_order: "asc",
      },
      skip: Number(size) * (Number(page) - 1),
      take: Number(size),
    });

    const data = cloneDeep(_data);

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

      const product = await this.productService.find({
        where: {
          goods_id: item.id,
          is_delete: false,
        },
      });

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

  @Get("drop")
  async dropAction(@Request() req: Express.Request) {
    const { page = 1, size } = req.query;
    const [_data, count] = await this.goodsService.findAndCount({
      where: {
        is_delete: false,
        is_on_sale: 0,
      },
      order: { id: "DESC" },
      skip: Number(size) * (Number(page) - 1),
      take: Number(size),
    });

    const data = cloneDeep(_data);
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

      const product = await this.productService.find({
        where: {
          goods_id: item.id,
          is_delete: false,
        },
      });

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

  @Get("saleStatus")
  async saleStatusAction(@Request() req: Express.Request) {
    const { id, status } = req.query;

    let sale = 0;
    if (status == "true") {
      sale = 1;
    }

    await this.goodsService.update({ id: Number(id) }, { is_on_sale: sale });
    await this.cartService.update(
      { goods_id: Number(id) },
      { is_on_sale: sale === 1, checked: sale },
    );

    return true;
  }

  @Get("productStatus")
  async productStatusAction(@Request() req: Express.Request) {
    const { id, status } = req.query;

    await this.productService.update(
      {
        id: Number(id),
      },
      {
        is_on_sale: status === "1",
      },
    );

    await this.cartService.update(
      {
        product_id: Number(id),
        is_delete: 0,
      },
      {
        is_on_sale: status === "1",
      },
    );
  }

  @Get("indexShowStatus")
  async indexShowStatusAction(@Request() req: Express.Request) {
    const { id, status } = req.query;

    let stat = 0;
    if (status == "true") {
      stat = 1;
    }

    await this.goodsService.update(
      {
        id: Number(id),
      },
      {
        is_index: stat,
      },
    );
  }

  @Get("info")
  async infoAction(@Request() req: Express.Request) {
    const { id } = req.query;

    const data = await this.goodsService.findOneById(Number(id));

    const category_id = data.category_id;
    const infoData = {
      info: data,
      category_id: category_id,
    };
    return infoData;
  }

  @Get("getAllSpecification")
  async getAllSpecificationAction() {
    const specInfo = await this.specificationService.find({
      where: {
        id: MoreThan(0),
      },
    });

    const specOptionsData = [];
    for (const spitem of specInfo) {
      const info = {
        value: spitem.id,
        label: spitem.name,
      };
      specOptionsData.push(info);
    }
    return specOptionsData;
  }

  @Get("getAllCategory1")
  async getAllCategory1Action() {
    const data = await this.categoryService.find({
      where: {
        is_show: 1,
        level: "L1",
      },
    });

    const c_data = await this.categoryService.find({
      where: {
        is_show: 1,
        level: "L2",
      },
    });

    const newData = [];
    for (const item of data) {
      const children = [];
      for (const citem of c_data) {
        if (citem.parent_id === String(item.id)) {
          children.push({
            value: citem.id,
            label: citem.name,
          });
        }
      }
      newData.push({
        value: item.id,
        label: item.name,
        children: children,
      });
    }
    return newData;
  }

  @Get("getAllCategory")
  async getAllCategoryAction() {
    const data = await this.categoryService.find({
      where: {
        is_show: 1,
        level: "L1",
      },
      select: ["id", "name"],
    });

    const newData = [];
    for (const item of data) {
      const children = [];

      const c_data = await this.categoryService.find({
        where: {
          is_show: 1,
          level: "L2",
          parent_id: String(item.id),
        },
        select: ["id", "name"],
      });

      for (const c_item of c_data) {
        children.push({
          value: c_item.id,
          label: c_item.name,
        });
      }
      newData.push({
        value: item.id,
        label: item.name,
        children: children,
      });
    }
    return newData;
  }

  // async storeAction() {
  //   const values = this.post("info");
  //   const specData = this.post("specData");
  //   const specValue = this.post("specValue");
  //   const cateId = this.post("cateId");
  //   const model = this.model("goods");
  //   const picUrl = values.list_pic_url;
  //   let goods_id = values.id;
  //   values.category_id = cateId;
  //   values.is_index = values.is_index ? 1 : 0;
  //   values.is_new = values.is_new ? 1 : 0;
  //   const id = values.id;
  //   if (id > 0) {
  //     await model
  //       .where({
  //         id: id,
  //       })
  //       .update(values);
  //     await this.model("cart")
  //       .where({
  //         goods_id: id,
  //       })
  //       .update({
  //         checked: values.is_on_sale,
  //         is_on_sale: values.is_on_sale,
  //         list_pic_url: picUrl,
  //         freight_template_id: values.freight_template_id,
  //       });
  //     await this.model("product")
  //       .where({
  //         goods_id: id,
  //       })
  //       .update({
  //         is_delete: 1,
  //       });
  //     await this.model("goods_specification")
  //       .where({
  //         goods_id: id,
  //       })
  //       .update({
  //         is_delete: 1,
  //       });
  //     for (const item of specData) {
  //       if (item.id > 0) {
  //         await this.model("cart")
  //           .where({
  //             product_id: item.id,
  //             is_delete: 0,
  //           })
  //           .update({
  //             retail_price: item.retail_price,
  //             goods_specifition_name_value: item.value,
  //             goods_sn: item.goods_sn,
  //           });
  //         delete item.is_delete;
  //         item.is_delete = 0;
  //         await this.model("product")
  //           .where({
  //             id: item.id,
  //           })
  //           .update(item);
  //         const specificationData = {
  //           value: item.value,
  //           specification_id: specValue,
  //           is_delete: 0,
  //         };
  //         await this.model("goods_specification")
  //           .where({
  //             id: item.goods_specification_ids,
  //           })
  //           .update(specificationData);
  //       } else {
  //         const specificationData = {
  //           value: item.value,
  //           goods_id: id,
  //           specification_id: specValue,
  //         };
  //         const specId = await this.model("goods_specification").add(specificationData);
  //         item.goods_specification_ids = specId;
  //         item.goods_id = id;
  //         await this.model("product").add(item);
  //       }
  //     }
  //     for (const [index, item] of values.gallery.entries()) {
  //       if (item.is_delete == 1 && item.id > 0) {
  //         await this.model("goods_gallery")
  //           .where({
  //             id: item.id,
  //           })
  //           .update({
  //             is_delete: 1,
  //           });
  //       } else if (item.is_delete == 0 && item.id > 0) {
  //         await this.model("goods_gallery")
  //           .where({
  //             id: item.id,
  //           })
  //           .update({
  //             sort_order: index,
  //           });
  //       } else if (item.is_delete == 0 && item.id == 0) {
  //         await this.model("goods_gallery").add({
  //           goods_id: id,
  //           img_url: item.url,
  //           sort_order: index,
  //         });
  //       }
  //     }
  //   } else {
  //     delete values.id;
  //     goods_id = await model.add(values);
  //     for (const item of specData) {
  //       const specificationData = {
  //         value: item.value,
  //         goods_id: goods_id,
  //         specification_id: specValue,
  //       };
  //       const specId = await this.model("goods_specification").add(specificationData);
  //       item.goods_specification_ids = specId;
  //       item.goods_id = goods_id;
  //       item.is_on_sale = 1;
  //       await this.model("product").add(item);
  //     }
  //     for (const [index, item] of values.gallery.entries()) {
  //       await this.model("goods_gallery").add({
  //         goods_id: goods_id,
  //         img_url: item.url,
  //         sort_order: index,
  //       });
  //     }
  //   }
  //   const pro = await this.model("product")
  //     .where({
  //       goods_id: goods_id,
  //       is_on_sale: 1,
  //       is_delete: 0,
  //     })
  //     .select();
  //   if (pro.length > 1) {
  //     const goodsNum = await this.model("product")
  //       .where({
  //         goods_id: goods_id,
  //         is_on_sale: 1,
  //         is_delete: 0,
  //       })
  //       .sum("goods_number");
  //     const retail_price = await this.model("product")
  //       .where({
  //         goods_id: goods_id,
  //         is_on_sale: 1,
  //         is_delete: 0,
  //       })
  //       .getField("retail_price");
  //     const maxPrice = Math.max(...retail_price);
  //     const minPrice = Math.min(...retail_price);
  //     const cost = await this.model("product")
  //       .where({
  //         goods_id: goods_id,
  //         is_on_sale: 1,
  //         is_delete: 0,
  //       })
  //       .getField("cost");
  //     const maxCost = Math.max(...cost);
  //     const minCost = Math.min(...cost);
  //     let goodsPrice = "";
  //     if (minPrice == maxPrice) {
  //       goodsPrice = minPrice;
  //     } else {
  //       goodsPrice = minPrice + "~" + maxPrice;
  //     }
  //     const costPrice = minCost + "~" + maxCost;
  //     await this.model("goods")
  //       .where({
  //         id: goods_id,
  //       })
  //       .update({
  //         goods_number: goodsNum,
  //         retail_price: goodsPrice,
  //         cost_price: costPrice,
  //         min_retail_price: minPrice,
  //         min_cost_price: minCost,
  //       });
  //   } else {
  //     const info = {
  //       goods_number: pro[0].goods_number,
  //       retail_price: pro[0].retail_price,
  //       cost_price: pro[0].cost,
  //       min_retail_price: pro[0].retail_price,
  //       min_cost_price: pro[0].cost,
  //     };
  //     await this.model("goods")
  //       .where({
  //         id: goods_id,
  //       })
  //       .update(info);
  //   }
  //   return this.success(goods_id);
  // }

  @Post("updatePrice")
  async updatePriceAction(@Request() req: Express.Request) {
    const data = req.body;
    const goods_id = data.goods_id;

    await this.goodsSpecificationService.update(
      { id: data.goods_specification_ids },
      { value: data.value },
    );

    const { value, ...others } = data;

    await this.productService.update({ id: data.id }, others);

    const pro = await this.productService.find({
      where: {
        goods_id: goods_id,
        is_on_sale: true,
        is_delete: false,
      },
    });

    if (pro.length == 0) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: "商品的规格数量至少1个",
      });
    }

    await this.cartService.update(
      {
        product_id: data.id,
        is_delete: 0,
      },
      {
        retail_price: data.retail_price,
        goods_specifition_name_value: data.value,
        goods_sn: data.goods_sn,
      },
    );

    delete data.value;

    if (pro.length > 1) {
      const queryBuilder2 = await this.productService.createQueryBuilder("q2");
      const a = await queryBuilder2
        .where({
          goods_id: goods_id,
          is_on_sale: 1,
          is_delete: 0,
        })
        .select("SUM(q2.goods_number)", "goodsNum")
        .getRawOne();
      const goodsNum = a.goodsNum;

      const retail_price1 = await this.productService.find({
        where: {
          goods_id: goods_id,
          is_on_sale: true,
          is_delete: false,
        },
        select: ["retail_price"],
      });

      const retail_price = retail_price1.map((re) => re.retail_price);

      const maxPrice = Math.max(...retail_price);
      const minPrice = Math.min(...retail_price);

      const cost1 = await this.productService.find({
        where: {
          goods_id: goods_id,
          is_on_sale: true,
          is_delete: false,
        },
        select: ["cost"],
      });
      const cost = cost1.map((c) => c.cost);

      const maxCost = Math.max(...cost);
      const minCost = Math.min(...cost);
      let goodsPrice = "";
      if (minPrice == maxPrice) {
        goodsPrice = String(minPrice);
      } else {
        goodsPrice = minPrice + "~" + maxPrice;
      }
      const costPrice = minCost + "~" + maxCost;
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
    } else if (pro.length == 1) {
      const info = {
        goods_number: Number(pro[0].goods_number),
        retail_price: String(pro[0].retail_price),
        cost_price: String(pro[0].cost),
        min_retail_price: pro[0].retail_price,
        min_cost_price: pro[0].cost,
      };
      await this.goodsService.update({ id: goods_id }, info);
    }
    return true;
  }

  @Post("checkSku")
  async checkSkuAction(@Request() req: Express.Request) {
    const { info } = req.body;

    if (info.id > 0) {
      const data = await this.productService.find({
        where: {
          id: Not(In([info.id])),
          goods_sn: info.goods_sn,
          is_delete: false,
        },
      });
      if (data && data.length !== 0) {
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.COMMON,
          message: "重复",
        });
      } else {
        return true;
      }
    } else {
      const data = await this.productService.find({
        where: {
          goods_sn: info.goods_sn,
          is_delete: false,
        },
      });

      if (data && data.length !== 0) {
        throw new BusinessException({
          code: BUSINESS_ERROR_CODE.COMMON,
          message: "重复",
        });
      } else {
        return true;
      }
    }
  }

  @Post("updateSort")
  async updateSortAction(@Request() req: Express.Request) {
    const { id, sort } = req.body;

    await this.goodsService.update(
      {
        id: id,
      },
      {
        sort_order: sort,
      },
    );

    const data = await this.goodsService.findOneById(id);
    return data;
  }

  // @Post("updateShortName")
  // async updateShortNameAction(@Request() req: Express.Request) {
  //   const { id, short_name } = req.body;

  //   const data = await this.goodsService.update(
  //     {
  //       id: id,
  //     },
  //     {
  //       short_name: short_name,
  //     },
  //   );

  //   return data.raw;
  // }

  // @Get("galleryList")
  // async galleryListAction(@Request() req: Express.Request) {
  //   const { id } = req.query;

  //   const data = await this.goodsGalleryService.find({
  //     where: {
  //       goods_id: String(id),
  //       is_delete: false,
  //     },
  //   });

  //   return data;
  // }

  @Post("gallery")
  async galleryAction(@Request() req: Express.Request) {
    const { url, good_id: id } = req.body;

    const info = {
      goods_id: id,
      img_url: url,
    };
    await this.goodsGalleryService.add(info);
    return true;
  }

  @Post("getGalleryList")
  async getGalleryListAction(@Request() req: Express.Request) {
    const { goodsId } = req.body;
    const data = await this.goodsGalleryService.find({
      where: {
        goods_id: goodsId,
        is_delete: false,
      },
      order: {
        sort_order: "asc",
      },
    });

    const galleryData = [];
    for (const item of data) {
      const pdata = {
        id: item.id,
        url: item.img_url,
        is_delete: 0,
      };
      galleryData.push(pdata);
    }
    const info = {
      galleryData: galleryData,
    };
    return info;
  }
}
