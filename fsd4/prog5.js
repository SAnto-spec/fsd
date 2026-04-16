import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";

inquirer
.prompt([{
    message: "Type in your URL: ", 
    name: "URL"
   }])
  .then((answers) => {
    const url = answers.URL;
    console.log("Your URL is:", url);
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('test_qr_image.png'));

    fs.writeFile('sample.txt', url, (err) => {
       if (err) throw err;
       console.log('The file has been saved!');
});
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
