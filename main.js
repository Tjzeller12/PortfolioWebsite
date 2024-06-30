import './style.css';
import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//import { add } from 'three/examples/jsm/libs/tween.module.js';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const zmin = -10;
const zmax = 24;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.layers.enable(0);
camera.layers.enable(1);
const canvas = document.querySelector('#bg');
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 1, -10);

//Sun
function addSun() {
  const geometry = new THREE.IcosahedronGeometry(6,5);
  const material = new THREE.MeshStandardMaterial({ color: 0xFABD05});
  const sun = new THREE.Mesh(geometry, material);
  sun.position.set(0, 20, -100);
  scene.add(sun);
}
addSun();
//Mountains
function addMountains( ) {
  //Mountain 1:
  const mountain1 = new THREE.Mesh(
    new THREE.ConeGeometry(20, 25, 8),
    new THREE.MeshStandardMaterial({ color: 0xEDEDED})
  );
  mountain1.position.set(10, 10, -100);
  scene.add(mountain1);
  //Mountain 2:
  const mountain2 = new THREE.Mesh(
    new THREE.ConeGeometry(20, 35, 8),
    new THREE.MeshStandardMaterial({ color: 0xEDEDED})
  );
  mountain2.position.set(-20, 15, -100);
  scene.add(mountain2);
  //Mountain 3:
  const mountain3 = new THREE.Mesh(
    new THREE.ConeGeometry(20, 30, 8),
    new THREE.MeshStandardMaterial({ color: 0xEDEDED})
  );
  mountain3.position.set(30, 10, -100);
  scene.add(mountain3);
  //Mountain 4:
  const mountain4 = new THREE.Mesh(
    new THREE.ConeGeometry(20, 25, 8),
    new THREE.MeshStandardMaterial({ color: 0xEDEDED})
  );
  mountain4.position.set(-30, 10, -100);
  scene.add(mountain4);
  //Mountain 5:
  const mountain5 = new THREE.Mesh(
    new THREE.ConeGeometry(20, 25, 8),
    new THREE.MeshStandardMaterial({ color: 0xEDEDED})
  );
  mountain5.position.set(40, 10, -100);
  scene.add(mountain5);
  //Mountain 6:
  const mountain6 = new THREE.Mesh(
    new THREE.ConeGeometry(20, 17, 8),
    new THREE.MeshStandardMaterial({ color: 0xEDEDED})
  );
  mountain6.position.set(-40, 10, -100);
  scene.add(mountain6);
  //Mountain 7:
  const mountain7 = new THREE.Mesh(
    new THREE.ConeGeometry(30, 25, 8),
    new THREE.MeshStandardMaterial({ color: 0xEDEDED})
  );
  mountain7.position.set(60, 10, -100);
  scene.add(mountain7);
  //Mountain 8:
  const mountain8 = new THREE.Mesh(
    new THREE.ConeGeometry(22, 20, 8),
    new THREE.MeshStandardMaterial({ color: 0xEDEDED})
  );
  mountain8.position.set(-60, 10, -100);
  scene.add(mountain8);
  //Mountain 9:
  const mountain9 = new THREE.Mesh(
    new THREE.ConeGeometry(20, 15, 8),
    new THREE.MeshStandardMaterial({ color: 0xEDEDED})
  );
  mountain9.position.set(80, 5, -100);
  scene.add(mountain9);
}
addMountains();

function addGround() {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshStandardMaterial({ color: 0xEDEDED})
  );
  ground.receiveShadow = true;

  ground.rotation.x = -Math.PI/2;
  ground.position.y = -.5;
  ground.position.z = -115;
  scene.add(ground);
  const hill = new THREE.Mesh(new THREE.CylinderGeometry(50, 50, 200, 20), new THREE.MeshStandardMaterial({color: 0xEDEDED}));
  hill.receiveShadow = true;
  hill.position.set(0, -50.5, -15);
  hill.rotation.x = Math.PI / 2;
  hill.rotation.z = Math.PI / 2;
  scene.add(hill);

  const hill2 = new THREE.Mesh(new THREE.CylinderGeometry(25, 25, 200, 20), new THREE.MeshStandardMaterial({color: 0xEDEDED}));
  hill2.position.set(0, -25.5, 15);
  hill2.rotation.x = Math.PI / 2;
  hill2.rotation.z = Math.PI / 2;
  scene.add(hill2);
}
addGround();

function addWater() {
  //add reflection with reflector
  const water = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshStandardMaterial({color: 0x7067f5, transparent: true, opacity: 0.75}));
  water.rotation.x = -Math.PI / 2;
  water.position.y = -2;
  scene.add(water);
}
addWater();


