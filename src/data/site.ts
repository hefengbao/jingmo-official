/**
 * 站点内容数据层
 * ------------------------------------------------------------
 * 把「文案 / 数据 / 链接」从模板中抽离,页面只负责渲染。
 * 后续接 CMS 或远程接口时,只需替换此文件的导出即可。
 */

export const site = {
  name: '京墨文库',
  enName: 'Jingmo',
  tagline: '开源的中华文化阅读 APP',
  description:
    '京墨文库是一款开源的中华文化阅读 APP,收录经典诗文、诗文名句、成语、汉字、词语等内容,献给喜欢中华文字、文学、文化的人。',
  keywords: ['京墨文库', '京墨文库APP', '京墨', '京墨APP', '古诗文', '开源阅读'],
  baiduVerify: 'codeva-qlVzdUvSSv',
  locale: 'zh-CN',
} as const;

/** 下载与外部链接 */
export const links = {
  download:
    'https://gitee.com/hefengbao/jingmo/releases/download/v1.16.1/jingmo_v1.16.1_release.apk',
  downloadFileName: 'jingmo_v1.16.1_release.apk',
  repository: 'https://gitee.com/hefengbao/jingmo',
  releases: 'https://gitee.com/hefengbao/jingmo/releases',
  wechat: 'https://open.weixin.qq.com/qr/code?username=NowInLife',
} as const;

/** 顶部导航 */
export const nav: { label: string; href: string }[] = [
  { label: '功能展示', href: '/#features' },
  { label: '内容数据', href: '/#data' },
  { label: '联系我们', href: '/#contact' },
];

/** 功能展示卡片 */
export interface Feature {
  img: string;
  alt: string;
  title: string;
  desc: string;
}

export const features: Feature[] = [
  {
    img: '/feature-1.png',
    alt: '经典诗文功能界面截图',
    title: '经典诗文',
    desc: '收录古今经典诗文作品',
  },
  {
    img: '/feature-2.png',
    alt: '诗文名句功能界面截图',
    title: '诗文名句',
    desc: '精选优美诗词名句',
  },
  {
    img: '/feature-3.png',
    alt: '成语功能界面截图',
    title: '成语',
    desc: '中华成语大词典',
  },
  {
    img: '/feature-4.png',
    alt: '句子功能界面截图',
    title: '句子',
    desc: '优美句子精选集',
  },
];

/** 内容数据:denormalized 成条目数组,便于网格渲染 */
export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: '955', label: '经典诗文' },
  { value: '160万+', label: '诗文' },
  { value: '10000', label: '诗文名句' },
  { value: '126830', label: '人物' },
  { value: '24228', label: '汉字' },
  { value: '422958', label: '词语' },
  { value: '49639', label: '成语' },
  { value: '14026', label: '歇后语' },
  { value: '964', label: '谚语' },
  { value: '42446', label: '谜语' },
  { value: '45', label: '绕口令' },
  { value: '490', label: '对联' },
  { value: '499', label: '歌词' },
  { value: '465', label: '知识卡片' },
  { value: '326', label: '句子' },
  { value: '45', label: '诗歌' },
  { value: '19', label: '中国传统节日' },
  { value: '24', label: '二十四节气' },
  { value: '161', label: '中国传统色' },
  { value: '59', label: '世界遗产名录' },
];

/** 页脚 */
export const footerLinks: { label: string; href: string }[] = [
  { label: '用户协议', href: '/docs/user-agreement/' },
  { label: '隐私政策', href: '/docs/privacy-policy/' },
];
