export function rectangle(a, b, width, height, padding = 2) {
  if (![a.x,a.y,b.x,b.y,width,height,padding].every(Number.isFinite) || width < 1 || height < 1 || padding < 0) throw new Error('Invalid rectangle');
  const left = Math.max(0, Math.floor(Math.min(a.x,b.x))-padding);
  const top = Math.max(0, Math.floor(Math.min(a.y,b.y))-padding);
  const right = Math.min(width, Math.ceil(Math.max(a.x,b.x))+padding);
  const bottom = Math.min(height, Math.ceil(Math.max(a.y,b.y))+padding);
  if (right <= left || bottom <= top) throw new Error('Rectangle is outside the image');
  return {x:left,y:top,width:right-left,height:bottom-top};
}
export function point(clientX, clientY, bounds, width, height) {
  return {x:Math.max(0,Math.min(width,(clientX-bounds.left)*width/bounds.width)),y:Math.max(0,Math.min(height,(clientY-bounds.top)*height/bounds.height))};
}
export function paint(ctx, image, boxes) {
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  ctx.drawImage(image,0,0);
  ctx.fillStyle = '#111111';
  for (const b of boxes) ctx.fillRect(b.x,b.y,b.width,b.height);
}