const fishBody = new THREE.Mesh(new THREE.CapsuleGeometry(.45, .65, 2, 4 ), new THREE.MeshStandardMaterial({color: 0x02b860}));
const points = [];
for ( let i = 0; i < 11; i++) {
  points.push( new THREE.Vector2( Math.sin( i * 0.05 ) * 0.5 + 0.2, ( i - .00005 ) * .11 ));
}
const fishTail = new THREE.Mesh(new THREE.LatheGeometry(points), new THREE.MeshStandardMaterial({color: 0x02b860}));
const fishEye = new THREE.Mesh(new THREE.SphereGeometry(.1, 8, 8), new THREE.MeshStandardMaterial({color: 0x000000}));
fishBody.position.set(-5, -2.5, 0);
fishTail.position.set(-5.15, -2.5, 0);
fishTail.rotation.z = Math.PI / 2;
fishBody.rotation.x = Math.PI / 2;
fishBody.rotation.z = Math.PI / 2;
fishEye.position.set(-4.65, -2.26, .43);
scene.add(fishBody);
scene.add(fishTail);
scene.add(fishEye);

//Add second fish
const fishBody2 = new THREE.Mesh(new THREE.CapsuleGeometry(.45, .65, 2, 4 ), new THREE.MeshStandardMaterial({color: 0x02b860}));
const fishTail2 = new THREE.Mesh(new THREE.LatheGeometry(points), new THREE.MeshStandardMaterial({color: 0x02b860}));
const fishEye2 = new THREE.Mesh(new THREE.SphereGeometry(.1, 8, 8), new THREE.MeshStandardMaterial({color: 0x000000}));
fishBody2.position.set(-5 - 6, -2.5, 0 + 1.5);
fishTail2.position.set(-5.15 - 6, -2.5, 0 + 1.5);
fishTail2.rotation.z = Math.PI / 2;
fishBody2.rotation.x = Math.PI / 2;
fishBody2.rotation.z = Math.PI / 2;
fishEye2.position.set(-4.65 - 6, -2.26, .43 + 1.5);
scene.add(fishBody2);
scene.add(fishTail2);
scene.add(fishEye2);


function addTree() {
  const randomX = getRandomInt(-100, 100);
  const randomZ = getRandomInt(-100, -15);
  const randomHeight = getRandomInt(2, 3);
  const tree = new THREE.Mesh(
    new THREE.ConeGeometry(1, randomHeight, 8),
    new THREE.MeshStandardMaterial({ color: 0x3D9970})
  );
  
  if(randomHeight == 2) {
    tree.position.set(randomX, 1, randomZ);
  } else {
    tree.position.set(randomX, 1.5, randomZ);
  }
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 1),
    new THREE.MeshStandardMaterial({ color: 0x8B4513})
  );
  trunk.position.set(randomX, 0, randomZ);
  scene.add(tree);
  scene.add(trunk);
}

for(let i = 0; i < 1000; i++) {
  addTree();
}


const pointlight = new THREE.PointLight(0xffffff, 150);
pointlight.position.set(0,20,-88);

//Sun light
const sunLight = new THREE.DirectionalLight(0xffffff, 4.5);
sunLight.layers.set(0);
// After setting up the sunlight
sunLight.position.set(0, 20, -100);
sunLight.castShadow = true;
scene.add(sunLight);

sunLight.shadow.mapSize.width = 1024;
sunLight.shadow.mapSize.height = 1024;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 500;

const ambientlight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientlight);

const lightHelper = new THREE.PointLightHelper(pointlight);
//const gridHelper = new THREE.GridHelper(200, 50);

//const controls = new OrbitControls(camera, renderer.domElement);

//scene.add(lightHelper);
//scene.add(gridHelper);

//Add background
const skyTexture = new THREE.TextureLoader().load('sky.jpg');
scene.background = skyTexture;

scene.add(pointlight);


