import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RegionService } from "./region.service";

@Controller("common")
@UseGuards(AuthGuard("jwt"))
export class CommonController {
  constructor(private regionService: RegionService) {}

  @Get("getAllRegion")
  async getAllRegion() {
    const aData = await this.regionService.find({
      where: {
        type: 1,
      },
    });
    const bData = await this.regionService.find({
      where: {
        type: 2,
      },
    });
    const cData = await this.regionService.find({
      where: {
        type: 3,
      },
    });
    const newData = [];
    for (const item of aData) {
      const children = [];
      for (const bitem of bData) {
        const innerChildren = [];
        for (const citem of cData) {
          if (citem.parent_id == bitem.id) {
            innerChildren.push({
              value: citem.id,
              label: citem.name,
            });
          }
        }
        if (bitem.parent_id == item.id) {
          children.push({
            value: bitem.id,
            label: bitem.name,
            children: innerChildren,
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
}
