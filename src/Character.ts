import * as gfx from 'gophergfx'
import { Texture } from 'gophergfx';

export class Character extends gfx.Transform3
{
    constructor()
    {
        super();
    }

    loadBodyPart(baseMeshFile: string, morphMeshFile: string, textureFile: string): void
    {
        const baseMesh = gfx.ObjLoader.load(baseMeshFile);
        
        const baseMeshMaterial = new gfx.GouraudMaterial();
        baseMeshMaterial.ambientColor.set(0.5, 0.5, 0.5);
        baseMeshMaterial.diffuseColor.set(0.8, 0.8, 0.8);
        baseMeshMaterial.texture = new Texture(textureFile);
        baseMesh.material = baseMeshMaterial;

        this.add(baseMesh);
    }

    setMorphAlpha(morphAlpha: number): void
    {
        // TO BE IMPLEMENTED
    }
}
