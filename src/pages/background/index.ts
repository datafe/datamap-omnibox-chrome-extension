import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import { getDmcHomeEndpoint, getDmcTablePrefix } from '@root/src/shared/utils/request';

import 'webextension-polyfill';

reloadOnUpdate('pages/background');

const selfExtensionId = chrome?.runtime?.id;

// 不要显示 url
const doNotShowUrlList = [];

// 不要加上 <match> <url> <dim>
const doNotDecorateDescriptionList = [];

let currentTabId;
let defaultRegion = 'cn-shanghai';
let defaultTableType: TableType = 'ODPS';

const bizLinks = [
  // region site
  {
    keywords: [chrome.i18n.getMessage('inner'), 'inner', '弹内'],
    display: chrome.i18n.getMessage('inner'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc.dw.alibaba-inc.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('shanghai'), 'shanghai', 'shang', '上海'],
    display: chrome.i18n.getMessage('shanghai'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-cn-shanghai.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('hangzhou'), 'hangzhou', 'hang', '杭州'],
    display: chrome.i18n.getMessage('hangzhou'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-cn-hangzhou.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('shenzhen'), 'shenzhen', 'shen', '深圳'],
    display: chrome.i18n.getMessage('shenzhen'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-cn-shenzhen.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('beijing'), 'beijing', 'bei', '北京'],
    display: chrome.i18n.getMessage('beijing'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-cn-beijing.data.aliyun.com',

    },
  },
  {
    keywords: [chrome.i18n.getMessage('chengdu'), 'chengdu', 'cheng', '成都'],
    display: chrome.i18n.getMessage('chengdu'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-cn-chengdu.data.aliyun.com',

    },
  },
  {
    keywords: [chrome.i18n.getMessage('zhangjiakou'), 'zhangjiakou', 'zhang', '张家口'],
    display: chrome.i18n.getMessage('zhangjiakou'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-cn-zhangjiakou.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('wulanchabu'), 'wulanchabu', 'wulan', '乌兰察布'],
    display: chrome.i18n.getMessage('wulanchabu'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-cn-wulanchabu.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('hongkong'), 'hongkong', 'hong', 'hk', '香港'],
    display: chrome.i18n.getMessage('hongkong'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-cn-hongkong.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('singapore'), 'singapore', 'sin', 'sg', 'ap-southeast-1', 'ap', 'southeast', 'south', 'east', '新加坡'],
    display: chrome.i18n.getMessage('singapore'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-ap-southeast-1.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('sydney'), 'sydney', 'syn', 'ap-southeast-2', 'ap', 'southeast', 'south', 'east', 'aus', '澳洲', '悉尼'],
    display: chrome.i18n.getMessage('sydney'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-ap-southeast-2.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('kualaLumpur'), 'kualaLumpur', 'kuala', 'ap-southeast-3', 'ap', 'southeast', 'south', 'east', 'mala', '马来', '吉隆坡'],
    display: chrome.i18n.getMessage('kualaLumpur'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-ap-southeast-3.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('jakarta'), 'jakarta', 'ap-southeast-5', 'ap', 'southeast', 'south', 'east', 'indo', '印尼', '雅加达'],
    display: chrome.i18n.getMessage('jakarta'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-ap-southeast-5.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('mumbai'), 'mumbai', 'ap-south-1', 'ap', 'south', 'east', 'india', '印度', '孟买'],
    display: chrome.i18n.getMessage('mumbai'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-ap-south-1.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('dubai'), 'dubai', 'me', 'east', '阿联酋', '迪拜'],
    display: chrome.i18n.getMessage('dubai'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-me-east-1.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('tokyo'), 'tokyo', 'ap-northeast-1', 'ap', 'northeast', 'north', 'east', 'japan', '日本', '东京'],
    display: chrome.i18n.getMessage('tokyo'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-ap-northeast-1.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('siliconValley'), 'silicon', 'us-west-1', 'us', 'west', '美西', '美国', '硅谷'],
    display: chrome.i18n.getMessage('siliconValley'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-us-west-1.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('virginia'), 'virginia', 'us-east-1', 'us', 'east', '美东', '美国', '弗吉尼亚'],
    display: chrome.i18n.getMessage('virginia'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-us-east-1.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('frankfurt'), 'frankfurt', 'eu-central-1', 'eu', 'central', 'germany', '德国', '法兰克福'],
    display: chrome.i18n.getMessage('frankfurt'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-eu-central-1.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('london'), 'london', 'eu-west-1', 'eu', 'west', 'england', '英国', '伦敦'],
    display: chrome.i18n.getMessage('london'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-eu-west-1.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('shanghaiFinance'), 'shanghaifinance', 'shanghaifin', 'cn-shanghai-finance-1', 'finance', 'shanghai', '上海金融云', '上海金'],
    display: chrome.i18n.getMessage('shanghaiFinance'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-cn-shanghai-finance-1.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('shenzhenFinance'), 'shenzhenfinance', 'shenzhenfin', 'cn-shenzhen-finance-1', 'finance', 'shenzhen', '深圳金融云', '深圳金'],
    display: chrome.i18n.getMessage('shenzhenFinance'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-cn-shenzhen-finance-1.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('beijingFinance'), 'beijingfinance', 'beijingfin', 'cn-beijing-finance-1', 'finance', 'beijing', '北京金融云', '北京金'],
    display: chrome.i18n.getMessage('beijingFinance'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-cn-beijing-finance-1.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('beijingGov'), 'beijinggov', '北京政务云', '北京政', 'gov', 'beijing', 'cn-north-2-gov-1'],
    display: chrome.i18n.getMessage('beijingGov'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://dmc-cn-north-2-gov-1.data.aliyun.com',
    },
  },
];

