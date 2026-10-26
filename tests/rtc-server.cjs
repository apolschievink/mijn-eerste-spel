/* Local-only signalling + TCP TURN test fixture. It respects Chromium's managed UDP policy.
   Install test dependencies outside the repository and set NODE_PATH; see README.md. */
const net=require('node:net'),dgram=require('node:dgram'),os=require('node:os');
const {PeerServer}=require('peer'),Turn=require('node-turn');
PeerServer({host:'127.0.0.1',port:9000,path:'/farm',allow_discovery:false});
const relay=Object.values(os.networkInterfaces()).flat().find(i=>i.family==='IPv4'&&!i.internal)?.address||'127.0.0.1';
new Turn({listeningPort:3479,listeningIps:['127.0.0.1'],relayIps:[relay],authMech:'long-term',credentials:{farmtest:'localtest'},realm:'farm-local',debugLevel:'ERROR'}).start();
// A loopback TCP-to-UDP framing bridge lets node-turn serve a TURN/TCP client.
net.createServer(socket=>{const udp=dgram.createSocket('udp4');let buffer=Buffer.alloc(0);udp.on('message',data=>{if(socket.destroyed)return;const channel=(data[0]&0xc0)===0x40,pad=channel?(4-data.length%4)%4:0;socket.write(pad?Buffer.concat([data,Buffer.alloc(pad)]):data)});udp.bind(0,'127.0.0.1');socket.on('data',chunk=>{buffer=Buffer.concat([buffer,chunk]);while(buffer.length>=4){const channel=(buffer[0]&0xc0)===0x40,len=buffer.readUInt16BE(2)+(channel?4:20),padded=channel?Math.ceil(len/4)*4:len;if(buffer.length<padded)return;udp.send(buffer.subarray(0,len),3479,'127.0.0.1');buffer=buffer.subarray(padded);}});socket.on('error',()=>{});socket.on('close',()=>udp.close());}).listen(3478,'127.0.0.1',()=>console.log('Local multiplayer test services ready: signalling 9000, TURN/TCP 3478'));
