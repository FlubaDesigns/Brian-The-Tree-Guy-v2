const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
test('retains the retired server responses byte for byte as public content',()=>{
  for(const [name,expected] of [['services','3f6eff5a211e13204fdcd9abec59c867ec18da43c44448bc963de4aef0de86e3'],['gallery','37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570']]){
    const bytes=fs.readFileSync('client/public/data/'+name+'.json');
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),expected);
  }
});
test('retains the two old content URLs while deep links use the SPA',()=>{
  const {hosting}=JSON.parse(fs.readFileSync('firebase.json'));
  assert.equal(hosting.public,'dist/public');
  assert.deepEqual(hosting.rewrites,[{source:'/api/services',destination:'/data/services.json'},{source:'/api/gallery',destination:'/data/gallery.json'},{source:'**',destination:'/index.html'}]);
});
