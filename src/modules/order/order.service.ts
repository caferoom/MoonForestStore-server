import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { IOrderCreateMembers, IOrderUpdateMembers, Order } from "src/database/order.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderService extends BaseService<Order, IOrderCreateMembers, IOrderUpdateMembers> {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }

  async getOrderStatusText(orderId) {
    const orderInfo = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
    });
    let statusText = "";
    switch (orderInfo.order_status) {
      case 101:
        statusText = "待付款";
        break;
      case 102:
        statusText = "交易关闭";
        break;
      case 103:
        statusText = "交易关闭"; //到时间系统自动取消
        break;
      case 201:
        statusText = "待备货";
        break;
      case 300:
        statusText = "待发货";
        break;
      case 301:
        statusText = "已发货";
        break;
      case 302:
        statusText = "待评价";
        break;
      case 303:
        statusText = "待评价"; //到时间，未收货的系统自动收货、
        break;
      case 401:
        statusText = "交易成功"; //到时间，未收货的系统自动收货、
        break;
    }
    return statusText;
  }

  async getOrderBtnText(orderId) {
    const orderInfo = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    let statusText = "";
    switch (orderInfo.order_status) {
      case 101:
        statusText = "修改价格";
        break;
      case 102:
        statusText = "查看详情";
        break;
      case 103:
        statusText = "查看详情"; //到时间系统自动取消
        break;
      case 201:
        statusText = "备货";
        break;
      case 202:
        statusText = "查看详情";
        break;
      case 203:
        statusText = "查看详情";
        break;
      case 300:
        statusText = "打印快递单";
        break;
      case 301:
        statusText = "查看详情";
        break;
      case 302:
        statusText = "查看详情";
        break;
      case 303:
        statusText = "查看详情"; //到时间，未收货的系统自动收货、
        break;
      case 401:
        statusText = "查看详情"; //到时间，未收货的系统自动收货、
        break;
    }
    if (orderInfo.order_status == 301) {
      statusText = "确认收货";
    }
    return statusText;
  }
}
