/* Run with Playwright available: node tests/browser.cjs (Python server on port 8000). */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader']});
 try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.GAME_URL||'http://127.0.0.1:8000/');await page.waitForFunction(()=>!!window.Farm3D);
 assert.equal(await page.locator('#world-canvas').count(),1);
 await page.locator('#roster button').filter({hasText:'Vlam'}).click();await page.locator('#ride').click();
 assert.equal(await page.evaluate(()=>Farm3D.models.get(riding).userData.rider.userData.seated),true);
 assert.equal(await page.evaluate(()=>Farm3D.sun.position.y),65);assert.equal(await page.evaluate(()=>Farm3D.models.get(riding).userData.anatomy),'continuous-surfaces');
 assert.equal(await page.locator('#environment .sun').count(),0);
 const start=await page.evaluate(()=>({angles:Farm3D.angles,x:current().x,y:current().y}));
 const canvas=page.locator('#world-canvas');await canvas.scrollIntoViewIfNeeded();const rect=await canvas.boundingBox();
 await page.mouse.move(rect.x+rect.width/2,rect.y+rect.height/2);await page.mouse.down();await page.mouse.move(rect.x+rect.width/2+100,rect.y+rect.height/2+35,{steps:8});await page.mouse.up();
 const after=await page.evaluate(()=>({angles:Farm3D.angles,x:current().x,y:current().y}));assert.notEqual(after.angles.yaw,start.angles.yaw);assert.equal(after.x,start.x);assert.equal(after.y,start.y);
 await page.mouse.wheel(0,-150);await page.waitForTimeout(150);assert((await page.evaluate(()=>Farm3D.angles.distance))<start.angles.distance);
 await page.locator('#locations button').filter({hasText:'Bos'}).click();await page.evaluate(()=>{for(let i=0;i<40;i++)move(1,0);});await page.waitForTimeout(450);
 assert((await page.evaluate(()=>current().x))>93);await page.waitForFunction(()=>Farm3D.camera.position.x>25,{},{timeout:15000});
 const beforeKey=await page.evaluate(()=>[current().x,current().y]);await canvas.focus();await page.keyboard.down('ArrowUp');await page.waitForTimeout(800);await page.keyboard.up('ArrowUp');assert.notDeepEqual(await page.evaluate(()=>[current().x,current().y]),beforeKey);
 await page.locator('#locations button').filter({hasText:'Stad'}).click();assert.equal(await page.evaluate(()=>scene),'city');assert((await page.evaluate(()=>{let n=0;Farm3D.world.traverse(o=>{if(o.userData.glass)n+=o.count;});return n;}))>50);assert((await page.evaluate(()=>{let n=0;Farm3D.world.traverse(o=>{if(o.userData.shop)n++});return n}))>=3);
 await page.waitForTimeout(500);await page.locator('#field').screenshot({path:'/tmp/city-3d.png'});
 await page.locator('#locations button').filter({hasText:'Park'}).click();assert.equal(await page.evaluate(()=>scene),'park');assert((await page.evaluate(()=>{let n=0;Farm3D.world.traverse(o=>{if(o.userData.glass)n+=o.count;});return n;}))>0);await page.locator('#ride').click();assert.equal(await page.evaluate(()=>Farm3D.models.get('player').visible),true);
 await page.locator('#locations button').filter({hasText:'Boerderij'}).click();await page.locator('#roster button').filter({hasText:'Pluis'}).click();await page.locator('#breed').click();assert.equal(await page.evaluate(()=>animals.length),11);
 await page.locator('#roster button').filter({hasText:'Vlam'}).click();await page.locator('#saddle').selectOption('western');assert.equal(await page.evaluate(()=>current().tack.model),'western');
 await page.locator('#locations button').filter({hasText:'Dressuur'}).click();await page.locator('#ride').click();await page.evaluate(()=>{for(const l of dressageRoute){const [x,y]=letterPoints[l];current().x=x;current().y=y;checkDressage();}render();});assert.match(await page.locator('#notice').innerText(),/Hele dressuurproef voltooid/);
 await page.locator('#locations button').filter({hasText:'Springbak'}).click();await page.locator('#rail-one').fill('#f582bc');await page.locator('#rail-one').dispatchEvent('input');assert.equal(await page.evaluate(()=>course[0].color),'#f582bc');await page.evaluate(()=>{current().x=course[0].x;current().y=course[0].y;doJump()});assert.match(await page.locator('#activity').innerText(),/sprongen: 1/);
 await page.reload();await page.waitForFunction(()=>!!window.Farm3D);assert.equal(await page.evaluate(()=>animals.length),11);assert.equal(await page.evaluate(()=>course[0].color),'#f582bc');
 await page.setViewportSize({width:390,height:844});await page.locator('#locations button').filter({hasText:'Stad'}).click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 assert.deepEqual(errors,[]);console.log('PASS: real 3D, seated rider, sky sun, orbit/zoom, continuous camera-follow travel, held movement, city/park, breeding, saddles, dressage, jumping, persistence, mobile layout');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
