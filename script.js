// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfff8ec);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
camera.position.z = 2.5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, 400);
document.getElementById("3d-viewer").appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5).normalize();
scene.add(light);

// Load 3D model
const loader = new THREE.OBJLoader();
loader.load(
  'assets/pizza.obj',
  function (object) {
    object.scale.set(1.5, 1.5, 1.5);
    scene.add(object);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      object.rotation.y += 0.01; // rotate
      renderer.render(scene, camera);
    }
    animate();
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    console.error('An error happened while loading the model', error);
  }
);
