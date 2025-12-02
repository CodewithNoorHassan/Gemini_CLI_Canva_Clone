const container = document.getElementById('3d-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Mouse position
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});


// Create 3D objects
const objects = [];

// Object 1: Purple Cube
const geometry1 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material1 = new THREE.MeshStandardMaterial({ color: 0x9b59b6, metalness: 0.5, roughness: 0.5 });
const cube = new THREE.Mesh(geometry1, material1);
cube.position.set(-2, -2.5, -5);
objects.push(cube);
scene.add(cube);

// Object 2: Blue Torus
const geometry2 = new THREE.TorusGeometry(0.2, 0.08, 16, 100);
const material2 = new THREE.MeshStandardMaterial({ color: 0x3498db, metalness: 0.5, roughness: 0.5 });
const torus = new THREE.Mesh(geometry2, material2);
torus.position.set(2, -2.5, -5);
objects.push(torus);
scene.add(torus);

// Object 3: Yellow Cone
const geometry3 = new THREE.ConeGeometry(0.2, 0.4, 32);
const material3 = new THREE.MeshStandardMaterial({ color: 0xf1c40f, metalness: 0.5, roughness: 0.5 });
const cone = new THREE.Mesh(geometry3, material3);
cone.position.set(0, -3, -6);
objects.push(cone);
scene.add(cone);

// Object 4: Graduation Cap
const group = new THREE.Group();
const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x8e44ad, metalness: 0.5, roughness: 0.5 });
const topGeometry = new THREE.BoxGeometry(0.6, 0.05, 0.6);
const topMesh = new THREE.Mesh(topGeometry, baseMaterial);
topMesh.position.y = 0.1;
const baseGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.2, 4);
const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
baseMesh.rotation.y = Math.PI / 4;
group.add(topMesh);
group.add(baseMesh);
group.position.set(1, -2.7, -4);
objects.push(group);
scene.add(group);


// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

camera.position.z = 5;

// Animation loop
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    objects.forEach((obj, i) => {
        obj.rotation.y += 0.001 * (i % 2 === 0 ? 1 : -1);
        obj.rotation.x += 0.001 * (i % 2 === 0 ? 1 : -1);
        obj.position.y += Math.sin(elapsedTime + i) * 0.0005;
    });

    // Update camera
    camera.position.x += (mouseX * 0.1 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 0.1 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);


    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});