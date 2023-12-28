function main()
{
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#globe')});
    renderer.setSize(window.innerWidth, window.innerHeight);

    // create earthGeometry
    const earthGeometry = new THREE.SphereGeometry(0.5,32,32);
    const earthMaterial = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('scripts/textures/earthmap.jpeg'),
        bumpMap: new THREE.TextureLoader().load('scripts/textures/earthbump.jpeg'),
        bumpScale: 0.01,
    });
    const earthMesh = new THREE.Mesh(earthGeometry,earthMaterial);
    scene.add(earthMesh);

    // set ambientlight
    const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientlight);
    // set point light
    const pointerlight =  new THREE.PointLight(0xffffff,0.9);
    // set light position
    pointerlight.position.set(5,3,5);
    scene.add(pointerlight);

    // create cloudGeometry
    const cloudGeometry =  new THREE.SphereGeometry(0.52,32,32);
    const cloudMaterial = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('scripts/textures/earthCloud.png'),
        transparent: true
    });
    const cloudMesh = new THREE.Mesh(cloudGeometry,cloudMaterial);
    scene.add(cloudMesh);

    // create starGeometry
    const starGeometry =  new THREE.SphereGeometry(5,64,64);
    const starMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('scripts/textures/galaxy.png'),
        side: THREE.BackSide
    });

    const starMesh = new THREE.Mesh(starGeometry,starMaterial);
    scene.add(starMesh);

    // Add the camera
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1.7;

    const render = () => {
        renderer.render(scene,camera);
    }
    const animate = () =>{
        requestAnimationFrame(animate);
        render();
    }
    animate();
}

window.onload = main;