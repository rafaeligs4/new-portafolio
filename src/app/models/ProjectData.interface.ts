export interface ProjectData{
    title: string,
    description: string,
    icon: string,
    repoUrl: string,
    etiquetas: Etiqueta[]
}

export interface Etiqueta {
    nombre: string;
    color?: string;
}