const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfff8ec);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, 400);
document.getElementById("3d-viewer").appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5).normalize();
scene.add(light);

// Load MTL + OBJ
const mtlLoader = new MTLLoader();
mtlLoader.setPath('assets/');
mtlLoader.load('pizza.mtl', (materials) => {
  materials.preload();

  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('assets/');
  objLoader.load('pizza.obj', (object) => {
    object.scale.set(1.5, 1.5, 1.5);
    scene.add(object);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      object.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  }, undefined, (error) => {
    console.error('Errore nel caricamento OBJ:', error);
  });
});
