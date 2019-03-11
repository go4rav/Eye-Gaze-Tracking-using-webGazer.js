var prev = 99;
var before=99
var prev_point = 99;
var flag_ques = true;
var imgobj;
var flag = false;
var start_timing = 0;
var start_timing_ques = 0;
var str="";
var flag_download = true;
var id;
var prev;
var sr="";
var st="";
window.onload = function() {
  // var x=[]
//  var y=[]

	
    //start the webgazer tracker
    webgazer.setRegression('weightedRidge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
              store_points_variable();
             if(data == null)   
             {
                  return;
             }

             var xprediction = data.x;
             var yprediction = data.y;
             var blink = data.blink;
             //console.log(window.location.pathname);
             var past50 = get_points();
             var values = calculateAveragePoints(past50[0],past50[1]);
             // console.log(past50[0]);
             // console.log(past50[1]);
             console.log("Mean X : " + values.meanX + " Mean Y : " + values.meanY);
             console.log("X-Prediction : " + xprediction);
             console.log("Y-Prediction : " + yprediction);
             console.log("Blink-Prediction : " + blink);
             xprediction= values.meanX;
             yprediction = values.meanY;
				
			 
			console.log(str);
            if(window.location.pathname == "/main/display.html") {

               var ni = nearestTargetPoint(xprediction,yprediction);
               //console.log("Nearest : " + ni + " X-Pred : " + xprediction + "Y-Pred : " + yprediction);
               if(ni!=before)
               {
                    flag=true;
                    start_timing=clock;
                    console.log("hello");
               }
               if((clock-start_timing)>=1500 && (flag==true))
                {
                    
                    var div=document.getElementById("block"+ni);
                    /*if(div!=null)
                    {

                        div.style.backgroundColor="grey";


                    }*/
                    st += "xprediction: "+xprediction+","+"yprediction: "+yprediction+","+"timestamp:"+clock+","+"Block: block"+ni+"\n";

                    selected(div);
                    flag=false;


                }
                
                
                
                /*var div=document.getElementById("block"+ni);
                if(div!=null)
                {
                    div.style.backgroundColor="blue";
                }*/
                
                before=ni;
               
           }
             
             if(window.location.pathname == "/main/")
             {
                var np = nearestTarget(xprediction, yprediction);
                

                //var image_obj = document.getElementById("Image1");
                //console.log("X-Points : " + past50[0]);
                //console.log("Y-Points : " + past50[1]);
                //var count = precisionImage(image_obj,past50[0],past50[1]);
                // console.log("Count : " + count);

                if(np != prev)
                {
                  var pt = document.getElementById("Pt" + prev);
                //  console.log("Nearest Point : " + prev + " Clock : " + (clock - start_timing));
                  if(pt != null)
                      pt.style.backgroundColor = "red";
                 
                }

               
                var pt = document.getElementById("Pt" + np);
                if(pt != null)
                    pt.style.backgroundColor = "green";
                prev = np;

              }
               /*
             if ( (clock - start_timing) >= 10000)
                  optnclk();
              */
				
            //   // Put the object into storage
            //localStorage.setItem('xval',x);
            //localStorage.setItem('yval',y);

             // console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
             // console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        })
        .begin()
        .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */

    var width = 320;
    var height = 240;
    var topDist = '0px';
    var leftDist = '0px';

    //Set up the webgazer video feedback.
    var setup = function() {
        //Set up video variable to store the camera feedback
        var video = document.getElementById('webgazerVideoFeed');

        //Position the camera feedback to the top left corner.
        video.style.display = 'block';
        video.style.position = 'fixed';
        video.style.top = topDist;
        video.style.left = leftDist;

        //Set up the video feedback box size
        video.width = width;
        video.height = height;
        video.style.margin = '0px';
        video.style.background = '#222222';
        webgazer.params.imgWidth = width;
        webgazer.params.imgHeight = height;

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var overlay = document.createElement('canvas');
        overlay.id = 'overlay';

        //Setup the size of canvas
        overlay.style.position = 'fixed';
        overlay.width = width;
        overlay.height = height;
        overlay.style.top = topDist;
        overlay.style.left = leftDist;
        overlay.style.margin = '0px';

        //Draw the face overlay on the camera video feedback
        var faceOverlay = document.createElement('face_overlay');
        faceOverlay.id = 'faceOverlay';
        faceOverlay.style.position = 'fixed';
        faceOverlay.style.top = '59px';
        faceOverlay.style.left = '117px';
        faceOverlay.style.border = 'solid';

        document.body.appendChild(overlay);
        document.body.appendChild(faceOverlay);

        var canvas = document.getElementById("plotting_canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';

        var cl = webgazer.getTracker().clm;

        //This function draw the face of the user frame.
        function drawLoop() {
            requestAnimFrame(drawLoop);
            overlay.getContext('2d').clearRect(0,0,width,height);
            if (cl.getCurrentPosition()) {
                cl.draw(overlay);
            }
        }
        drawLoop();
    };

    function checkIfReady() {
        if (webgazer.isReady()) {
            setup();
        } else {
            setTimeout(checkIfReady, 100);
        }
    }
    setTimeout(checkIfReady,100);                                                      };

window.onbeforeunload = function() {
    webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
    //window.localStorage.clear(); //Comment out if you want to save data across different sessions
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 *
 */
 function saveFile(sr) {
   var blob = new Blob([sr], {type: "text/plain;charset=utf-8"});
   saveAs(blob, "eyeData.txt");
 }

 function drawCoordinates(colour,x,y){
     var ctx = document.getElementById("plotting_mean").getContext('2d');
     ctx.fillStyle = colour; // Red color
     ctx.beginPath();
     ctx.arc(x, y, 5, 0, Math.PI * 2, true);
     ctx.fill();
 }

function Restart(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    ClearCalibration();
    PopUpInstruction();
    // saveFile(strX);
    // saveFile(strY);
}

function ClearVideoFeed(){
  
  $("#faceOverlay").hide();
  $("#overlay").hide();
  $("#webgazerVideoFeed").hide();
  
}

function clear() {
    
       if(id!=null)
       {
        id.style.backgroundColor = 'gray';
       }
    }


function selected(item)
{
    id=item;
  console.log(st);
  //saveFile(st)
  //$("#but").remove();
    if(id!=null)
    {
    id.style.backgroundColor='blue';
    }
    setTimeout(clear,1000);
}   
