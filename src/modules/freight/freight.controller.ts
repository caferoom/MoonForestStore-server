import { Controller, Get, UseGuards, Post, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FreightTemplateService } from "../../services/freightTemplate.service";
import { ExceptAreaService } from "../../services/exceptArea.service";
import { RegionService } from "../../services/region.service";
import { In, Not } from "typeorm";
import { cloneDeep } from "lodash";
import { FreightTemplateGroupService } from "../../services/freightTemplateGroup.service";
import { FreightTemplateDetailService } from "../../services/freightTemplateDetail.service";
import {
  DTO_Freight_AddExceptArea,
  DTO_Freight_AddTable,
  DTO_Freight_ExceptAreaDelete,
  DTO_Freight_ExceptAreaDetail,
  DTO_Freight_Remove,
  DTO_Freight_SaveExceptArea,
} from "./dto/freight.dto";

@Controller("freight")
@UseGuards(AuthGuard("jwt"))
export class FreightController {
  constructor(
    private freightTemplateService: FreightTemplateService,
    private freightTemplateGroupService: FreightTemplateGroupService,
    private freightTemplateDetailService: FreightTemplateDetailService,
    private exceptAreaService: ExceptAreaService,
    private regionService: RegionService,
  ) {}

  @Get("getAll")
  async freight() {
    return await this.freightTemplateService.find({ where: { is_delete: false } });
  }

  @Get("exceptArea")
  async exceptAreaAction() {
    const data = await this.exceptAreaService.repository.find({ where: { is_delete: false } });

    const result: { areaName: string; content: string; id: number; area: string }[] = [];

    for (const item of data) {
      const area = item.area;
      const areaData = area.split(",");
      const info = await this.regionService.repository.findBy({ id: In(areaData) });
      result.push({
        areaName: info.map((i) => i.name).join(","),
        content: item.content,
        area: item.area,
        id: item.id,
      });
    }

    return result;
  }

  @Post("exceptAreaDetail")
  async exceptAreaDetail(@Body() body: DTO_Freight_ExceptAreaDetail) {
    const { id } = body;
    const data = await this.exceptAreaService.repository.findOneById(id);
    const area = data.area;
    const areaData = area.split(",");
    const info = await this.regionService.repository.findBy({
      id: In(areaData),
    });

    return {
      areaName: info.map((i) => i.name).join(","),
      content: data.content,
      id: data.id,
      area: data.area,
    } as { areaName: string; content: string; id: number; area: string };
  }

  @Post("getAllProvinces")
  async getAllProvinces() {
    const provinces = await this.regionService.getAllProvinces();
    return provinces.map((a) => ({ id: a.id, name: a.name }));
  }

  @Post("addExceptArea")
  async addExceptAreaAction(@Body() body: DTO_Freight_AddExceptArea) {
    return await this.exceptAreaService.repository.save({
      area: body.area,
      content: body.content,
    });
  }

  @Post("saveExceptArea")
  async saveExceptAreaAction(@Body() body: DTO_Freight_SaveExceptArea) {
    const { area, content, id } = body;
    return await this.exceptAreaService.repository.update(id, {
      area: area,
      content: content,
    });
  }

  @Post("exceptAreaDelete")
  async exceptAreaDelete(@Body() body: DTO_Freight_ExceptAreaDelete) {
    const { id } = body;
    await this.exceptAreaService.repository.update(id, { is_delete: true });
  }

  @Post("addTable")
  async addTableAction(@Body() body: DTO_Freight_AddTable) {
    const { info, table: data, defaultData: def } = body;

    const temp = await this.freightTemplateService.add(info);

    if (temp) {
      const upData = {
        start: def[0].start,
        start_fee: def[0].start_fee,
        add: def[0].add,
        add_fee: def[0].add_fee,
        free_by_money: def[0].free_by_money,
        free_by_number: def[0].free_by_number,
        template_id: temp.id,
        is_default: true,
      };

      const group = await this.freightTemplateGroupService.add(upData);
      if (group) {
        await this.freightTemplateDetailService.add({
          template_id: temp.id,
          group_id: group.id,
          area: 0,
        });
      }

      if (data.length > 0) {
        for (const item of data) {
          const area = item.area;
          const template_id = temp.id;
          const info = {
            area: area,
            start: item.start,
            start_fee: item.start_fee,
            add: item.add,
            add_fee: item.add_fee,
            template_id: temp.id,
            free_by_money: item.free_by_money,
            free_by_number: item.free_by_number,
          };
          const groupI = await this.freightTemplateGroupService.add(info);
          const areaArr = area ? area.split(",") : [];
          for (const item of areaArr) {
            await this.freightTemplateDetailService.add({
              template_id: template_id,
              group_id: groupI.id,
              area: Number(item),
            });
          }
        }
      }
    }

    return true;
  }

  @Post("freightdetail")
  async freightdetailAction(@Body() body) {
    const { id } = body;

    const model = await this.freightTemplateGroupService.find({
      where: {
        template_id: id,
        is_delete: false,
        area: Not("0"),
      },
    });
    const data = cloneDeep(model);

    for (const item of data) {
      const area = item.area;
      if (item.free_by_money > 0) {
        (item as any).freeByMoney = false;
      }
      if (item.free_by_number > 0) {
        (item as any).freeByNumber = false;
      }
      const areaData = area.split(",");
      const info = await this.regionService.repository.find({ where: { id: In(areaData) } });

      (item as any).areaName = info.map((i) => i.name).join(",");
    }

    const defaultData = await this.freightTemplateGroupService.find({
      where: {
        template_id: id,
        area: "0",
        is_delete: false,
      },
    });

    const freight = await this.freightTemplateService.find({
      where: {
        id: id,
      },
    });

    const info = {
      freight: freight[0],
      data: data,
      defaultData: defaultData,
    };

    return info;
  }

