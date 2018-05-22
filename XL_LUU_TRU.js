var fs = require('fs');
var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;
var path_pd = "2-Du_lieu_Luu_tru//Phieudat.xml";
var path = "2-Du_lieu_Luu_tru//database.xml";

function readXML() {
    var xml = fs.readFileSync(path, 'UTF-8');
    var data = new DOMParser().parseFromString(xml, 'text/xml').documentElement;
    return data;
}
function readXMLPD() {
    var xml = fs.readFileSync(path_pd, 'UTF-8');
    var data = new DOMParser().parseFromString(xml, 'text/xml').documentElement;
    return datapd;
}

function writetoXML(data) {
    data = new XMLSerializer().serializeToString(data);
    fs.writeFile(path, data, (err) => {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log('successfully!');
        }
    })
}



function Readmenu(data) {
    var result = new DOMParser().parseFromString("<Du_lieu></Du_lieu>", "text/xml");
    var parent = result.getElementsByTagName("Du_lieu")[0];
    var listorder = data.getElementsByTagName("Mon_an");

    for (let i = 0; i < listorder.length; i++) {
        var newNode = result.createElement("Mon_an");
        newNode.setAttribute("Ten", listorder[i].getAttribute("Ten"));
        newNode.setAttribute("Ma_so", listorder[i].getAttribute("Ma_so"));
        newNode.setAttribute("Don_gia", listorder[i].getAttribute("Don_gia"));
       

        parent.appendChild(newNode);
    }

    return result;
}


module.exports = {
    readXML,
    readXMLPD,
    Readmenu,
    writetoXML
};