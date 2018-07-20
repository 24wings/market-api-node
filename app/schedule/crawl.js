// const Subscription = require('egg').Subscription;
let db = require('../model');
var os = require('os')
module.exports = {
    schedule: {
        interval: '20s', // 1 分钟间隔
        type: 'all', // 指定所有的 worker 都需要执行
    },
    async task(ctx) {

        // let link = await db.link.findOne({ where: { status: "unassigned" } });
        // await db.link.update({ status: 'process' }, { where: { linkId: link.linkId } });
        // if (link) {
        //     link.link = link.link.replace('http:', 'https:')
        //     let res = await ctx.curl(link.link, { dataType: 'text', timeout: 20 * 1000 });
        //     console.log(Object.keys(res))
        //     console.log(Object.keys(res.res))
        //     await db.link.update({ html: res.res.data, status: 'assigned' }, { where: { linkId: link.linkId } })
        //         // console.log(res);
        // } else {
        //     console.info(`已经完结`)
        // }
    }
}