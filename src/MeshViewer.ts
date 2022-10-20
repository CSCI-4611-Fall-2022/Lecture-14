/* Lecture 14
 * CSCI 4611, Fall 2022, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'
import { GUI } from 'dat.gui'
import { Character } from './Character';

export class MeshViewer extends gfx.GfxApp
{
    private cameraControls: gfx.OrbitControls;
    private character: Character;

    // GUI variables
    private morphAlpha: number;
    private morphDirection: number;

    constructor()
    {
        super();

        this.cameraControls = new gfx.OrbitControls(this.camera);
        this.character = new Character();

        this.morphAlpha = 0;
        this.morphDirection = 1;
    }

    createScene(): void 
    {
        // Setup camera
        this.camera.setPerspectiveCamera(60, 1920/1080, .1, 20)
        this.cameraControls.setTargetPoint(new gfx.Vector3(0, 1, 0));
        this.cameraControls.setDistance(3);

        // Set a black background
        this.renderer.background.set(0, 0, 0);
        
        // Create an ambient light
        const ambientLight = new gfx.AmbientLight(new gfx.Color(0.25, 0.25, 0.25));
        this.scene.add(ambientLight);

        // Create a directional light
        const pointLight = new gfx.PointLight(new gfx.Color(1.25, 1.25, 1.25));
        pointLight.position.set(2, 1, 3)
        this.scene.add(pointLight);

        // Create the ground
        const ground = new gfx.BoxMesh(5, 1, 5);
        ground.material.setColor(new gfx.Color(0, 0.5, 0.5));
        ground.position.y = -0.5;
        this.scene.add(ground);

        // Create a simple GUI
        const gui = new GUI();
        gui.width = 200;

        this.character.loadBodyPart(
            './assets/LinkBody1.obj', 
            './assets/LinkBody2.obj', 
            './assets/LinkBody.png'
        );

        this.character.loadBodyPart(
            './assets/LinkEquipment1.obj', 
            './assets/LinkEquipment2.obj', 
            './assets/LinkEquipment.png'
        );

        this.character.loadBodyPart(
            './assets/LinkEyes1.obj', 
            './assets/LinkEyes2.obj', 
            './assets/LinkEyes.png'
        );

        this.character.loadBodyPart(
            './assets/LinkFace1.obj', 
            './assets/LinkFace2.obj', 
            './assets/LinkSkin.png'
        );

        this.character.loadBodyPart(
            './assets/LinkHair1.obj', 
            './assets/LinkHair2.obj', 
            './assets/LinkBody.png'
        );

        this.character.loadBodyPart(
            './assets/LinkHands1.obj', 
            './assets/LinkHands2.obj', 
            './assets/LinkSkin.png'
        );

        this.character.loadBodyPart(
            './assets/LinkMouth1.obj', 
            './assets/LinkMouth2.obj', 
            './assets/LinkBody.png'
        );


        // Add the face model to the scene
        this.scene.add(this.character);

         const morphController = gui.add(this, 'morphAlpha', 0, 1);
         morphController.name('Alpha');
         morphController.onChange((value: number) => { this.character.setMorphAlpha(value); });
    }

    update(deltaTime: number): void 
    {
        const morphSpeed = 0.75;
        const jumpPosition = new gfx.Vector3(0, 0.5, 1);

        this.morphAlpha += morphSpeed * this.morphDirection * deltaTime;

        if(this.morphAlpha >= 0 && this.morphAlpha <= 1)
        {
            this.character.setMorphAlpha(this.morphAlpha);
            this.character.position.lerp(gfx.Vector3.ZERO, jumpPosition, this.morphAlpha);
        }
    
        if(this.morphAlpha < -0.5 || this.morphAlpha > 1.5)
        {
            this.morphDirection *= -1;
            this.morphAlpha = gfx.MathUtils.clamp(this.morphAlpha, -0.5, 1.5);
        }

        // Update the camera orbit controls
        this.cameraControls.update(deltaTime);
    }
}