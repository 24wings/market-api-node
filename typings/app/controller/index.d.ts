// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Dev from '../../../app/controller/dev';
import Employee from '../../../app/controller/employee';
import Rest from '../../../app/controller/rest';
import Tool from '../../../app/controller/tool';
import Web from '../../../app/controller/web';
import CrawlCommon from '../../../app/controller/crawl/common';
import CrawlZbj from '../../../app/controller/crawl/zbj';

declare module 'egg' {
  interface IController {
    dev: Dev;
    employee: Employee;
    rest: Rest;
    tool: Tool;
    web: Web;
    crawl: {
      common: CrawlCommon;
      zbj: CrawlZbj;
    };
  }
}
