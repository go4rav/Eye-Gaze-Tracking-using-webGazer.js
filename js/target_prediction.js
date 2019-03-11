function nearestTarget(xpred,ypred)
{
    var min_dist = 99999999.00;
    var min_point = 100;
    for(i = 1; i <= 9; i++)
    {
        var pt = document.getElementById("Pt" + i);
        var rect = pt.getBoundingClientRect();
        var cx = (rect.left + rect.right)/2;
        var cy = (rect.top + rect.bottom)/2;

        //console.log("Point : "+ i + " CX : " + cx + " CY : " + cy);

        var distance = Math.sqrt((cx - xpred)*(cx - xpred) + (cy - ypred)*(cy - ypred));
        if( min_dist > distance )
        {
            min_dist = distance;
            min_point = i;
        }
    }
    //console.log("Nearest Point : " + min_point);
    return min_point;
}

function nearestTargetPoint(xpred, ypred)
{
  var minDist = 9999999999;
  var minPoint = 100;

  for(i = 1; i <= 9; i++)
    {
        var el = document.getElementById("block" + i);
        var rec = el.getBoundingClientRect();
        var ex = (rec.left + rec.right)/2;
        var ey = (rec.top + rec.bottom)/2;

        //console.log("Point : "+ i + " CX : " + cx + " CY : " + cy);

        var dist = Math.sqrt((ex - xpred)*(ex - xpred) + (ey - ypred)*(ey - ypred));
        if( minDist > dist )
        {
            minDist = dist;
            minPoint = i;
        }
    }
    //console.log("Nearest Point : " + min_point);
    return minPoint;

  /*for(i=1;i<=9;i++)
  {
    var div = document.getElementById("Block"+i);
    var rec = div.getBoundingClientRect();
    if(xpred>rec.left && xpred<rec.right)
    {

        if(ypred>rec.top && ypred < rec.bottom)
        {

            min_point=i;
        }
    }
  }
  return min_point;*/
}

