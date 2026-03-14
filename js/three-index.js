// Three.js - 3D Landing
var scene,camera,renderer,particles;
function initThree(){
    var c=document.getElementById("canvas-container");if(!c)return;
    scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
    renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setSize(innerWidth,innerHeight);c.appendChild(renderer.domElement);
    var g=new THREE.BufferGeometry(),p=new Float32Array(2000*3);
    for(var i=0;i<p.length;i++)p[i]=(Math.random()-0.5)*10;
    g.setAttribute("position",new THREE.BufferAttribute(p,3));
    particles=new THREE.Points(g,new THREE.PointsMaterial({size:0.02,color:0x0b93f6,transparent:true,opacity:0.8}));
    scene.add(particles);camera.position.z=3;animate();
}
function animate(){requestAnimationFrame(animate);if(particles){particles.rotation.y+=0.001;particles.rotation.x+=0.0005;}renderer.render(scene,camera);}
function onResize(){if(camera&&renderer){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);}}
if(typeof THREE!=="undefined"){initThree();addEventListener("resize",onResize);}
