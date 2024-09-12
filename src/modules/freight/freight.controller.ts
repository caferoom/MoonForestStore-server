import { Controller, Get, UseGuards, Request, Post } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FreightTemplateService } from "../../services/freightTemplate.service";
import { ExceptAreaService } from "../../services/exceptArea.service";
import { RegionService } from "../../services/region.service";
import { In, Not } from "typeorm";
import { cloneDeep } from "lodash";
import { ExceptAreaDetailService } from "../../services/exceptAreaDetail.service";
import { FreightTemplateGroupService } from "../../services/freightTemplateGroup.service";
import { FreightTemplateDetailService } from "../../services/freightTemplateDetail.service";

@Controller("freight")
@UseGuards(AuthGuard("jwt"))
export class FreightController {
  constructor(
    private freightTemplateService: FreightTemplateService,
    private freightTemplateGroupService: FreightTemplateGroupService,
    private freightTemplateDetailService: FreightTemplateDetailService,
    private exceptAreaService: ExceptAreaService,
    private regionService: RegionService,
    private exceptAreaDetailService: ExceptAreaDetailService,
  ) {}

  @Get("freight")
  async freight() {
    const data = await this.freightTemplateService.find({ where: { is_delete: false } });
    return data;
  }

  @Get("exceptArea")
  async exceptAreaAction() {
    const data = await this.exceptAreaService.find({ where: { is_delete: false } });
    const _data: any[] = cloneDeep(data);
    for (const item of _data) {
      const area = item.area;
      const areaData = area.split(",");
      const info = await this.regionService.repository.findBy({ id: In(areaData) });
      item.areaName = info.map((i) => i.name).join(",");
    }

    return _data;
  }

  @Post("exceptAreaDetail")
  async exceptAreaDetailAction(@Request() req) {
    console.log("exceptAreaDetail start");

    const { id } = req.body;
    const data = await this.exceptAreaService.findOneById(id);
    const _data = cloneDeep(data);
    // let areaData = {}
    const area = data.area;
    const areaData = area.split(",");
    const info = await this.regionService.repository.findBy({
      id: In(areaData),
    });
    (_data as any).areaName = info.map((i) => i.name).join(",");
    console.log("exceptAreaDetail end");
    return _data;
  }

  @Post("getAllProvinces")
  async getAllProvinces() {
    const provinces = await this.regionService.getAllProvinces();
    return provinces.map((a) => ({ id: a.id, name: a.name }));
  }

  @Post("addExceptArea")
  async addExceptAreaAction(@Request() req) {
    const { table, info } = req.body;
    const data = {
      area: table[0].area.substring(2),
      content: info.content,
    };
    const d = await this.exceptAreaService.add(data);
    const area = table[0].area.substring(2);
    const arr = area.split(",");
    for (const item of arr) {
      await this.exceptAreaDetailService.add({
        except_area_id: d.id,
        area: item,
      });
    }
    return true;
  }

  @Post("saveExceptArea")
  async saveExceptAreaAction(@Request() req) {
    const { table, info } = req.body;
    console.log("*", table, info);
    const data = {
      area: table[0].area,
      content: info.content,
    };
    await this.exceptAreaService.edit(info.id, data);

    const area = table[0].area;
    const arr = area.split(",").map(Number);
    await this.exceptAreaDetailService.update(
      {
        area: Not(In(arr)),
        except_area_id: info.id,
        is_delete: false,
      },
      { is_delete: true },
    );

    for (const item of arr) {
      const e = await this.exceptAreaDetailService.find({
        where: {
          except_area_id: info.id,
          area: item,
          is_delete: false,
        },
      });
      if (e.length === 0) {
        await this.exceptAreaDetailService.add({
          except_area_id: info.id,
          area: item,
        });
      }
    }
    return true;
  }

  @Post("exceptAreaDelete")
  async exceptAreaDelete(@Request() req) {
    const { id } = req.body;
    await this.exceptAreaService.edit(Number(id), { is_delete: true });

    await this.exceptAreaDetailService.update({ except_area_id: id }, { is_delete: true });

    return true;
  }

  @Post("addTable")
  async addTableAction(@Request() req) {
    const { info, table: data, defaultData: def } = req.body;
    // return false;
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
          const area = item.area.substring(2);
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
          const areaArr = area.split(",");
          for (const item of areaArr) {
            await this.freightTemplateDetailService.add({
              template_id: template_id,
              group_id: groupI.id,
              area: item,
            });
          }
        }
      }
    }

    return true;
  }

  @Post("freightdetail")
  async freightdetailAction(@Request() req) {
    const { id } = req.body;

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
  async saveTableAction(@Request() req) {
    const { table: data, defaultData: def, info } = req.body;

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
                area: item,
                group_id: id,
              },
            });
            if (e && e.length !== 0) {
              await this.freightTemplateDetailService.add({
                template_id: template_id,
                group_id: id,
                area: item,
              });
            }
          }
        } else {
          const template_id = info.id;
          const area = item.area.substring(2);
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
              area: item,
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
          const area = item.area.substring(2);
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
              area: item,
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
  @Post("destory")
  async destory(@Request() req) {
    const { id } = req.body;
    return await this.freightTemplateService.remove(Number(id));
  }
}