  @Post("saveTable")
  async saveTableAction(@Body() body: DTO_Freight_AddTable) {
    const { table: data, defaultData: def, info } = body;

    const idInfo = []; // 是已存在的id。如果大于零，则去循环。等于零，则先将已存在的data删除，然后判断，1，data的length > 0.则，说明有新的数据
    for (const item of data) {
      if (item.id > 0) {
        idInfo.push(item.id);
      }
    }

    if (idInfo.length != 0) {
      const d = await this.freightTemplateGroupService.find({
        where: {
          id: Not(In(idInfo)),
          template_id: info.id,
          is_default: false,
          is_delete: false,
        },
      });

      const deleData = d.map((i) => i.id);

      for (const ele of deleData) {
        await this.freightTemplateDetailService.update(
          {
            template_id: info.id,
            group_id: ele,
            is_delete: false,
          },
          { is_delete: true },
        );
      }

      const dbTable = await this.freightTemplateGroupService.update(
        {
          id: Not(In(idInfo)),
          template_id: info.id,
          is_default: false,
          is_delete: false,
        },
        { is_delete: true },
      );

      for (const item of data) {
        const id = item.id; // 这个是group_id
        if (id > 0) {
          const template_id = info.id;

          const val = {
            area: item.area,
            start: item.start,
            start_fee: item.start_fee,
            add: item.add,
            add_fee: item.add_fee,
            free_by_money: item.free_by_money,
            free_by_number: item.free_by_number,
          };

          await this.freightTemplateGroupService.update(
            {
              id: id,
              template_id: template_id,
              is_delete: false,
            },
            val,
          );

          // 这里要根据area去notin更新

          const area = item.area;
          const arr = area.split(",");

          await this.freightTemplateDetailService.update(
            {
              area: Not(In(arr)),
              template_id: template_id,
              group_id: id,
            },
            {
              is_delete: true,
            },
          );

          for (const item of arr) {
            const e = await this.freightTemplateDetailService.find({
              where: {
                template_id: template_id,
                area: Number(item),
                group_id: id,
              },
            });
            if (e && e.length !== 0) {
              await this.freightTemplateDetailService.add({
                template_id: template_id,
                group_id: id,
                area: Number(item),
              });
            }
          }
        } else {
          const template_id = info.id;
          const area = item.area;
          const val = {
            area: area,
            start: item.start,
            start_fee: item.start_fee,
            add: item.add,
            add_fee: item.add_fee,
            template_id: template_id,
            free_by_money: item.free_by_money,
            free_by_number: item.free_by_number,
          };
          const groupId = await this.freightTemplateGroupService.add(val);
          const areaArr = area.split(",");
          for (const item of areaArr) {
            await this.freightTemplateDetailService.add({
              template_id: template_id,
              group_id: groupId.id,
              area: Number(item),
            });
          }
        }
      }
    } else {
      // 这里前台将table全删除了，所以要将原先的数据都删除
      const dbTable = await this.freightTemplateGroupService.update(
        {
          template_id: info.id,
          is_default: false,
          is_delete: false,
        },
        {
          is_delete: true,
        },
      );
      // 将detail表也要删除！！！

      if (data.length != 0) {
        for (const item of data) {
          const area = item.area;
          const template_id = info.id;
          const val = {
            area: area,
            start: item.start,
            start_fee: item.start_fee,
            add: item.add,
            add_fee: item.add_fee,
            template_id: template_id,
            free_by_money: item.free_by_money,
            free_by_number: item.free_by_number,
          };
          const groupId = await this.freightTemplateGroupService.add(val);
          //根据area 去循环一下另一张detail表
          const areaArr = area.split(",");
          for (const item of areaArr) {
            await this.freightTemplateDetailService.add({
              template_id: template_id,
              group_id: groupId.id,
              area: Number(item),
            });
          }
        }
      }
    }

    const upData = {
      start: def[0].start,
      start_fee: def[0].start_fee,
      add: def[0].add,
      add_fee: def[0].add_fee,
      free_by_money: def[0].free_by_money,
      free_by_number: def[0].free_by_number,
    };

    await this.freightTemplateGroupService.update(
      {
        id: def[0].id,
        template_id: info.id,
        is_default: true,
      },
      upData,
    );
    // .update(upData);

    // await this.model('freight_template_detail').where({
    //     group_id: def[0].id,
    //     template_id: info.id,
    // }).update(upData);

    const tempData = {
      name: info.name,
      package_price: info.package_price,
      freight_type: info.freight_type,
    };

    await this.freightTemplateService.update(
      {
        id: info.id,
      },
      tempData,
    );
    return true;
  }

  // 删除快递模板
  @Post("remove")
  async remove(@Body() body: DTO_Freight_Remove) {
    const { id } = body;
    return await this.freightTemplateService.remove(id);
  }
}
