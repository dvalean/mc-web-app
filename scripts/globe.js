const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.getElementById("myCanvas")
const context = canvas.getContext('2d');

const renderer = new THREE.WebGLRenderer(canvas);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(5, 32, 32);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('scripts/images/earthmap1k.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

camera.position.z = 15;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isMouseDown = false;

function onMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

function onMouseDown() {
    isMouseDown = true;
}

function onMouseUp() {
    isMouseDown = false;    
}

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mouseup', onMouseUp);

function animate() {
    requestAnimationFrame(animate);

    if (isMouseDown) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([globe]);
      if (intersects.length > 0) {
        const intersection = intersects[0];
        const rotation = new THREE.Quaternion().setFromUnitVectors(
          camera.position.clone().normalize(),
          intersection.point.clone().normalize()
        );
        camera.quaternion.multiplyQuaternions(rotation, camera.quaternion);
      }
    }

    renderer.render(scene, camera);
}

animate();