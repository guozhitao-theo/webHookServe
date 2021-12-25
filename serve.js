const Koa = require('koa');
const router = require('koa-router')();
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const app= new Koa();

router.get('/cloudMusic', async function (ctx, next) {
    await lsExample('./cloudMusic.sh')
    ctx.body = "Hello koa"
})
app.use(router.routes())
app.use(router.allowedMethods())
app.use(async ctx => {
    ctx.body = 'Hello World'
})

async function lsExample(location) {
    const { stdout, stderr } = await exec(location);
    console.log('stdout:', stdout);
    console.error('stderr:', stderr);
  }

console.log('webHookServe listening at 3000')
app.listen(3000)