//Add window
function createWindow() {
  const hfGeometry = new THREE.BoxGeometry(3.5,.25,.25);
  const vfGeometry = new THREE.BoxGeometry(.25,3,.25);
  const material = new THREE.MeshStandardMaterial({color : 0X402400});
  const leftFrame = new THREE.Mesh(vfGeometry, material);
  const rightFrame = new THREE.Mesh(vfGeometry, material);
  const topFrame = new THREE.Mesh(hfGeometry, material);
  const bottomFrame = new THREE.Mesh(hfGeometry, material);
  leftFrame.castShadow = true;
  rightFrame.castShadow = true;
  topFrame.castShadow = true;
  bottomFrame.castShadow = true;
  leftFrame.position.set(-1.7, 1.63, 15);
  rightFrame.position.set(1.7, 1.63, 15);
  topFrame.position.set(0, 3.25, 15);
  bottomFrame.position.set(0, .25, 15);
  scene.add(leftFrame);
  scene.add(rightFrame);
  scene.add(topFrame);
  scene.add(bottomFrame);
}
createWindow();
function createWall(x, y, z, numOfLogs, facingCam) {
  for(let i = 0; i < numOfLogs; i++) {
    const log = new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, 3, 8), new THREE.MeshStandardMaterial({color: 0x664101}));
    log.layers.set(1);
    // After adding a log in the createWall function
    console.log("Log Layer: ", log.layers.mask.toString(2)); // Should output '10' in binary (only layer 1)
    if (!facingCam) {
      log.receiveShadow = true;
    } else {
      log.castShadow = true;
    }
    log.position.set(x, y + i * .5, z);
    log.rotation.x = Math.PI / 2;
    if(facingCam) {
      log.rotation.z = Math.PI / 2;
    }
    scene.add(log);
  }
  
}

//Make ceiling
function makeHouseCeiling() {
  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(10, 8), new THREE.MeshStandardMaterial({color: 0x664101}));
  ceiling.castShadow = true;
  ceiling.position.set(0, 7, 17.5);
  ceiling.rotation.x = Math.PI / 2;
  scene.add(ceiling);

}


//Make floor
function makeHouseFloor() {
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(15, 12), new THREE.MeshStandardMaterial({color: 0x664101}));
  floor.receiveShadow = true;
  floor.position.set(0, -0.5, 20);
  floor.rotation.x = Math.PI / 2;
  floor.rotation.y = Math.PI;
  scene.add(floor);
}
function makeHouse() {
  createWindow();
  createWall(-3.25, -.25, 14.75, 15, true);
  createWall(3.25, -.25, 14.75, 15, true);
  createWall(.5, 3.75, 14.75, 7, true);
  createWall(-.5, 3.75, 14.75, 7, true);
  createWall(.5, -0.25, 14.75, 1, true);
  createWall(-.5, -0.25, 14.75, 1, true);
  createWall(5.15, -.25, 16, 15, false);
  createWall(-5.15, -.25, 16, 15, false);
  createWall(5.15, -.25, 19, 15, false);
  createWall(-5.15, -.25, 19, 15, false);
  createWall(5.15, -.25, 22, 15, false);
  createWall(-5.15, -.25, 22, 15, false);
  //Make plains to block light for walls
  const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial({color: 0x664101}));
  leftWall.castShadow = true;
  leftWall.position.set(-6, 30, 11);
  leftWall.rotation.y = - Math.PI / 4;
  scene.add(leftWall);
  const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 500), new THREE.MeshStandardMaterial({color: 0x664101}));
  rightWall.castShadow = true;
  rightWall.position.set(6, 10, 11);
  rightWall.rotation.y = Math.PI  / 4;
  scene.add(rightWall);

  makeHouseCeiling();
  makeHouseFloor();
}
makeHouse();


//Make desk
function addDesk() {
  const deskLeg1 = new THREE.Mesh(new THREE.CylinderGeometry(.10, .025, 3, 8), new THREE.MeshStandardMaterial({color: 0x522d01}));
  const deskLeg2 = new THREE.Mesh(new THREE.CylinderGeometry(.10, .025, 3, 8), new THREE.MeshStandardMaterial({color: 0x522d01}));
  const deskLeg3 = new THREE.Mesh(new THREE.CylinderGeometry(.10, .025, 3, 8), new THREE.MeshStandardMaterial({color: 0x522d01}));
  const deskLeg4 = new THREE.Mesh(new THREE.CylinderGeometry(.10, .025, 3, 8), new THREE.MeshStandardMaterial({color: 0x522d01}));
  const deskTop = new THREE.Mesh(new THREE.BoxGeometry(2, .15, 3), new THREE.MeshStandardMaterial({color: 0x522d01}));

  deskLeg1.receiveShadow = true;
  deskLeg2.receiveShadow = true;
  deskLeg3.receiveShadow = true;
  deskLeg4.receiveShadow = true;
  deskTop.receiveShadow = true;
  deskLeg1.position.set(2.5, -1, 16);
  deskLeg2.position.set(4, -1, 16);
  deskLeg3.position.set(2.5, -1, 18);
  deskLeg4.position.set(4, -1, 18);
  deskTop.position.set(3.25, .6, 17);
  scene.add(deskTop);
  scene.add(deskLeg1);
  scene.add(deskLeg2);
  scene.add(deskLeg3);
  scene.add(deskLeg4);
}
addDesk();

