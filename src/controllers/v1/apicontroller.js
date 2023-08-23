const axios = require('axios');

// URL y token de autorización
const initialUrl = 'https://echo-serv.tbxnet.com/v1/secret/files';
const fileUrl = 'https://echo-serv.tbxnet.com/v1/secret/file/';
const authorizationToken = 'aSuperSecretKey';

// Función para obtener los archivos iniciales
async function getInitialFiles() {
  try {
    const response = await axios.get(initialUrl, {
      headers: {
        'Authorization': `Bearer ${authorizationToken}`
      }
    });

    return response.data.files;
  } catch (error) {
   console .log(error)
  }
}

// Función para obtener el contenido de un archivo
async function getFileContent(filename) {
  try {
    const response = await axios.get(fileUrl + filename, {
      headers: {
        'Authorization': `Bearer ${authorizationToken}`
      }
    });

    return response.data;
  } catch (error) {
    //console.log(error)
  }
}

// Función principal para manejar las llamadas y retornar los resultados
async function fetchData() {
  try {
    const files = await getInitialFiles();
    const fileContents = [];
    

    for (const filename of files) {
      const content = await getFileContent(filename);
      if(content != undefined){
        
        const objectFiles= convertCSVtoJson(content)
        if(objectFiles.length>0){
            const des={
                file:filename,
                lines:objectFiles
            }
          fileContents.push(des);
        }
        

      }
      
    }

    return fileContents;
  } catch (error) {
    throw error;
  }
}

function  getAllFiles(req,res){

    fetchData()
    .then(result => {
      res.json(result)
    })
    .catch(error => {
      console.error('Error:', error);
    });
    
}

function convertCSVtoJson(csv) {
    const lines = csv.split('\n').slice(1); //Me salto la primera linea
    const jsonLines = [];
  
    for (const line of lines) {
        
      const [file, text, number, hex] = line.split(',');
      if (file && text && number && hex){
        jsonLines.push({
            text: text,
            number: number,
            hex: hex,
          });
      }
      
    }
  
    return jsonLines;
  }
  


module.exports={
    getAllFiles
}
