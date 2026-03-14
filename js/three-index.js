// Three.js - Landing Page 3D Animation
let scene, camera, renderer, particles, particleGeo, particleMat;

function initThree() {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    // Create particles
    particleGeo = new THREE.BufferGeometry();
    const particleCount = 2000;
    const posArray = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleMat = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x0b93f6,
        transparent: true,
        opacity: 0.8
    });
    
    particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    
    // Add rotating cube
    const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
    const cubeMat = new THREE.MeshBasicMaterial({ color: 0x0b93f6, wireframe: true });
    const cube = new THREE.Mesh(cubeGeo, cubeMat);
    cube.position.set(0, 0, -2);
    scene.add(cube);
    
    camera.position.z = 3;
    
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    
    if (particles) {
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;
    }
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

if (typeof THREE !== 'undefined') {
    initThree();
    window.addEventListener('resize', onWindowResize);
}
