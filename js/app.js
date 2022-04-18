import {
    SphereGeometry,
    MeshStandardMaterial,
    DoubleSide,
    Color,
    RepeatWrapping,
    Mesh,
    Vector2,
    TextureLoader,
    
} from 'https://unpkg.com/three@0.137.5/build/three.module.js';

import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.16/+esm';
import BaseExample from './base-example.js';


class ColorMap extends BaseExample {
    constructor(canvas) {
        super(canvas);
        this.createLights(false);
        this.loadTexture();
        this.createMesh();
        requestAnimationFrame(this.render.bind(this));
        this.createControlsGui();
    }

    loadTexture() {
        const textureLoader = new TextureLoader();
        const colorTexture = textureLoader.load("../textures/blocks_color.jpg");
        this.colorMaps = {
            none: null,
            blocks: colorTexture
        };
        this.material = new MeshStandardMaterial({
            map: colorTexture,
            roughness: 0.07
        });
    }

    createMesh() {
        const geometry = new SphereGeometry(0.4);
        const mesh = new Mesh(geometry, this.material);
        mesh.needsUpdate = true;
        this.scene.add(mesh);
    }

    createControlsGui() {
        const colorMapKeys = this.getObjectsKeys(this.colorMaps);
        const gui = new GUI();
        const controls = {
            map: colorMapKeys[1]
        };
        
        gui.add(controls, 'map', colorMapKeys)
            .onChange(this.updateTexture(this.material, 'map', this.colorMaps));
    }
}

class BumpMap extends BaseExample {
    constructor(canvas) {
        super(canvas);
        this.createLights();
        this.loadTexture();
        this.createMesh();
        requestAnimationFrame(this.render.bind(this));
        this.createControlsGui();
    }

    loadTexture() {
        const textureLoader = new TextureLoader();
        const colorTexture = textureLoader.load('../textures/blocks_color.jpg');
        const bumpTexture = textureLoader.load('../textures/blocks_bump.jpg');
        this.bumpMaps = {
            none: null,
            blocks: bumpTexture
        };
        this.material = new MeshStandardMaterial({
            map: colorTexture,
            bumpMap: bumpTexture,
            // bumpScale: 1,
            roughness: 0.07
        });
    }

    createMesh() {
        const geometry = new SphereGeometry(0.4);
        const mesh = new Mesh(geometry, this.material);
        mesh.needsUpdate = true;
        this.scene.add(mesh);
    }

    createControlsGui() {
        const bumpMapKeys = this.getObjectsKeys(this.bumpMaps);
        const gui = new GUI();
        const controls = {
            bumpMap: bumpMapKeys[1]
        };
        
        gui.add(controls, 'bumpMap', bumpMapKeys)
            .onChange(this.updateTexture(this.material, 'bumpMap', this.bumpMaps));
        gui.add(this.material, 'bumpScale', -3, 3);
    }
}



class NormalMap extends BaseExample {
    constructor(canvas) {
        super(canvas);
        this.createLights();
        this.loadTexture();
        this.createMesh();
        requestAnimationFrame(this.render.bind(this));
        this.createControlsGui();
    }

    loadTexture() {
        const textureLoader = new TextureLoader();
        const colorTexture = textureLoader.load('../textures/blocks_color.jpg');
        const normalTexture = textureLoader.load('../textures/blocks_normal.jpg');
        this.normalMaps = {
            none: null,
            blocks: normalTexture
        };
        this.material = new MeshStandardMaterial({
            map: colorTexture,
            normalMap: normalTexture,
            roughness: 0.07
        });
    }

    createMesh() {
        const geometry = new SphereGeometry(0.4);
        const mesh = new Mesh(geometry, this.material);
        mesh.needsUpdate = true;
        this.scene.add(mesh);
    }

    createControlsGui() {
        const normalMapKeys = this.getObjectsKeys(this.normalMaps);
        const gui = new GUI();
        const controls = {
            normalMap: normalMapKeys[1],
            normalScaleX: 1,
            normalScaleY: 1
        };
        gui.add(controls, 'normalMap', normalMapKeys)
            .onChange(this.updateTexture(this.material, 'normalMap', this.normalMaps));
        gui.add(controls, 'normalScaleX', -3, 3)
            .onChange(value => {
                this.material.normalScale.set(controls.normalScaleX, controls.normalScaleY);
            });
        gui.add(controls, 'normalScaleY', -3, 3)
            .onChange(value => {
                this.material.normalScale.set(controls.normalScaleX, controls.normalScaleY);
            });
    }
}

class DisplacementMap extends BaseExample {
    constructor(canvas) {
        super(canvas);
        this.createLights();
        this.loadTexture();
        this.createMesh();
        requestAnimationFrame(this.render.bind(this));
        this.createControlsGui();
    }

