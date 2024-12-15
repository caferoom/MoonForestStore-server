import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import * as qiniu from "qiniu";

@Injectable()
export class QiniuService {
  private mac;

  constructor(private configService: ConfigService) {
    const ak = configService.get<string>("qiniu_AK");
    const sk = configService.get<string>("qiniu_SK");
    this.mac = new qiniu.auth.digest.Mac(ak, sk);
  }

  /**
   * 生成上传用的token
   * @param params
   * @returns
   */
  async createUploadToken(params?: { expires?: number }) {
    const { expires = 7200 } = params || {};
    const bucket = this.configService.get<string>("qiniu_bucket");
    const domain = await this.getUploadUrl();
    const options: qiniu.rs.PutPolicyOptions = {
      scope: bucket,
      expires,
      returnBody: `{
        "message": "upload success",
        "success": true,
        "data": {"fileUrl":"http://${domain}/$(key)","fileSize":"$(fsize)","fileType":"$(mimeType)","fileName":"$(key)"}
      }`,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(this.mac);
    return uploadToken;
  }

  /**
   * 获取bucket绑定域名列表（只返回第一个）
   * @returns
   */
  async getUploadUrl() {
    const result = await this.qiniuAxios("/v2/domains", {
      method: "GET",
      baseUrl: "https://uc.qiniuapi.com",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        tbl: "luckmmon",
      },
    });
    return result?.data[0] ?? "";
  }

  /**
   * 生成管理凭证
   * @param props
   * @returns
   */
  private generateAccessToken(props: {
    url: string;
    method: string;
    contentType: string;
    headers?: Record<string, string>;
    body?: object;
  }) {
    return qiniu.util.generateAccessTokenV2(
      this.mac,
      props.url,
      props.method,
      props.contentType,
      props.body &&
        (props.contentType.includes("application/json") ||
          props.contentType.includes("application/x-www-form-urlencoded"))
        ? JSON.stringify(props.body)
        : null,
      props.headers,
    );
  }

  /**
   * 封装了qiniu生成签名逻辑的简单请求接口
   * @param url
   * @param options
   * @returns
   */
  async qiniuAxios(
    url: string,
    options: {
      baseUrl: string;
      method: string;
      headers: Record<string, string>;
      params?: Record<string, string>;
      body?: any;
    },
  ) {
    const formattedDate = qiniu.util.formatDateUTC(new Date(), "YYYYMMDDTHHmmssZ");
    const searchParams = new URLSearchParams(options.params);
    const obj = new URL(
      `${options.baseUrl}${url}${options.params ? "?" + searchParams.toString() : ""}`,
    );

    const accessToken = this.generateAccessToken({
      url: `${obj.origin}${obj.pathname}${obj.search}`,
      method: options.method,
      contentType: options.headers["Content-Type"],
      headers: {
        ...options.headers,
        "X-Qiniu-Date": formattedDate,
      },
      body: options.body,
    });

    return axios(`${obj.pathname}${obj.search}`, {
      headers: {
        ...options.headers,
        "X-Qiniu-Date": formattedDate,
        Authorization: accessToken,
      },
      method: options.method,
      baseURL: obj.origin,
      data: options.body,
    });
  }
}
