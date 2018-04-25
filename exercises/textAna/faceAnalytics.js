document.getElementById("analyseButton").addEventListener("click", analyze);

function analyze(){
    var sourceImageUrl = document.getElementById("input").value;
    var subscriptionKey = '0ff234aa3c4e459596e2a6ceca4bce81';
    var listAttr = document.getElementById('attributes');

    var reqBody = {
            "url": sourceImageUrl
    };
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

    var params = {
           'returnFaceId': true,
           'returnFaceLandmarks': false,
           'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise',
       };
       // '?returnFaceId=true&returnFaceLandmarks=false&returnFaceLandmarks=true&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
    var myHeader =  new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey
    });

    var printAttr = ((key, i) => {
      // if(i < 1){
      //   console.log('key upstairs', i, key)
      //   i
      // }
      let li = document.createElement("li");
      textnode = document.createTextNode(altkey);
      li.appendChild(textnode);

      return listAttr.appendChild(li);
    })

    var parameters = JSON.stringify(params);
    var initObject = {
        method: 'POST',
        body: JSON.stringify(reqBody, null, 2),
        headers: myHeader,
        url: uriBase + '?returnFaceId=true&returnFaceLandmarks=true&returnFaceLandmarks=true&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
    }
    var request = new Request(initObject.url, initObject);
    fetch(request).then(function(response){
        if(response.ok){
            return response.json();
        }
        else{
            return Promise.reject(new Error(response.statusText));
        }
    }).then(function(response){
      document.querySelector("#sourceImage").src = sourceImageUrl;
        var face = response[0].faceAttributes;
        var hairArray = face.hair.hairColor;
        var keyArray = Object.keys(face);
        var valArray = Object.values(face);
        // var newish = [];
        // hairArray.map((val, x) => {
        //   newish.push(val.confidence);
        //   return newish;
        // })
        if(face.hair.bald >= 0){
          for (var i = 0; i < hairArray.length; i++) {
            if((hairArray[i].confidence == 1) && (i < 2)){
              altkey = 'hair color : ' + hairArray[i].color;
              if(i < 1){
                printAttr(hairArray[i], i);
              }
          } else {
            altkey = 'hair color : ' + hairArray[i].color;
            if(i < 1){
              printAttr(hairArray[i], i);
            }
          }
          }
        }
        keyArray.map((key, i) => {
          if((key === 'age') || (key == 'gender')){
            altkey = key + ' : ' + valArray[i];
            printAttr(key, i);
          }

        })
    }).catch(function(err){
        alert(err);
    });

}
