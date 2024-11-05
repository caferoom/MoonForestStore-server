import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Goods_Categories } from "src/entities/goods_categories.entity";

import { Repository } from "typeorm";

@Injectable()
export class GoodsCateGoriesService {
  public repository: Repository<Goods_Categories>;

  constructor(
    @InjectRepository(Goods_Categories)
    private goodsCateGoriesServiceRepository: Repository<Goods_Categories>,
  ) {
    this.repository = goodsCateGoriesServiceRepository;
  }

  // 获取树状的全部分类数据
  async getAllAsTree() {
    const allData = await this.repository.find();
    let maxLevel = 0;
    const map = new Map();

    // 第一遍，发现最大层级
    allData.forEach((data) => (maxLevel = Math.max(maxLevel, data.level)));

    // 第二遍,获取每个层级的group
    for (let i = 1; i <= maxLevel; i = i + 1) {
      map.set(
        i,
        allData
          .filter((data) => data.level === i)
          .map((data) => {
            return { ...data, is_show: !!data.is_show };
          }),
      );
    }

    // 第三遍，正式生成树
    function nodeGen(parentLevel, parentNode) {
      const currentLevel = parentLevel + 1;
      const levelGroup = map.get(currentLevel);
      if (currentLevel > maxLevel || levelGroup.length === 0) {
        return;
      }

      parentNode.children = levelGroup.filter((data) => data.parent_id === parentNode.id);
      parentNode.children.map((child) => {
        nodeGen(currentLevel, child);
      });
    }

    const tree = map.get(1) || [];
    tree.forEach((child) => nodeGen(1, child));

    return tree;
  }

  // 改变is_show状态
}
