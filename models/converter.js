const fs = require('fs');
const voxToGLTF = require('vox-to-gltf');
 
fs.readFile('monu2.vox', (error, buffer) =>
{
 if(error) throw error;
 
 let gltfData = voxToGLTF(buffer);
 
 fs.writeFile('monu2.gltf', gltfData, (error) => 
 {
   if(error) throw err;
   
   console.log('The file has been saved!');
 });
});