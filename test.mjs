import test from 'node:test';
import assert from 'node:assert/strict';
import {rectangle,point,paint} from './core.js';
for(const [name,a,b,expected] of [
 ['forward',{x:10,y:20},{x:30,y:40},{x:8,y:18,width:24,height:24}],
 ['reverse',{x:30,y:40},{x:10,y:20},{x:8,y:18,width:24,height:24}],
 ['clip left',{x:0,y:0},{x:10,y:10},{x:0,y:0,width:12,height:12}],
 ['clip right',{x:95,y:95},{x:110,y:120},{x:93,y:93,width:7,height:7}],
 ['fractional outward',{x:10.9,y:20.9},{x:30.1,y:40.1},{x:8,y:18,width:25,height:25}]
])test(name,()=>assert.deepEqual(rectangle(a,b,100,100),expected));
test('reject nonfinite',()=>assert.throws(()=>rectangle({x:NaN,y:0},{x:1,y:1},100,100)));
test('reject outside',()=>assert.throws(()=>rectangle({x:200,y:0},{x:201,y:1},100,100)));
test('reject negative padding',()=>assert.throws(()=>rectangle({x:1,y:1},{x:4,y:4},100,100,-2)));
test('scale pointer',()=>assert.deepEqual(point(150,75,{left:50,top:25,width:200,height:100},1000,500),{x:500,y:250}));
test('clip pointer',()=>assert.deepEqual(point(-5,900,{left:0,top:0,width:200,height:100},1000,500),{x:0,y:500}));
test('paint opaque with source first',()=>{const calls=[];const ctx={canvas:{width:100,height:100},clearRect:()=>calls.push('clear'),drawImage:()=>calls.push('image'),fillRect:()=>{assert.equal(ctx.globalAlpha,1);assert.equal(ctx.globalCompositeOperation,'source-over');assert.equal(ctx.fillStyle,'#111111');calls.push('box');}};paint(ctx,{},[{x:1,y:1,width:10,height:10}]);assert.deepEqual(calls,['clear','image','box']);});
