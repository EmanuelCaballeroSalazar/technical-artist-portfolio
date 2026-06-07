export const fallbackPackageDescription = {
  "Models": [
    {
      "Filename": "meshes/SM_Cornelio_Idle.fbx",
      "Nodes": [
        {
          "Path": "/Cornelio_v01:SM_Cornelio",
          "IsMesh": true,
          "Visible": true
        }
      ],
      "Materials": [
        {
          "Name": "Cornelio_v01:Material.001",
          "PbrParameters": {
            "BaseWeight": null,
            "BaseColor": {
              "Textures": [
                {
                  "Filename": "texturas/SM_Cornelio_BaseColor.png",
                  "Channels": [
                    "R",
                    "G",
                    "B"
                  ],
                  "Inverted": false
                }
              ],
              "Values": []
            },
            "BaseMetalness": {
              "Textures": [
                {
                  "Filename": "texturas/SM_Cornelio_OcclusionRoughnessMetallic.png",
                  "Channels": [
                    "B"
                  ],
                  "Inverted": false
                }
              ],
              "Values": []
            },
            "BaseDiffuseRoughness": null,
            "SpecularWeight": null,
            "SpecularColor": null,
            "SpecularRoughness": {
              "Textures": [
                {
                  "Filename": "texturas/SM_Cornelio_OcclusionRoughnessMetallic.png",
                  "Channels": [
                    "G"
                  ],
                  "Inverted": false
                }
              ],
              "Values": []
            },
            "SpecularRoughnessAnisotropy": null,
            "SpecularIor": null,
            "TransmissionWeight": null,
            "TransmissionColor": null,
            "TransmissionDepth": null,
            "TransmissionScatter": null,
            "TransmissionScatterAnisotropy": null,
            "TransmissionDispersionScale": null,
            "TransmissionDispersionAbbeNumber": null,
            "SubsurfaceWeight": null,
            "SubsurfaceColor": null,
            "SubsurfaceRadius": null,
            "SubsurfaceRadiusScale": null,
            "SubsurfaceScatterAnisotropy": null,
            "CoatWeight": null,
            "CoatColor": null,
            "CoatRoughness": null,
            "CoatRoughnessAnisotropy": null,
            "CoatIor": null,
            "CoatDarkening": null,
            "FuzzWeight": null,
            "FuzzColor": null,
            "FuzzRoughness": null,
            "EmissionLuminance": null,
            "EmissionColor": null,
            "ThinFilmWeight": null,
            "ThinFilmThickness": null,
            "ThinFilmIor": null,
            "GeometryOpacity": null,
            "GeometryThinWalled": null,
            "GeometryNormal": {
              "Textures": [
                {
                  "Filename": "texturas/SM_Cornelio_Normal.png",
                  "Channels": [
                    "R",
                    "G",
                    "B"
                  ],
                  "Inverted": false
                }
              ],
              "Values": []
            },
            "GeometryTangent": null,
            "GeometryCoatNormal": null,
            "GeometryCoatTangent": null
          },
          "MiscParameters": {
            "AmbientOcclusion": {
              "Textures": [
                {
                  "Filename": "texturas/SM_Cornelio_OcclusionRoughnessMetallic.png",
                  "Channels": [
                    "R"
                  ],
                  "Inverted": false
                }
              ],
              "Values": []
            },
            "UtilityMask": null
          }
        }
      ],
      "Lods": [
        {
          "Index": 0,
          "Shapes": [
            "/Cornelio_v01:SM_Cornelio"
          ],
          "VtxCount": 0,
          "TriCount": 0,
          "Aabb": {
            "MinX": 0.0,
            "MinY": 0.0,
            "MinZ": 0.0,
            "MaxX": 0.0,
            "MaxY": 0.0,
            "MaxZ": 0.0,
            "Width": 0.0,
            "Height": 0.0,
            "Depth": 0.0
          }
        }
      ],
      "ShapeVariants": []
    }
  ]
} as const;
