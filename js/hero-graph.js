(function () {
  'use strict';
  var canvas = document.getElementById('hero-canvas');
  var hero = document.getElementById('hero');
  if (!canvas || !hero || typeof THREE === 'undefined') return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.innerWidth < 768) {
    canvas.style.display = 'none';
    return;
  }

  var w = hero.clientWidth, h = hero.clientHeight;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 1000);
  camera.position.z = 24;
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  var group = new THREE.Group();
  scene.add(group);

  var NODE_COUNT = 34;
  var nodePositions = [];
  var nodeMeshes = [];
  var nodeGeo = new THREE.SphereGeometry(0.13, 8, 8);
  var nodeMatMain = new THREE.MeshBasicMaterial({ color: 0xff6a2b, transparent: true, opacity: 0.85 });
  var nodeMatDim = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 });

  for (var i = 0; i < NODE_COUNT; i++) {
    var radius = 10 + Math.random() * 5;
    var theta = Math.random() * Math.PI * 2;
    var phi = Math.acos((Math.random() * 2) - 1);
    var x = radius * Math.sin(phi) * Math.cos(theta);
    var y = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
    var z = radius * Math.cos(phi);
    var isMain = Math.random() > 0.82;
    var mesh = new THREE.Mesh(nodeGeo, isMain ? nodeMatMain : nodeMatDim);
    mesh.position.set(x, y, z);
    mesh.userData.phase = Math.random() * Math.PI * 2;
    mesh.userData.isMain = isMain;
    group.add(mesh);
    nodeMeshes.push(mesh);
    nodePositions.push(new THREE.Vector3(x, y, z));
  }

  var lineMat = new THREE.LineBasicMaterial({ color: 0x8a5a3a, transparent: true, opacity: 0.18 });
  for (var a = 0; a < nodePositions.length; a++) {
    for (var b = a + 1; b < nodePositions.length; b++) {
      if (nodePositions[a].distanceTo(nodePositions[b]) < 6.5) {
        var geo = new THREE.BufferGeometry().setFromPoints([nodePositions[a], nodePositions[b]]);
        group.add(new THREE.Line(geo, lineMat));
      }
    }
  }

  var mouseX = 0, mouseY = 0;
  hero.addEventListener('mousemove', function (e) {
    var rect = hero.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / w) - 0.5;
    mouseY = ((e.clientY - rect.top) / h) - 0.5;
  });

  window.addEventListener('resize', function () {
    w = hero.clientWidth; h = hero.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  var clock = new THREE.Clock();
  function renderFrame() {
    var t = clock.getElapsedTime();
    group.rotation.y += prefersReducedMotion ? 0 : 0.0018;
    group.rotation.x += (mouseY * 0.3 - group.rotation.x) * 0.03;
    group.rotation.y += (mouseX * 0.15) * 0.01;
    nodeMeshes.forEach(function (m) {
      var s = m.userData.isMain ? (1 + Math.sin(t * 2 + m.userData.phase) * 0.3) : 1;
      m.scale.setScalar(s);
    });
    renderer.render(scene, camera);
  }

  if (prefersReducedMotion) {
    renderFrame();
  } else {
    (function animate() {
      requestAnimationFrame(animate);
      renderFrame();
    })();
  }
})();
