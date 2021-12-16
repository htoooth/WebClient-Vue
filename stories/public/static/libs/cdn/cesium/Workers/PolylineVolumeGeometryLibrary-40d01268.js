define(["exports","./Cartesian2-21667d02","./Transforms-9663aff8","./EllipsoidTangentPlane-c3f115df","./Math-e1584698","./PolylinePipeline-8d8b2828","./when-0ac5fc51","./Check-91887fdf"],function(e,R,f,g,O,I,r,a){"use strict";var V=Object.freeze({ROUNDED:0,MITERED:1,BEVELED:2}),n={};function N(e,a){r.defined(n[e])||(n[e]=!0,console.warn(r.defaultValue(a,e)))}N.geometryOutlines="Entity geometry outlines are unsupported on terrain. Outlines will be disabled. To enable outlines, disable geometry terrain clamping by explicitly setting height to 0.",N.geometryZIndex="Entity geometry with zIndex are unsupported when height or extrudedHeight are defined.  zIndex will be ignored",N.geometryHeightReference="Entity corridor, ellipse, polygon or rectangle with heightReference must also have a defined height.  heightReference will be ignored",N.geometryExtrudedHeightReference="Entity corridor, ellipse, polygon or rectangle with extrudedHeightReference must also have a defined extrudedHeight.  extrudedHeightReference will be ignored";var G=[new R.Cartesian3,new R.Cartesian3],H=new R.Cartesian3,L=new R.Cartesian3,j=new R.Cartesian3,Q=new R.Cartesian3,q=new R.Cartesian3,F=new R.Cartesian3,U=new R.Cartesian3,_=new R.Cartesian3,Z=new R.Cartesian3,k=new R.Cartesian3,m=new R.Cartesian3,W={},Y=new R.Cartographic;function J(e,a,r,n){var t=e[0],e=e[1],e=R.Cartesian3.angleBetween(t,e),i=Math.ceil(e/n),s=new Array(i);if(a===r){for(l=0;l<i;l++)s[l]=a;return s.push(r),s}for(var o=(r-a)/i,l=1;l<i;l++)s[l]=a+l*o;return s[0]=a,s.push(r),s}var y=new R.Cartesian3,h=new R.Cartesian3;var p=new R.Cartesian3(-1,0,0),w=new f.Matrix4,x=new f.Matrix4,v=new f.Matrix3,E=f.Matrix3.IDENTITY.clone(),P=new R.Cartesian3,M=new f.Cartesian4,T=new R.Cartesian3;function K(e,a,r,n,t,i,s,o){var l=P,C=M;w=f.Transforms.eastNorthUpToFixedFrame(e,t,w),l=f.Matrix4.multiplyByPointAsVector(w,p,l);var l=R.Cartesian3.normalize(l,l),a=(l=l,a=a,e=e,t=t,t=new g.EllipsoidTangentPlane(e,t),l=t.projectPointOntoPlane(R.Cartesian3.add(e,l,y),y),e=t.projectPointOntoPlane(R.Cartesian3.add(e,a,h),h),a=R.Cartesian2.angleBetween(l,e),0<=e.x*l.y-e.y*l.x?-a:a);v=f.Matrix3.fromRotationZ(a,v),T.z=i,w=f.Matrix4.multiplyTransformation(w,f.Matrix4.fromRotationTranslation(v,T,x),w);var c=E;c[0]=s;for(var u=0;u<o;u++)for(var d=0;d<r.length;d+=3)C=R.Cartesian3.fromArray(r,d,C),C=f.Matrix3.multiplyByVector(c,C,C),C=f.Matrix4.multiplyByPoint(w,C,C),n.push(C.x,C.y,C.z);return n}var l=new R.Cartesian3;function X(e,a,r,n,t,i,s){for(var o=0;o<e.length;o+=3)n=K(R.Cartesian3.fromArray(e,o,l),a,r,n,t,i[o/3],s,1);return n}function $(e,a){for(var r=e.length,n=new Array(3*r),t=0,i=a.x+a.width/2,s=a.y+a.height/2,o=0;o<r;o++)n[t++]=e[o].x-i,n[t++]=0,n[t++]=e[o].y-s;return n}var b=new f.Quaternion,B=new R.Cartesian3,z=new f.Matrix3;function ee(e,a,r,n,t,i,s,o,l,C){var c,u=R.Cartesian3.angleBetween(R.Cartesian3.subtract(a,e,k),R.Cartesian3.subtract(r,e,m)),d=n===V.BEVELED?0:Math.ceil(u/O.CesiumMath.toRadians(5)),g=t?f.Matrix3.fromQuaternion(f.Quaternion.fromAxisAngle(R.Cartesian3.negate(e,k),u/(d+1),b),z):f.Matrix3.fromQuaternion(f.Quaternion.fromAxisAngle(e,u/(d+1),b),z);if(a=R.Cartesian3.clone(a,B),0<d)for(var y=C?2:1,h=0;h<d;h++)a=f.Matrix3.multiplyByVector(g,a,a),c=R.Cartesian3.subtract(a,e,k),c=R.Cartesian3.normalize(c,c),t||(c=R.Cartesian3.negate(c,c)),s=K(i.scaleToGeodeticSurface(a,m),c,o,s,i,l,1,y);else c=R.Cartesian3.subtract(a,e,k),c=R.Cartesian3.normalize(c,c),t||(c=R.Cartesian3.negate(c,c)),s=K(i.scaleToGeodeticSurface(a,m),c,o,s,i,l,1,1),r=R.Cartesian3.clone(r,B),c=R.Cartesian3.subtract(r,e,k),c=R.Cartesian3.normalize(c,c),t||(c=R.Cartesian3.negate(c,c)),s=K(i.scaleToGeodeticSurface(r,m),c,o,s,i,l,1,1);return s}W.removeDuplicatesFromShape=function(e){for(var a=e.length,r=[],n=a-1,t=0;t<a;n=t++){var i=e[n],s=e[t];R.Cartesian2.equals(i,s)||r.push(s)}return r},W.angleIsGreaterThanPi=function(e,a,r,n){n=new g.EllipsoidTangentPlane(r,n),e=n.projectPointOntoPlane(R.Cartesian3.add(r,e,y),y),a=n.projectPointOntoPlane(R.Cartesian3.add(r,a,h),h);return 0<=a.x*e.y-a.y*e.x};var ae=new R.Cartesian3,re=new R.Cartesian3;W.computePositions=function(e,a,r,n,t){var i=n._ellipsoid,s=function(e,a){for(var r=new Array(e.length),n=0;n<e.length;n++){var t=e[n];Y=a.cartesianToCartographic(t,Y),r[n]=Y.height,e[n]=a.scaleToGeodeticSurface(t,t)}return r}(e,i),o=n._granularity,l=n._cornerType,C=(t?function(e,a){var r=e.length,n=new Array(6*r),t=0,i=a.x+a.width/2,s=a.y+a.height/2,o=e[0];n[t++]=o.x-i,n[t++]=0,n[t++]=o.y-s;for(var l=1;l<r;l++){var C=(o=e[l]).x-i,c=o.y-s;n[t++]=C,n[t++]=0,n[t++]=c,n[t++]=C,n[t++]=0,n[t++]=c}return o=e[0],n[t++]=o.x-i,n[t++]=0,n[t++]=o.y-s,n}:$)(a,r),a=t?$(a,r):void 0,c=r.height/2,u=r.width/2,d=e.length,g=[],r=t?[]:void 0,y=H,h=L,f=j,m=Q,p=q,w=F,x=U,v=_,E=Z,P=e[0],M=e[1];m=i.geodeticSurfaceNormal(P,m),y=R.Cartesian3.subtract(M,P,y),y=R.Cartesian3.normalize(y,y),v=R.Cartesian3.cross(m,y,v);var T,v=R.Cartesian3.normalize(v,v),b=s[0],B=s[1];t&&(r=K(P,v,a,r,i,b+c,1,1)),E=R.Cartesian3.clone(P,E),P=M,h=R.Cartesian3.negate(y,h);for(var z=1;z<d-1;z++){var S,A,D=t?2:1,M=e[z+1];P.equals(M)?N("Positions are too close and are considered equivalent with rounding error."):(y=R.Cartesian3.subtract(M,P,y),y=R.Cartesian3.normalize(y,y),f=R.Cartesian3.add(y,h,f),f=R.Cartesian3.normalize(f,f),m=i.geodeticSurfaceNormal(P,m),S=R.Cartesian3.multiplyByScalar(m,R.Cartesian3.dot(y,m),ae),R.Cartesian3.subtract(y,S,S),R.Cartesian3.normalize(S,S),A=R.Cartesian3.multiplyByScalar(m,R.Cartesian3.dot(h,m),re),R.Cartesian3.subtract(h,A,A),R.Cartesian3.normalize(A,A),!O.CesiumMath.equalsEpsilon(Math.abs(R.Cartesian3.dot(S,A)),1,O.CesiumMath.EPSILON7)?(f=R.Cartesian3.cross(f,m,f),f=R.Cartesian3.cross(m,f,f),f=R.Cartesian3.normalize(f,f),S=1/Math.max(.25,R.Cartesian3.magnitude(R.Cartesian3.cross(f,h,k))),(A=W.angleIsGreaterThanPi(y,h,P,i))?(p=R.Cartesian3.add(P,R.Cartesian3.multiplyByScalar(f,S*u,f),p),w=R.Cartesian3.add(p,R.Cartesian3.multiplyByScalar(v,u,w),w),G[0]=R.Cartesian3.clone(E,G[0]),G[1]=R.Cartesian3.clone(w,G[1]),T=J(G,b+c,B+c,o),g=X(I.PolylinePipeline.generateArc({positions:G,granularity:o,ellipsoid:i}),v,C,g,i,T,1),v=R.Cartesian3.cross(m,y,v),v=R.Cartesian3.normalize(v,v),x=R.Cartesian3.add(p,R.Cartesian3.multiplyByScalar(v,u,x),x),l===V.ROUNDED||l===V.BEVELED?ee(p,w,x,l,A,i,g,C,B+c,t):g=K(P,f=R.Cartesian3.negate(f,f),C,g,i,B+c,S,D)):(p=R.Cartesian3.add(P,R.Cartesian3.multiplyByScalar(f,S*u,f),p),w=R.Cartesian3.add(p,R.Cartesian3.multiplyByScalar(v,-u,w),w),G[0]=R.Cartesian3.clone(E,G[0]),G[1]=R.Cartesian3.clone(w,G[1]),T=J(G,b+c,B+c,o),g=X(I.PolylinePipeline.generateArc({positions:G,granularity:o,ellipsoid:i}),v,C,g,i,T,1),v=R.Cartesian3.cross(m,y,v),v=R.Cartesian3.normalize(v,v),x=R.Cartesian3.add(p,R.Cartesian3.multiplyByScalar(v,-u,x),x),l===V.ROUNDED||l===V.BEVELED?ee(p,w,x,l,A,i,g,C,B+c,t):g=K(P,f,C,g,i,B+c,S,D)),E=R.Cartesian3.clone(x,E),h=R.Cartesian3.negate(y,h)):(g=K(E,v,C,g,i,b+c,1,1),E=P),b=B,B=s[z+1],P=M)}G[0]=R.Cartesian3.clone(E,G[0]),G[1]=R.Cartesian3.clone(P,G[1]),T=J(G,b+c,B+c,o),g=X(I.PolylinePipeline.generateArc({positions:G,granularity:o,ellipsoid:i}),v,C,g,i,T,1),t&&(r=K(P,v,a,r,i,B+c,1,1));d=g.length,a=t?d+r.length:d,a=new Float64Array(a);return a.set(g),t&&a.set(r,d),a},e.CornerType=V,e.PolylineVolumeGeometryLibrary=W,e.oneTimeWarning=N});