//Make computer monitor
function addMonitor() {
  const screenTexture = new THREE.TextureLoader().load('screen.png');
  const monitor = new THREE.Mesh(new THREE.BoxGeometry(.2, 1.5, 1.75), new THREE.MeshStandardMaterial({color: 0x000000}));
  const monitorScreen = new THREE.Mesh(new THREE.BoxGeometry(.1, 1.42, 1.67), new THREE.MeshBasicMaterial({map: screenTexture}));
  const monitorStandArm = new THREE.Mesh(new THREE.BoxGeometry(.1, .65, .1), new THREE.MeshStandardMaterial({color: 0x000000}));
  const monitorStandBase = new THREE.Mesh(new THREE.BoxGeometry(.5, .1, .5), new THREE.MeshStandardMaterial({color: 0x000000}));
  monitor.receiveShadow = true;
  monitorScreen.receiveShadow = true;
  monitorStandArm.receiveShadow = true;
  monitorStandBase.receiveShadow = true;
  monitor.position.set(3.25, 1.75, 17.5);
  monitor.rotation.y = Math.PI / 6;
  monitorScreen.position.set(3.19, 1.75, 17.53);
  monitorScreen.rotation.y = Math.PI / 6;
  monitorStandArm.position.set(3.25, .78, 17.5);
  monitorStandArm.rotation.y = Math.PI / 6;
  monitorStandBase.position.set(3.25, .7, 17.5);
  monitorStandBase.rotation.y = Math.PI / 6;
  scene.add(monitor);
  scene.add(monitorScreen);
  scene.add(monitorStandArm);
  scene.add(monitorStandBase);
}
//Make PC
function addPC() {
  const pc = new THREE.Mesh(new THREE.BoxGeometry(1.25, 1.25, .75), new THREE.MeshStandardMaterial({color: 0x000000}));
  pc.position.set(3.15, 1.25, 16);
  scene.add(pc);
}

function addKeyboardAndMouse() {
  //Make keyboard
  const keyboard = new THREE.Mesh(new THREE.BoxGeometry(.3, .1, .8), new THREE.MeshStandardMaterial({color: 0x000000}));
  const keyboardKeys = new THREE.Mesh(new THREE.BoxGeometry(.26, .1, .75), new THREE.MeshStandardMaterial({color: 0x808080}));
  keyboard.position.set(2.5, .7, 17.5);
  keyboardKeys.position.set(2.5, .71, 17.5);
  scene.add(keyboard);
  scene.add(keyboardKeys);
  //add mouse
  const mouse = new THREE.Mesh(new THREE.BoxGeometry(.3, .1, .15), new THREE.MeshStandardMaterial({color: 0x000000}));
  mouse.position.set(2.5, .71, 18.3);
  scene.add(mouse);
}

function addPCSetup() {
  addMonitor();
  addPC();
  addKeyboardAndMouse();
}

addPCSetup();

//Move camera
let lastScrollTop = 0;
function moveCamera() {
  const t = document.documentElement.scrollTop || document.body.scrollTop;
  if(t > lastScrollTop && camera.position.z < zmax) {
    camera.position.z += .7;
    fishBody.position.x += .3;
    fishTail.position.x += .3;
    fishEye.position.x += .3;
    fishBody2.position.x += .5;
    fishTail2.position.x += .5;
    fishEye2.position.x += .5;
  } else if(t < lastScrollTop && camera.position.z > zmin) {
    camera.position.z -= .7;
    fishBody.position.x -= .3;
    fishTail.position.x -= .3;
    fishEye.position.x -= .3;
    fishBody2.position.x -= .5;
    fishTail2.position.x -= .5;
    fishEye2.position.x -= .5;
  }
  lastScrollTop = t <= 0 ? 0 : t;
  
}
window.addEventListener('scroll', moveCamera);

const houselight = new THREE.PointLight(0xffffff, 80);
houselight.position.set(0,5,19);
const houselightHelper = new THREE.PointLightHelper(houselight);
scene.add(houselight);
//scene.add(houselightHelper);

moveCamera();
function animate() {
  requestAnimationFrame(animate);
  //controls.update();

  renderer.render(scene, camera);
}
animate();