import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { INoticeCreateMembers, INoticeUpdateMembers, Notice } from "src/database/notice.entity";

import { Repository } from "typeorm";

@Injectable()
export class NoticeService extends BaseService<Notice, INoticeCreateMembers, INoticeUpdateMembers> {
  constructor(
    @InjectRepository(Notice)
    private notice: Repository<Notice>,
  ) {
    super(notice);
  }
}
