import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';
import { mergeRelatedData, pushData } from './common/codeup';
import { ConfigService } from '@nestjs/config';
import * as dayjs from 'dayjs';

/**
   @return string
 */
@Controller('webhook')
export class WebhookController {
  constructor(private readonly configService: ConfigService) {}

  @Post()
  async handleWebhook(@Body() data: any): Promise<any> {
    // 这里可以在转发前对接收到的 webhook 数据进行处理
    const forwardingData = {
      msg_type: 'interactive',
      card: undefined,
    };

    if (data.object_kind === 'push') {
      const lastCommit = data.commits[data.commits.length - 1];

      forwardingData.card = pushData({
        title: '代码提交提醒',
        repository: data.repository.name,
        branch: data.ref.substring(data.ref.lastIndexOf('/') + 1),
        commitId: `[${data.after}](${lastCommit.url})`,
        commitMsg: lastCommit.message,
        commitDateTime: dayjs(lastCommit.timestamp)
          .subtract(8, 'hour')
          .format('YYYY-MM-DD HH:mm:ss'),
        username: data.user_name,
      });
    } else {
      const titleMap = {
        open: '合并请求发起提醒',
        accept: '合并请求通过提醒',
        merge: '合并请求合并提醒',
      };
      forwardingData.card = mergeRelatedData({
        title: titleMap[data.object_attributes.action],
        url: data.object_attributes.url,
        description: data.object_attributes.title,
        operators: data.user.name,
        repository: data.repository.name,
        branchFlow: [
          data.object_attributes.source_branch,
          data.object_attributes.target_branch,
        ],
        dateTime: dayjs(
          data.object_attributes.action === 'open'
            ? data.object_attributes.created_at
            : data.object_attributes.updated_at,
        ).format('YYYY-MM-DD HH:mm:ss'),
      });
    }

    return (
      await axios.post(
        this.configService.get<string>('FORWARD_URL'),
        forwardingData,
      )
    ).data;
  }
}
