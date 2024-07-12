import { Injectable } from "@nestjs/common";

// 这里我们使用一个简单的内存数据存储,实际应用中你应该使用数据库或其他持久化存储
const order = [
  {
    userId: 1,
    username: "john",
    nickname: "john1",
    password: "changeme",
    last_login_time: Date.now(),
    last_login_ip: "101.1.1.1",
    register_time: Date.now(),
  },
  {
    userId: 2,
    username: "maria",
    password: "guess",
    last_login_time: Date.now(),
    last_login_ip: "101.1.1.1",
    register_time: Date.now(),
  },
];

@Injectable()
export class orderService {
  async exist(username: string): Promise<any> {
    return order.find((user) => user.username === username);
  }

  async validPassword(username: string, password: string): Promise<any> {
    const user = order.find((user) => user.username === username);
    if (user && user.password === password) {
      return {
        username,
        password,
      };
    }
    return null;
  }
}
