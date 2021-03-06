import {
    TorusKnotGeometry,
    MeshToonMaterial,
    Mesh,
    TextureLoader,
    NearestFilter
} from 'https://unpkg.com/three@0.137.5/build/three.module.js';

import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.16/+esm';
import BaseExample from './base-example.js';


class ThreejsExample extends BaseExample {
    constructor(canvas) {
        super(canvas);
        this.createLights();

        const textureLoader = new TextureLoader();
        const threeTone = textureLoader.load('../textures/tone_three.jpg');
        threeTone.minFilter = NearestFilter;
        threeTone.magFilter = NearestFilter;

        const fiveTone = textureLoader.load('../textures/tone_five.jpg');
        fiveTone.minFilter = NearestFilter;
        fiveTone.magFilter = NearestFilter;

        this.gradientMaps = {
            none: null,
            threeTone: threeTone,
            fiveTone: fiveTone
        };
        this.material = new MeshToonMaterial({
            color: 0x049ef4,
            gradientMap: this.gradientMaps.threeTone
        });

        this.createMesh();
        requestAnimationFrame(this.render.bind(this));
        this.createControlsGui();
    }

    createMesh() {
        const geometry = new TorusKnotGeometry(0.2, 0.03, 50, 8);
        const mesh = new Mesh(geometry, this.material);
        this.scene.add(mesh);
    }

    createControlsGui() {
        const gradientMapKeys = this.getObjectsKeys(this.gradientMaps);
        const gui = new GUI();
        const data = {
            gradientMap: gradientMapKeys[1]
        };
        gui.add(data, 'gradientMap', gradientMapKeys)
            .onChange(this.updateTexture(this.material, 'gradientMap', this.gradientMaps));
    }
}


new ThreejsExample(document.querySelector('#webglOutput'));
