import { Application } from "egg";

module.exports = (app: Application) => {
    let api = {
        parseXml: '/crawl/zbj/list-shop-xmls',
        getShopsByXML: '/crawl/zbj/shop-by-xml',
        addQueue: '/crawl/zbj/add-queue',
        listQueueItems: '/crawl/zbj/listQueueItems'
    }
    let zbj = app.controller.crawl.zbj
    app.router
        .get(api.parseXml, zbj.listShopXmls)
        .post(api.getShopsByXML, zbj.getShopLocByShopXml)
        .post(api.addQueue, zbj.addQueue)
        .post(api.listQueueItems, zbj.listQueueItems)
}