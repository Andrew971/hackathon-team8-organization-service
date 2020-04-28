var fs = require('fs')
var resolve = require('path').resolve
var join = require('path').join
var cp = require('child_process')
var os = require('os')

// get library path
var lib = resolve(__dirname, process.env.DIR)


function instalPackage (directory) {

  return fs.readdirSync(directory)
  .forEach(function (mod) {
 
    var directoryPath = join(directory, mod)
    console.log('directoryPath',directoryPath)

    if (!fs.existsSync(join(directoryPath, 'package.json'))) {
      
      instalPackage(directoryPath)

    }else {
      var npmCmd = os.platform().startsWith('win') ? 'yarn.cmd' : 'yarn';

      console.log('===Initialization===')
      console.log('directoryPath',directoryPath)

      cp.spawnSync(npmCmd, ['install'], { env: process.env, cwd: directoryPath, stdio: 'inherit' })

      console.log('===Initialization Done ===')


      console.log('===Building Process ===')
      console.log('directoryPath',directoryPath)

      cp.spawnSync(npmCmd, ['run','build'], { env: process.env, cwd: directoryPath, stdio: 'inherit' })

      console.log('===Building Done ===')
    }
    // !aws --profile textras-central codecommit credential-helper $@
})

}


instalPackage(lib)