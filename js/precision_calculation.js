/*
 * This function calculates a measurement for how precise
 * the eye tracker currently is which is displayed to the user
 */
function calculatePrecision(past50Array) {
  var windowHeight = $(window).height();
  var windowWidth = $(window).width();

  // Retrieve the last 50 gaze prediction points
  var x50 = past50Array[0];
  var y50 = past50Array[1];

  // Calculate the position of the point the user is staring at
  var staringPointX = windowWidth / 2;
  var staringPointY = windowHeight / 2;

  var precisionPercentages = new Array(50);
  calculatePrecisionPercentages(precisionPercentages, windowHeight, x50, y50, staringPointX, staringPointY);
  var precision = calculateAverage(precisionPercentages);

  // Return the precision measurement as a rounded percentage
  return Math.round(precision);
};

/*
 * Calculate percentage accuracy for each prediction based on distance of
 * the prediction point from the centre point (uses the window height as
 * lower threshold 0%)
 */
function calculatePrecisionPercentages(precisionPercentages, windowHeight, x50, y50, staringPointX, staringPointY) {
  for (x = 0; x < 30; x++) {
    // Calculate distance between each prediction and staring point
    var xDiff = staringPointX - x50[x];
    var yDiff = staringPointY - y50[x];
    var distance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));

    // Calculate precision percentage
    var halfWindowHeight = windowHeight / 2;
    console.log(halfWindowHeight);
    var precision = 0;
    if (distance <= halfWindowHeight && distance > -1) {
      precision = 100 - (distance / halfWindowHeight * 100);
    } else if (distance > halfWindowHeight) {
      precision = 0;
    } else if (distance > -1) {
      precision = 100;
    }

    // Store the precision
    precisionPercentages[x] = precision;
    //console.log("X0 : " + staringPointX + " Y0 : " + staringPointY);
    //console.log("X1 : " + x50[x] + " Y1 : " + y50[x]);
    // console.log(halfWindowHeight);
    // console.log("Distance : " + distance);
    // console.log("Precision : " + precision);
  }
}

function distanceFromCentre(x50, y50, centre_x, centre_y)
{
    var distsum = 0;
    for(x = 0; x < 30; x++)
    {
      var xDiff = centre_x - x50[x];
      var yDiff = centre_y - y50[x];
      var euc_distance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
      distsum += euc_distance;
    }
    return distsum;
}

function calculateAveragePoints(x50, y50)
{
    var sumx = 0;
    var sumy = 0;
    for(i = 0; i < 30; i++)
    {
      sumx += x50[i];
      sumy += y50[i];
    }
    return { meanX : sumx/30 , meanY : sumy/30 };
}

function precisionImage(image_obj, x50, y50)
{
     var rect = image_obj.getBoundingClientRect();
     //console.log(rect.top, rect.right, rect.bottom, rect.left);
     var x1 = rect.left;
     var y1 = rect.top;
     var x2 = rect.right;
     var y2 = rect.bottom;

     //console.log("X1 : " + x1 + " Y1 : " + y1);
     //console.log("X2 : " + x2 + " Y2 : " + y2);

     var count = 0
     for(i = 0; i < 30; i++)
     {
          if((x50[i] >= x1 && x50[i] <= x2) && (y50[i] >= y1 && y50[i] <= y2))
            count++;
     }
     return count;
}

/*
 * Calculates the average of all precision percentages calculated
 */
function calculateAverage(precisionPercentages) {
  var precision = 0;
  for (x = 0; x < 30; x++) {
    precision += precisionPercentages[x];
  }
  precision = precision / 30;
  return precision;
}
