interface ITxnArea {
  txnId: number;
  mktId: number;
  txnCode: string
  txnName: string;
}
interface ICategory {
  /** 分类id */
  cateId?: number;
  cateCode: string;
  /** 分类名称 */
  cateName?: number;
  /** 数据库名称 */
  parentId?: number;
  /** 是否显示 */
  isShow?: boolean;
  orderNo: number;
}
interface ILink {
  linkId?: number;
  link: string;
  lastmod?: Date;
  creatAt?: Date;
  priority: number;
  status?: 'unassigned' | 'queue' | 'pull' | 'parse';
  html?: string;
  code?: string;
}

interface ISubject {

  subId: number;
  subName: string;
  parentId: number;
  subLinkId: number;
  marketId: number;


}
interface IMetaObject {
  /** */

  // /**
  //  * 	主键	int	11		修改删除
  //  */
  // metaId?:number;
  /**
   *  元数据编码	varchar	100		修改删除
   */
  objectCode?: number;
  /**
   * 元数据名称	varchar	50		修改删除
   */
  objectName: string;
  /**	要更新的表	varchar	50	null	修改删除 */
  tableName?: string;

  /** 是否单选	tinyint	1	1	修改删除 */
  isSingle?: boolean;
  /**是否可行内编辑	tinyint	1	0	修改删除 */
  isCelledit: boolean;
  /**是否显示行号	tinyint	1	1	修改删除*/
  isShowNum: boolean;
  /**	是否初始加载数据	tinyint	1	1	修改删除*/
  isFirstLoad?: boolean;
  /** 初始加载过滤条件	varchar	500		修改删除
 */
  filter?: string;
  /**视图查询Sql	varchar	1000		修改删除 */
  querySql?: string;
  /**默认排序字段desc	varchar	200		修改删除 */
  defaultOrder: string;
  /**自定义拦截器	varchar	255		修改删除 */
  bizIntercept?: string;
  /**	拓展配置	varchar	800		修改删除 */
  config: any;
  /**查询分类	varchar	30		修改 */
  groupName: string;

  pkKey: string;
  parentKey?: string;
}
interface IMetaField {
  // fieldId:number;
  /**	表或试图代码	varchar	100		修改删除 */
  objectCode?: number;
  /**主键是否自增	tinyint	1		修改删除 */
  isAuto: boolean;
  /**
   * 控件脚本	varchar	800		修改删除
   */
  express?: string;
  /**	是否可查询	tinyint	1	0	修改删除*/
  isQuery: boolean;
  /**是否可显示	tinyint	1	1	修改删除 */
  isShow: boolean;
  /**	是否可更新	tinyint	1	1	修改删除 */
  isUpdate: boolean;
  /**
   * 	拓展配置	varchar	800		修改删除
   */
  config
  /**
   * 	数据类型	varchar	10		修改删除
   */
  fieldType: string;
  /**
   * 字段名	varchar	20		修改删除
   */
  fieldName: string;
  /**
   * 显示序号	int	4		修改删除
   */
  recno: number;
  /**
   * 预设值
   */
  presetValue: any;
  /**显示宽度 */
  displayWidth: number;
}

interface IMarket {
  mktId?: number;
  mktName?: string;
  telephone?: string;
  province?: string;
  city?: string;
  area?: string;
  lat?: number;
  lng?: number;
  status?: number;
  licenseUrl?: string;
  legalPeson?: string;
  legalPhone?: string;
  gcId?: number;
  menuIds?: string | number[];

}

/**
 * 阿里云上传的图片数据库结构
 */
interface IOSSFile {
  /**自定义 bucket 名字 */
  prefix?: string;
  bucket?: string;
  name?: string;
  url?: string;
  requestUrls?: string[];
  remotePort?: number;
  rt?: number;
  statusCode?: number;
  status?: number;
  remoteAddress?: string;
  size: number;
  shop_id?: number;
}

interface IGroupCompany {
  gcId?: number;
  gcName?: string;
  gcMenuIds?: string | number[];

}


interface IRole {
  roleId?: number;
  roleName?: string;
  // roleType?: number;
  marketId?: number;
  createTime?: Date;
  updateTime?: Date;
  menuIds?: string | number[];
  parentId?: number;

}

interface IEmployee {
  epId?: number;
  epName?: string;
  epUserName?: string;
  password?: string;
  passwordHash?: string;
  createTime?: Date;
  updateTime?: Date;
  menuIds?: string | number[];
  // employeeType?: number;
  roleIds?: string | number[];
  marketId?: number;
  orgId?: number;
  status?: number;

}
