import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Region } from "src/entities_old/region.entity";
import { Repository } from "typeorm";

@Injectable()
export class RegionService {
  public repository: Repository<Region>;

  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {
    this.repository = regionRepository;
  }

  // 获取省市区树状接口list
  async getRegionsHierarchy() {
    const aData = await this.regionRepository.find({ where: { type: 1 } });
    const bData = await this.regionRepository.find({ where: { type: 2 } });
    const cData = await this.regionRepository.find({ where: { type: 3 } });

    const newData = aData.map((aItem) => {
      const children = bData
        .filter((bItem) => bItem.parent_id === aItem.id)
        .map((bItem) => ({
          value: bItem.id,
          label: bItem.name,
          children: cData
            .filter((cItem) => cItem.parent_id === bItem.id)
            .map((cItem) => ({
              value: cItem.id,
              label: cItem.name,
            })),
        }));

      return {
        value: aItem.id,
        label: aItem.name,
        children,
      };
    });

    return newData;
  }

  // 输入区域id和详细信息及门牌号字符串,返回包含省市区的完全地址
  async getCombinedAddress(id: number, detailAddress?: string) {
    const district = await this.regionRepository.findOne({
      where: {
        id,
      },
      relations: ["linked_parent", "linked_parent.linked_parent"], // 加载关联的父级区域
    });

    if (!district) {
      throw new Error("District not found");
    }

    const province_name = district.linked_parent?.linked_parent?.name ?? "";
    const city_name = district.linked_parent?.name ?? "";
    const district_name = district.name;

    return `${province_name}${city_name}${district_name}${detailAddress || ""}`;
  }

  // 获取所有省份列表
  async getAllProvinces() {
    return await this.regionRepository.find({ where: { type: 1 } });
  }
}
