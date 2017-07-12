/**
 * Created by Iv on 23-May-17.
 */

function getArea(w, h, W, H) {
    let [s1,s2,s3] = [h*w,H*W,
    Math.min(h,H)*Math.min(w,W)];

    return s1 + s2 - s3;
}