    loadTexture() {
        const textureLoader = new TextureLoader();
        const colorTexture = textureLoader.load('../textures/sands_color.jpg');
        const displacementTexture = textureLoader.load('../textures/sands_displacement.png');
        this.displacementMaps = {
            none: null,
            sands: displacementTexture
        };
        this.material = new MeshStandardMaterial({
            map: colorTexture,
            displacementMap: displacementTexture,
            displacementScale: 0.1,
            roughness: 0.07
        });
    }

    createMesh() {
        // Phải tăng số polygon nên không bị xấu ở 2 cực
        const geometry = new SphereGeometry(0.4, 180, 180);
        const mesh = new Mesh(geometry, this.material);
        this.scene.add(mesh);
    }

    createControlsGui() {
        const displacementMapKeys = this.getObjectsKeys(this.displacementMaps);
        const gui = new GUI();
        const controls = {
            displacementMap: displacementMapKeys[1]
        };
        gui.add(controls, 'displacementMap', displacementMapKeys)
            .onChange(this.updateTexture(this.material, 'displacementMap', this.displacementMaps));
        gui.add(this.material, 'displacementScale', -0.5, 0.5);
    }
}

class AlphaMap extends BaseExample {
    constructor(canvas) {
        super(canvas);
        this.createLights(false);
        this.loadTexture();
        this.createMesh();
        requestAnimationFrame(this.render.bind(this));
        this.createControlsGui();
    }

    loadTexture() {
        const textureLoader = new TextureLoader();
        const alphaTexture = textureLoader.load('../textures/alpha_map.png');
        alphaTexture.wrapS = RepeatWrapping;
        alphaTexture.wrapT = RepeatWrapping;
        alphaTexture.repeat.set(8, 8);
        this.alphaMaps = {
            none: null,
            partial: alphaTexture
        };
        this.material = new MeshStandardMaterial({
            alphaMap: alphaTexture,
            roughness: 0.07,
            transparent: true,
            side: DoubleSide
        });
    }

    createMesh() {
        const geometry = new SphereGeometry(0.4);
        const mesh = new Mesh(geometry, this.material);
        mesh.needsUpdate = true;
        this.scene.add(mesh);
    }

    createControlsGui() {
        const alphaMapKeys = this.getObjectsKeys(this.alphaMaps);
        const gui = new GUI();
        const controls = {
            alphaMap: alphaMapKeys[1]
        };
        gui.add(controls, 'alphaMap', alphaMapKeys)
            .onChange(this.updateTexture(this.material, 'alphaMap', this.alphaMaps));
    }
}

class EmissiveMap extends BaseExample {
    constructor(canvas) {
        super(canvas);
        this.createLights();

        // Giảm độ sáng
        this.scene.background = new Color(0x444444);
        // this.pointLight.intensity = 0.4;
        this.scene.remove(this.ambientLight);

        this.loadTexture();
        this.createMesh();
        requestAnimationFrame(this.render.bind(this));
        this.createControlsGui();
    }

    loadTexture() {
        const textureLoader = new TextureLoader();
        const emissiveTexture = textureLoader.load('../textures/lava_emissive.png');
        this.emissiveMaps = {
            none: null,
            lava: emissiveTexture
        };
        this.material = new MeshStandardMaterial({
            emissiveMap: emissiveTexture,
            emissive: 0xFFFFFF,
            roughness: 0.07,
            normalMap: textureLoader.load('../textures/lava_normal.png'),
            normalScale: new Vector2(4, 4)
            // metalnessMap: textureLoader.load('../textures/lava/lava_metalness.png')
        });
    }

    createMesh() {
        const geometry = new SphereGeometry(0.4);
        const mesh = new Mesh(geometry, this.material);
        this.scene.add(mesh);
    }

    createControlsGui() {
        const emissiveMapKeys = this.getObjectsKeys(this.emissiveMaps);
        const gui = new GUI();
        const controls = {
            emissiveMap: emissiveMapKeys[1]
        };
        gui.add(controls, 'emissiveMap', emissiveMapKeys)
            .onChange(this.updateTexture(this.material, 'emissiveMap', this.emissiveMaps));
    }
}
// new ColorMap(document.querySelector('#webglOutput'));
// new BumpMap(document.querySelector('#webglOutput'));
// new NormalMap(document.querySelector('#webglOutput'));
// new DisplacementMap(document.querySelector('#webglOutput'));
// new AlphaMap(document.querySelector('#webglOutput'));
new EmissiveMap(document.querySelector('#webglOutput'));




            
            
            








