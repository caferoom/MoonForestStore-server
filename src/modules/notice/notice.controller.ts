import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { NoticeService } from "../../services/notice.service";
import * as dayjs from "dayjs";
import { cloneDeep } from "lodash";

@Controller("notice")
@UseGuards(AuthGuard("jwt"))
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  @Get("")
  async indexAction() {
    const d = await this.noticeService.find();
    const data = cloneDeep(d);
    for (const item of data) {
      (item as any).end_time = dayjs(item.end_time * 1000).format("YYYY-MM-DD HH:mm:ss");
    }

    return data;
  }

  @Post("updateContent")
  async updateContentAction(@Request() req) {
    const { id, content } = req.body;
    return await this.noticeService.update({ id: id }, { content: content });
  }

  @Post("add")
  async addAction(@Request() req) {
    const { content, time: end_time } = req.body;

    const endtime = parseInt(String(new Date(end_time).getTime() / 1000));

    const info = {
      content: content,
      end_time: endtime,
    };
    const data = await this.noticeService.add(info);
    return data;
  }

  @Post("update")
  async updateAction(@Request() req) {
    const { content, time: end_time, id } = req.body;

    const endTime = parseInt(String(new Date(end_time).getTime() / 1000));
    const currentTime = parseInt(String(new Date().getTime() / 1000));

    const info = {
      content: content,
      end_time: endTime,
    };

    if (endTime > currentTime) {
      (info as any).is_delete = false;
    } else {
      (info as any).is_delete = true;
    }
    const data = await this.noticeService.update({ id: id }, info);
    return data;
  }

  @Post("destory")
  async destory(@Body() body) {
    return await this.noticeService.remove(body.id);
  }
}
