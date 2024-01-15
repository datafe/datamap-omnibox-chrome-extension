
export const getDmcHomeEndpoint = (region: string) => {

  let result = 'https://dmc-cn-shanghai.data.aliyun.com/dm';

  try {
    if (!region) return result;
    switch (region) {
      case 'inner':
        result = 'https://dmc.dw.alibaba-inc.com/dm';
        break;
      case 'cn-shanghai':
        result = 'https://dmc-cn-shanghai.data.aliyun.com/dm';
        break;
      case 'cn-beijing':
        result = 'https://dmc-cn-beijing.data.aliyun.com/dm';
        break;
      case 'cn-shenzhen':
        result = 'https://dmc-cn-shenzhen.data.aliyun.com/dm';
        break;
      case 'cn-hangzhou':
        result = 'https://dmc-cn-hangzhou.data.aliyun.com/dm';
        break;
      case 'cn-chengdu':
        result = 'https://dmc-cn-chengdu.data.aliyun.com/dm';
        break;
      case 'cn-zhangjiakou':
        result = 'https://dmc-cn-zhangjiakou.data.aliyun.com/dm';
        break;
      case 'cn-wulanchabu':
        result = 'https://dmc-cn-wulanchabu.data.aliyun.com/dm';
        break;
      case 'cn-hongkong':
        result = 'https://dmc-cn-hongkong.data.aliyun.com/dm';
        break;
      case 'ap-northeast-1':
        result = 'https://dmc-ap-northeast-1.data.aliyun.com/dm';
        break;
      case 'ap-southeast-1':
        result = 'https://dmc-ap-southeast-1.data.aliyun.com/dm';
        break;
      case 'ap-southeast-2':
        result = 'https://dmc-ap-southeast-2.data.aliyun.com/dm';
        break;
      case 'ap-southeast-3':
        result = 'https://dmc-ap-southeast-3.data.aliyun.com/dm';
        break;
      case 'ap-southeast-5':
        result = 'https://dmc-ap-southeast-5.data.aliyun.com/dm';
        break;
      case 'us-east-1':
        result = 'https://dmc-us-east-1.data.aliyun.com/dm';
        break;
      case 'us-west-1':
        result = 'https://dmc-us-west-1.data.aliyun.com/dm';
        break;
      case 'eu-west-1':
        result = 'https://dmc-eu-west-1.data.aliyun.com/dm';
        break;
      case 'eu-central-1':
        result = 'https://dmc-eu-central-1.data.aliyun.com/dm';
        break;
      case 'ap-south-1':
        result = 'https://dmc-ap-south-1.data.aliyun.com/dm';
        break;
      case 'me-east-1':
        result = 'https://dmc-me-east-1.data.aliyun.com/dm';
        break;
      case 'cn-shanghai-finance-1':
        result = 'https://dmc-cn-shanghai-finance-1.data.aliyun.com/dm';
        break;
      case 'cn-shenzhen-finance-1':
        result = 'https://dmc-cn-shenzhen-finance-1.data.aliyun.com/dm';
        break;
      case 'cn-north-2-gov-1':
        result = 'https://dmc-cn-north-2-gov-1.data.aliyun.com/dm';
        break;
    }
  } catch (e) {
    console.error(e);
  }

  return result;
}

export const getDmcTablePrefix = (type: TableType) => {
  let _type = 'odps-table';

  switch (type) {
    case 'ODPS':
      _type = 'odps-table';
      break;
    case 'emr':
      _type = 'emr-table';
      break;
    case 'holodb':
      _type = 'holodb-table';
      break;
  }

  return _type;
}

const getOpenApiEndpoint = (region: string) => {
  let result = 'https://dataworks.cn-shanghai.aliyuncs.com';
  if (!region) return result;
  switch (region) {
    case 'cn-shanghai':
      result = 'https://dataworks.cn-shanghai.aliyuncs.com';
      break;
    case 'cn-beijing':
      result = 'https://dataworks.cn-beijing.aliyuncs.com';
      break;
    case 'cn-shenzhen':
      result = 'https://dataworks.cn-shenzhen.aliyuncs.com';
      break;
    case 'cn-hangzhou':
      result = 'https://dataworks.cn-hangzhou.aliyuncs.com';
      break;
    case 'cn-zhangjiakou':
      result = 'https://dataworks.cn-zhangjiakou.aliyuncs.com';
      break;
    case 'cn-chengdu':
      result = 'https://dataworks.cn-chengdu.aliyuncs.com';
      break;
    case 'cn-wulanchabu':
      result = 'https://dataworks.cn-wulanchabu.aliyuncs.com';
      break;
    case 'cn-hongkong':
      result = 'https://dataworks.cn-hongkong.aliyuncs.com';
      break;
    case 'ap-northeast-1':
      result = 'https://dataworks.ap-northeast-1.aliyuncs.com';
      break;
    case 'ap-southeast-1':
      result = 'https://dataworks.ap-southeast-1.aliyuncs.com';
      break;
    case 'ap-southeast-2':
      result = 'https://dataworks.ap-southeast-2.aliyuncs.com';
      break;
    case 'ap-southeast-3':
      result = 'https://dataworks.ap-southeast-3.aliyuncs.com';
      break;
    case 'ap-southeast-5':
      result = 'https://dataworks.ap-southeast-5.aliyuncs.com';
      break;
    case 'us-east-1':
      result = 'https://dataworks.us-east-1.aliyuncs.com';
      break;
    case 'us-west-1':
      result = 'https://dataworks.us-west-1.aliyuncs.com';
      break;
    case 'eu-west-1':
      result = 'https://dataworks.eu-west-1.aliyuncs.com';
      break;
    case 'eu-central-1':
      result = 'https://dataworks.eu-central-1.aliyuncs.com';
      break;
    case 'ap-south-1':
      result = 'https://dataworks.ap-south-1.aliyuncs.com';
      break;
    case 'me-east-1':
      result = 'https://dataworks.me-east-1.aliyuncs.com';
      break;
    case 'cn-shanghai-finance-1':
      result = 'https://dataworks.cn-shanghai-finance-1.aliyuncs.com';
      break;
    case 'cn-shenzhen-finance-1':
      result = 'https://dataworks.cn-shenzhen-finance-1.aliyuncs.com';
      break;
  }
  return result;
}
