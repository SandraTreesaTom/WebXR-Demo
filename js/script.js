import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ARButton } from 'https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js';
    
    let camera, scene, renderer;
    let loader;
    let stats, glbModel, controls;

init();
animate();

function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 40);
    camera.position.set(0, 0, 8);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true; // we have to enable the renderer for webxr
    container.appendChild(renderer.domElement);

    // stats = new Stats();
    // container.appendChild(stats.dom);

    // controls = new OrbitControls(camera, container);
    // controls.maxDistance = 9;
    // controls.maxPolarAngle = THREE.MathUtils.degToRad(90);
    // controls.target.set(0, 0.5, 0);
    // controls.enablePan = false;
    // controls.update();

    var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    // Add a GLTF model to the scene

    loader = new GLTFLoader();
    loader.load('models/house.glb', function (gltf) {
        glbModel = gltf.scene;
        glbModel.scale.set(.1, .1, .1);
        //glbModel.position.z = -10;
        // glbModel.position.set(0, 0, -10);
        glbModel.rotation.set(0, -90, 0);
        scene.add(glbModel);
        console.log("Model added to scene");
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded' );
    },
    function (error) {
        console.error(error);
    }
    );

    document.body.appendChild(ARButton.createButton(renderer));

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    renderer.render(scene, camera);
}