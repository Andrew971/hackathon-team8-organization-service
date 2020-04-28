var fs = require('fs')
var resolve = require('path').resolve
var join = require('path').join
var cp = require('child_process')
var os = require('os')

// get library path
var lib = resolve(__dirname, 'build')
console.log(lib)

const lambdaInit =  ()=>  {
  var isIndex = fs.existsSync(join(lib, 'index.js'))
  if(!isIndex) return console.log(isIndex);
  
  console.log('Initialization Starting...');
  cp.spawnSync('npm', ['init','-y'], { env: process.env, cwd: lib, stdio: 'inherit' });
  console.log('Initialization done...');
  console.log('installation Starting...');
  cp.spawnSync('npx', ['-p','node@8.10','npm', 'install','sharp','--build-from-source'], { env: process.env, cwd: lib, stdio: 'inherit' });
  console.log('installation done...');
  console.log('Removing Sharp/Vendor Folder.....');
  cp.spawnSync('rm', ['-r','node_modules/sharp/vendor'], { env: process.env, cwd: lib, stdio: 'inherit' });
  console.log('Removing done...');
  console.log('Docker running...');
  cp.spawnSync('docker', ['run', '--rm', '-v', `${lib}:/var/task`, 'lambci/lambda:build-nodejs8.10'], { env: process.env, cwd: lib, stdio: 'inherit' });
  console.log('Docker done...');
}

lambdaInit()
