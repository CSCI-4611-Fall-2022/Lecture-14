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
        
        const baseMeshMaterial = new gfx.MorphMaterial();
        baseMeshMaterial.ambientColor.set(0.5, 0.5, 0.5);
        baseMeshMaterial.diffuseColor.set(0.8, 0.8, 0.8);
        baseMeshMaterial.texture = new Texture(textureFile);
        baseMesh.material = baseMeshMaterial;

        const morphMesh = gfx.ObjLoader.load(morphMeshFile);
        baseMesh.morphTargetPositionBuffer = morphMesh.positionBuffer;
        baseMesh.morphTargetNormalBuffer = morphMesh.normalBuffer;

        this.add(baseMesh);
    }

    setMorphAlpha(morphAlpha: number): void
    {
        this.children.forEach((elem: gfx.Transform3)=>{
            const mesh = elem as gfx.Mesh;
            const material = mesh.material as gfx.MorphMaterial;
            material.morphAlpha = morphAlpha;
        });
    }
}
