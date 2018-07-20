import { Controller } from "egg";
import xml = require('xml2js');

// import URL = require('url');
// import { RoleType, } from '../constant';

import db = require('../../model');



export default class extends Controller {
    listTags() {

    }
    async listShopXmls() {
        let shopXMLUrls = `https://www.zbj.com/baidusitemap/shop.xml`;
        let result = await this.app.curl(shopXMLUrls, { dataType: 'text', timeout: 10 * 1000 });
        let data = await new Promise(resolve => xml.parseString(result.data, (err, data) => {
            if (err) console.error(err);
            resolve(data);
        }));
        this.ctx.body = { ok: true, data };
    }

    async getShopLocByShopXml() {
        let { shopXMLUrl } = this.ctx.request.body;
        shopXMLUrl = (shopXMLUrl as string).replace('http:', 'https:')


        let result = await this.app.curl(shopXMLUrl as string, {
            timeout: 180 * 1000,
            dataType: 'text', headers: {
                'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36`
            }
        });
        console.log(result)
        let data = await new Promise(resolve => {
            xml.parseString(result.data, (err, data) => {
                if (err) console.error(err);
                resolve(data);
            });
        });
        this.ctx.body = { ok: true, data }
    }
    async  addQueue() {
        let { urls } = this.ctx.request.body;
        let exits = await db.link.findAll({ where: { link: { $in: urls } } });
        urls = <string[]>(urls as string[]).filter(url => !exits.find(item => item.link == url));
        let data = await db.link.bulkCreate((urls as string[]).map(url => {
            return {
                link: url,
                lastmod: new Date(),
                priority: 0,
            }
        }));
        this.ctx.body = { ok: true, data };
    }
    async listQueueItems() {
        let { status, page, pageSize } = this.ctx.request.body;
        if (!page) page = 0;
        if (!pageSize) pageSize = 100;
        if (!status) status = 'unassigned';
        let result = await db.link.findAndCountAll({ where: { status } });
        this.ctx.body = { ok: true, data: result };
    }
}