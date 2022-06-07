prediction = "";
Webcam.set({
    width : 350,
    height : 300,
    image_format : 'png',
    png_quality : 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = '<img id = "image_capture" src = "'+data_uri+'"/>'
});
}
console.log('ml5 version :' , ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/IcDO2nVFe/model.json' , modelLoaded);

function modelLoaded(){
    console.log('Model Loaded');
}

function check(){
    img = document.getElementById("image_capture");
    classifier.classify(img , gotResult);
}

function gotResult(error , results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction =  results[0].label;
        speak();
        if(results[0].label == "Amazing"){
            document.getElementById("update_gesture1").innerHTML = "&#128076;";
        }
        else if(results[0].label == "All_the_best"){
            document.getElementById("update_gesture2").innerHTML = "&#128077;";
        }
        else if(results[0].label == "Hi"){
            document.getElementById("update_gesture3").innerHTML = "&#128075;";
        }
        else if(results[0].label == "Good_work"){
            document.getElementById("update_gesture4").innerHTML = "&#128079;";
        }
        else if(results[0].label == "Victory"){
            document.getElementById("update_gesture5").innerHTML = "&#9996;";
        }
        else if(results[0].label == "Yo_bro"){
            document.getElementById("update_gesture6").innerHTML = "&#129304;";
        }
    }
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The prediction is" + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}