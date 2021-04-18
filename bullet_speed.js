function div(n,d)
{
    q=0
    r=0
    for (i=7;i>=0;i--)
    {
        r=r<<1|(n>>i)&1
        if (r>=d)
        {
            r-=d
            q|=1<<i
        }
    }
    return q;
}

console.log("q",div(100,3))

function calc_prop(x,y)
{
    x=x>>4;
    y=(y+8)>>4;
    if(y==0) return 15;

    s=y;
    d=1;
    while( s<x) 
      {
          s=s+y;
          d++;
      }
    return d;
    
}


bullet_speed = 10; // pixels to travel per frame

target_x_dist = 255;
target_y_dist = 23;

console.log(calc_prop(target_x_dist,target_y_dist))



dist_prop = target_x_dist/target_y_dist;

y_inc = bullet_speed/Math.sqrt(dist_prop*dist_prop+1);
x_inc = y_inc*dist_prop;

console.log(x_inc,y_inc);
