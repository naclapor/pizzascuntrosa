// Non serve più import

const scene = new THREE.Scene();
scene.background = null; // Sfondo trasparente

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight - 100), 0.1, 1000);
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight - 100);

// Cambia appendChild su #canvas-container per rispettare html
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Luci
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const loader = new THREE.GLTFLoader();
let pizza;

loader.load(
  'pizza.glb',
  (gltf) => {
    pizza = gltf.scene;
    pizza.position.set(0, 0, 0);
    pizza.scale.set(1.5, 1.5, 1.5);
    scene.add(pizza);
  },
  undefined,
  (error) => {
    console.error('Errore caricamento modello:', error);
  }
);

function animate() {
  requestAnimationFrame(animate);

  if (pizza) {
    pizza.rotation.x += 0.01;
    pizza.rotation.y += 0.01;
    pizza.rotation.z += 0.01;
  }

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight - 100;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});
