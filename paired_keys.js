const exec= require("child_process").exec;
var value = "default"


module.exports.run = function(command, callback) {
  exec("python pairedkeys.py '"+command+"'", function(error, stdout, stderr){ callback(stdout); });
}


// function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

// module.exports.run = async(command) => {
//   await exec("python pairedkeys.py '"+command+"'", (error, stdout, stderr) => {
//     if (error) {
//       console.log(`error: ${error.message}`);
//       return;
//     }
//     if (stderr) {
//       console.log(`stderr: ${stderr}`);
//       return;
//     }
//     console.log(`stdout: ${stdout}`);
//     value = stdout
//     console.log(value)
//     return;
//   });
//   sleep(10000)
//   return value
// }