import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import { getDmcHomeEndpoint, getDmcTablePrefix } from '@root/src/shared/utils/request';

import 'webextension-polyfill';

reloadOnUpdate('pages/background');

const selfExtensionId = chrome?.runtime?.id;

let currentTabId;

// default suggestion
chrome.omnibox.onInputStarted.addListener(async function () {
  chrome.omnibox.setDefaultSuggestion({
    description: chrome.i18n.getMessage('inputTableNameTip'),
  });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    currentTabId = tabs?.[0]?.id;
  });
});

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

const onInputChange = async function (text, suggest) {

  if (!text) {
    suggest([]);
    return;
  }

};

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

const getRegionByInput = (textArr: string[] = []) => {
  let region = 'cn-shanghai';
  let restVars: string[] = textArr || [];

  let matches = 0;
  let temp = 0;

  let keywords = ['shang', 'shanghai', 'cn-shanghai', '上海'];
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
  let type: TableType = 'ODPS';
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

  return { type, restVars };
};

// https://developer.chrome.com/docs/extensions/get-started/tutorial/service-worker-events
chrome.omnibox.onInputChanged.addListener(onInputChange);

chrome.omnibox.onInputEntered.addListener(async function (text, disposition) {

  const textArr = text?.split?.(' ');

  const filter1 = getRegionByInput(textArr);
  const region = filter1?.region;
  let restVars = filter1?.restVars;

  const filter2 = getTypeByInput(restVars);
  const type = filter2?.type;
  restVars = filter2?.restVars;

  const keyword = textArr?.length > 0 ? restVars?.join?.(',') : text;

  const dmcHomeEndpoint = getDmcHomeEndpoint(region);
  const entityType = getDmcTablePrefix(type);

  chrome?.tabs?.create?.({ url: `${dmcHomeEndpoint}/search?entityType=${entityType}&keyword=${keyword}` }); // default

});