const devBizLinks = [
  {
    keywords: [chrome.i18n.getMessage('innerPre'), 'inner', 'pre', '弹内', '预发'],
    display: chrome.i18n.getMessage('innerPre'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://pre-dmc.dw.alibaba-inc.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('innerLocal'), 'inner', 'local', '弹内', '本地'],
    display: chrome.i18n.getMessage('innerLocal'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://local.prod-dmc.alibaba-inc.com:8016',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('innerPreLocal'), 'inner', 'pre', 'local', '弹内', '预发', '本地'],
    display: chrome.i18n.getMessage('innerPreLocal'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://local.pre-dmc.alibaba-inc.com:8016',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('shanghaiPre'), 'shanghai', 'pre', 'shang', '上海', '预发'],
    display: chrome.i18n.getMessage('shanghaiPre'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://pre-dmc-cn-shanghai.data.aliyun.com',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('shanghaiLocal'), 'shanghai', 'local', 'shang', 'local', '上海', '本地'],
    display: chrome.i18n.getMessage('shanghaiLocal'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://local.prod-dmc-cn-shanghai.data.aliyun.com:8016',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('shanghaiPreLocal'), 'shanghai', 'pre', 'local', 'shang', '上海', '预发', '本地'],
    display: chrome.i18n.getMessage('shanghaiPreLocal'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://local.pre-dmc-cn-shanghai.data.aliyun.com:8016',
    },
  },
  // 其他
  {
    keywords: [chrome.i18n.getMessage('onebox'), 'onebox'],
    display: chrome.i18n.getMessage('onebox'),
    urlMap: {
      [chrome.i18n.getMessage('dataMap')]: 'https://bear.onebox.alibaba-inc.com/#/projects/167',
    },
  },
  {
    keywords: [chrome.i18n.getMessage('oneboxPrivateEnvLink'), 'onebox-private', 'private'],
    display: chrome.i18n.getMessage('oneboxPrivateEnvLink'),
    urlMap: {
      [chrome.i18n.getMessage('dataWorks')]: 'https://bear.onebox.alibaba-inc.com/#/private-cloud?product_line=dataworks',
    },
  },
];

const products = [
  { keywords: [chrome.i18n.getMessage('dataMap'), 'map', '地图'], content: chrome.i18n.getMessage('dataMap'), description: chrome.i18n.getMessage('dataMap') },
];

const intersection = (array1 = [], array2 = []) => {
  const _array2 = array2?.map?.((obj) => obj?.toLowerCase ? obj?.toLowerCase?.() : obj);
  return array1?.filter?.(value => {
    const _value = value?.toLowerCase ? value?.toLowerCase?.() : value;
    return _array2?.includes?.(_value);
  }) || [];
}

/** list array2 not intersected items */
const notIntersection = (array1 = [], array2 = []) => {
  const inter = intersection(array1, array2);
  let result = [];

  const _inter = inter?.map?.((obj) => obj?.toLowerCase ? obj?.toLowerCase?.() : obj);

  if (_inter?.length > 0) {
    array2?.forEach?.(value => {
      const _value = value?.toLowerCase ? value?.toLowerCase?.() : value;
      if (!_inter?.includes?.(_value)) {
        result?.push?.(value);
      }
    });
  } else {
    result = [...array2];
  }
  return result;
}

// default suggestion
chrome.omnibox.onInputStarted.addListener(async function () {
  chrome.omnibox.setDefaultSuggestion({
    description: chrome.i18n.getMessage('inputTableNameTip'),
  });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    currentTabId = tabs?.[0]?.id;
  });
});

let tempText;

const onInputChange = async function (text, suggest) {

  if (!text) {
    suggest([]);
    return;
  }

  const textArr = text?.toLowerCase?.()?.split?.(' ') || [];

  const set = new Set<{ content: string; description: string; deletable?: boolean; searchedCounts?: number }>();

  const getDescription = (content: string, url: string, regionDisplay?: string) => {
    if (regionDisplay && doNotShowUrlList?.includes?.(regionDisplay)) return content;
    if (regionDisplay && doNotDecorateDescriptionList?.includes?.(regionDisplay)) return `${content} ${url}`;
    return `${content} <url>${url}</url>`;
  }

  const calMatch = (str: string, keyword: string) => {
    let result = str;
    try {
      if (!keyword) return str;
      let _keyword = keyword?.trim?.();
      result = str?.replaceAll ? str?.replaceAll?.(_keyword, `<match><dim>${_keyword}</dim></match>`) : str;
    } catch (e) {
      // may happen url is not formatted
    }
    return result;
  }

  const allBizLinks = bizLinks.concat(devBizLinks);

  allBizLinks.forEach(region => {
    products.forEach(product => {
      if (!region?.urlMap?.[product.content]) return;
      const searched = intersection((region?.keywords || [])?.concat?.(product?.keywords || []), textArr);
      if (searched?.length > 0) {
        const description = getDescription(`${region.display} ${product.description}`, region.urlMap?.[product.content], region?.display);
        set.add({ content: `${region.display} ${product.content}`, description: calMatch(description, text), searchedCounts: searched?.length || 0 });
      }
    });
  });

  const result: chrome.omnibox.SuggestResult[] = Array.from(set) || [];

  result.sort((a, b) => (b as any)?.searchedCounts - (a as any)?.searchedCounts);
  result?.forEach?.((item: any) => delete item?.searchedCounts); // remove searchedCounts

  suggest(result);

  tempText = text;

};

const getRegionByInput = (textArr: string[] = []) => {
  let region = defaultRegion;
  let restVars: string[] = textArr || [];

  let matches = 0;
  let temp = 0;

  let keywords = ['inner', '弹内'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'inner';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['shang', 'shanghai', 'cn-shanghai', '上海'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'cn-shanghai';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['bei', 'beijing', 'cn-beijing', '北京'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'cn-beijing';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['shen', 'shenzhen', 'cn-shenzhen', '深圳'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'cn-shenzhen';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['hang', 'hangzhou', 'cn-hangzhou', '杭州'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'cn-hangzhou';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['cheng', 'chengdu', 'cn-chengdu', '成都'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'cn-chengdu';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['zhang', 'zhangjiakou', 'cn-zhangjiakou', '张家口'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'cn-zhangjiakou';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['wulan', 'wulanchabu', 'cn-wulanchabu', '乌兰察布'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'cn-wulanchabu';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['hong', 'hongkong', 'cn-hongkong', '香港'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'cn-hongkong';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['tokyo', 'japan', 'ap-northeast-1', '日本', '东京'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'ap-northeast-1';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['sin', 'singapore', , 'ap-southeast-1', '新加坡'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'ap-southeast-1';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['syn', 'aus', 'sydney', 'ap-southeast-2', '澳洲', '悉尼'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'ap-southeast-2';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['mala', 'kuala Lumpur', 'ap-southeast-3', '马来', '吉隆坡'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'ap-southeast-3';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['indo', 'jakarta', 'ap-southeast-5', '印尼', '雅加达'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'ap-southeast-5';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['us', 'virginia', 'us-east-1', '美东', '美国', '弗吉尼亚'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'us-east-1';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['us', 'silicon valley', 'us-west-1', '美西', '美国', '硅谷'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'us-west-1';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['eu', 'england', 'london', 'eu-west-1', '英国', '伦敦'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'eu-west-1';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['eu', 'germany', 'frankfurt', 'eu-central-1', '德国', '法兰克福'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'eu-central-1';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['india', 'mumbai', 'ap-south-1', '印度', '孟买'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'ap-south-1';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['me', 'dubai', 'me-east-1', '阿联酋', '迪拜'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'me-east-1';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['shanghai-finance', 'cn-shanghai-finance-1', '上海金融云', '上海金'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'cn-shanghai-finance-1';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['shenzhen-finance', 'cn-shenzhen-finance-1', '深圳金融云', '深圳金'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'cn-shenzhen-finance-1';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['beijing-gov', 'cn-north-2-gov-1', '北京政务云', '北京政'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    region = 'cn-north-2-gov-1';
    restVars = notIntersection(keywords, textArr);
  }

  return { region, restVars };
};

const getTypeByInput = (textArr: string[] = []) => {
  let type: TableType = defaultTableType;
  let restVars: string[] = textArr || [];

  let matches = 0;
  let temp = 0;

  let keywords = ['odps', 'maxcompute', 'mc'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    type = 'ODPS';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['emr', 'hive', 'hbase'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    type = 'emr';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['hologres', 'holo', 'holodb'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    type = 'holodb';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['pg', 'postgresql', 'postgres'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    type = 'postgresql';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['mysql'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    type = 'mysql';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['hbase'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    type = 'hbase';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['ots'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    type = 'ots';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['cdh'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    type = 'cdh';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['sqlserver'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    type = 'sqlserver';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['analyticdb_for_mysql'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    type = 'analyticdb_for_mysql';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['hybriddb_for_postgresql'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    type = 'hybriddb_for_postgresql';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['ads'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    type = 'ads';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['dlf'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    type = 'dlf';
    restVars = notIntersection(keywords, textArr);
  }

  keywords = ['oracle'];
  temp = intersection(textArr, keywords)?.length;
  if (temp > matches) {
    type = 'oracle';
    restVars = notIntersection(keywords, textArr);
  }

  return { type, restVars };
};

// https://developer.chrome.com/docs/extensions/get-started/tutorial/service-worker-events
chrome.omnibox.onInputChanged.addListener(onInputChange);

chrome.omnibox.onInputEntered.addListener(async function (text, disposition) {

  const textArr = text?.split?.(' ');

  let link;

  const allBizLinks = bizLinks.concat(devBizLinks);

  allBizLinks.findIndex(region => {
    return products?.findIndex?.(product => {
      const content = `${region.display} ${product.content}`;
      if (text?.toLowerCase?.() === content?.toLowerCase?.()) {
        link = region?.urlMap?.[product?.content];
        if (link) return true;
      }
    }) !== -1;
  });

  if (link) {
    chrome?.tabs?.create?.({ url: link });
    return;
  }

  const filter1 = getRegionByInput(textArr);
  const region = filter1?.region;
  let restVars = filter1?.restVars;
  defaultRegion = region; // set current region into default value

  const filter2 = getTypeByInput(restVars);
  const type = filter2?.type;
  restVars = filter2?.restVars;
  defaultTableType = type; // set current table type into default value

  const keyword = textArr?.length > 0 ? restVars?.join?.(' ') : text;

  const dmcHomeEndpoint = getDmcHomeEndpoint(region);
  const entityType = getDmcTablePrefix(type);

  chrome?.tabs?.create?.({ url: `${dmcHomeEndpoint}/search?entityType=${entityType}&keyword=${keyword}` }); // default

});

