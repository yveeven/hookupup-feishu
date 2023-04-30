export const pushData = (params: {
  title: string;
  commitMsg: string;
  commitId: string;
  username: string;
  repository: string;
  branch: string;
  commitDateTime: string;
}) => {
  return {
    config: {
      wide_screen_mode: true,
    },
    header: {
      template: 'blue',
      title: {
        tag: 'plain_text',
        content: `${params.title}`,
      },
    },
    elements: [
      {
        tag: 'div',
        text: {
          tag: 'lark_md',
          content: `提交 ID: ${params.commitId}`,
        },
      },
      {
        tag: 'markdown',
        content: `提交消息: ${params.commitMsg}`,
      },
      {
        tag: 'div',
        text: {
          content: `提交人: ${params.username}`,
          tag: 'plain_text',
        },
      },
      {
        tag: 'markdown',
        content: `仓库: ${params.repository}`,
      },
      {
        tag: 'div',
        text: {
          content: `分支: ${params.branch}`,
          tag: 'plain_text',
        },
      },
      {
        tag: 'markdown',
        content: `提交于: ${params.commitDateTime}`,
      },
    ],
  };
};

export const mergeRelatedData = (params: {
  title: string;
  url: string;
  description: string;
  operators: string;
  repository: string;
  branchFlow: string[];
  dateTime: string;
}) => {
  return {
    config: {
      wide_screen_mode: true,
    },
    header: {
      template: 'blue',
      title: {
        tag: 'plain_text',
        content: `${params.title}`,
      },
    },
    elements: [
      {
        tag: 'markdown',
        content: `描述: ${params.description} [去看看](${params.url})`,
      },
      {
        tag: 'markdown',
        content: `操作人: ${params.operators}`,
      },
      {
        tag: 'markdown',
        content: `仓库: ${params.repository}`,
      },
      {
        tag: 'markdown',
        content: `分支流转: 从 ${params.branchFlow[0]} 到 ${params.branchFlow[1]}`,
      },
      {
        tag: 'markdown',
        content: `操作时间: ${params.dateTime}`,
      },
    ],
  };
};
