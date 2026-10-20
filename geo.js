// Branch and company coordinates must both use GCJ-02.
export function validCoordinates(p) {return Array.isArray(p)&&p.length===2&&p.every(Number.isFinite)&&Math.abs(p[0])<=180&&Math.abs(p[1])<=90;}
export function distanceMeters(a,b){
  if(!validCoordinates(a)||!validCoordinates(b))throw new TypeError('Invalid coordinates');
  const r=Math.PI/180,lat1=a[1]*r,lat2=b[1]*r;
  const h=Math.sin((lat2-lat1)/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin((b[0]-a[0])*r/2)**2;
  return 6371008.8*2*Math.atan2(Math.sqrt(Math.min(1,h)),Math.sqrt(Math.max(0,1-h)));
}
export function rankBranches(point,branches){return branches.map(branch=>({...branch,distance:distanceMeters(point,branch.coordinates)})).sort((a,b)=>a.distance-b.distance||a.id-b.id);}
export function formatDistance(m){return m<1000?`${Math.round(m)} 米`:`${(m/1000).toFixed(2)} 公里`;}
// Calibrated against two AMap static map centers at zoom 11 / scale 2.
export function project([lng,lat]){const n=256*2**11;const world=([x,y])=>[(x+180)/360*n,(1-Math.asinh(Math.tan(y*Math.PI/180))/Math.PI)/2*n];const p=world([lng,lat]),c=world([104.060,30.653]);return [1024+(p[0]-c[0])*4,1024+(p[1]-c[1])*4];}
