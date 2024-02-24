export interface Pixel {
  name: string;
  areas: PixelCategory[];
  loadingRing: number;
}

export type PixelCategory =
  | "Product Design"
  | "Visual Design"
  | "Motion Design"
  | "Development"
  | "Sound Design"
  | "Hobbies"
  | "Industrial Design"
  | "Electronics"
  | "Languages";

export const PixelCategories: PixelCategory[] = [
  "Product Design",
  "Visual Design",
  "Motion Design",
  "Development",
  "Sound Design",
  "Hobbies",
  "Industrial Design",
  "Electronics",
  "Languages",
];

//prettier-ignore
export const pixels: Pixel[] =
  [
    //"Davinci Resolve", "SQL", "Supabase", "NextJS", "MVC", "OOP", "Git", "Github",
    { name: "Davinci Resolve", areas: ["Motion Design"], loadingRing: 9 }, //0, 0
    { name: "SQL", areas: ["Development"], loadingRing: 8 }, //1, 0
    { name: "Supabase", areas: ["Development"], loadingRing: 8 }, //2, 0
    { name: "NextJS", areas: ["Development"], loadingRing: 7 }, //3, 0
    { name: "MVC", areas: ["Development"], loadingRing: 7 }, //4, 0
    { name: "OOP", areas: ["Development"], loadingRing: 7 }, //5, 0
    { name: "Git", areas: ["Development"], loadingRing: 7 }, //6, 0
    { name: "GitHub", areas: ["Development"], loadingRing: 7 }, //7, 0
    //"Rive", "Adobe After Effects", "C++", "React", "Typescript", "Javascript", "Development", "Testing",
    { name: "Rive", areas: ["Motion Design"], loadingRing: 8 }, //0, 1
    { name: "Adobe After Effects", areas: ["Motion Design"], loadingRing: 7 }, // 1, 1
    { name: "C++", areas: ["Development"], loadingRing: 7 }, // 2, 1
    { name: "React", areas: ["Development"], loadingRing: 6 }, // 3, 1
    { name: "Typescript", areas: ["Development"], loadingRing: 6 }, // 4, 1
    { name: "Javascript", areas: ["Development"], loadingRing: 6 }, // 5, 1
    { name: "Development", areas: ["Development"], loadingRing: 6 }, // 6, 1
    { name: "Testing", areas: ["Development"], loadingRing: 6 }, // 7, 1
    //"Motion Design", "Blender", "Adobe InDesign", "OpenAI API", "Java", "Objective-C", "XCode", "VSCode",
    { name: "Motion Design", areas: ["Motion Design"], loadingRing: 7 }, // 0, 2
    { name: "Blender", areas: ["Visual Design", "Motion Design"], loadingRing: 6 }, // 1, 2
    { name: "Adobe InDesign", areas: ["Visual Design"], loadingRing: 6 }, // 2, 2
    { name: "OpenAI API", areas: ["Development"], loadingRing: 5 }, // 3, 2
    { name: "Java", areas: ["Development"], loadingRing: 5 }, // 4, 2
    { name: "Objective-C", areas: ["Development"], loadingRing: 5 }, // 5, 2
    { name: "XCode", areas: ["Development"], loadingRing: 5 }, // 6, 2
    { name: "VSCode", areas: ["Development"], loadingRing: 5 }, // 7, 2
    //"Branding", "Logo Design", "Gestalt Principles", "Webflow", "Dart", "Swift", "UIKit", "Linear",
    { name: "Branding", areas: ["Visual Design"], loadingRing: 6 }, // 0, 3
    { name: "Logo Design", areas: ["Visual Design"], loadingRing: 8 }, // 1, 3
    { name: "Gestalt Principles", areas: ["Visual Design"], loadingRing: 5 }, // 2, 3
    { name: "Webflow", areas: ["Visual Design", "Product Design"], loadingRing: 4 }, // 3, 3
    { name: "Dart", areas: ["Development"], loadingRing: 4 }, // 4, 3
    { name: "Swift", areas: ["Development"], loadingRing: 4 }, // 5, 3
    { name: "UIKit", areas: ["Development"], loadingRing: 4 }, // 6, 3
    { name: "Linear", areas: ["Development", "Product Design"], loadingRing: 4 }, // 7, 3
    //"Layout Design", "Visual Design", "Conceptual Minimalism", "Framer", "Flutter", "SwiftUI", "Project Management", "Collaboration",
    { name: "Layout Design", areas: ["Visual Design"], loadingRing: 8 }, // 0, 4
    { name: "Visual Design", areas: ["Visual Design"], loadingRing: 5 }, // 1, 4
    { name: "Conceptual Minimalism", areas: ["Visual Design", "Product Design", "Industrial Design"], loadingRing: 4 }, // 2, 4
    { name: "Framer", areas: ["Product Design"], loadingRing: 8 }, // 3, 4
    { name: "Flutter", areas: ["Development"], loadingRing: 3 }, // 4, 4
    { name: "SwiftUI", areas: ["Development", "Product Design"], loadingRing: 3 }, // 5, 4
    { name: "Project Management", areas: ["Product Design"], loadingRing: 3 }, // 6, 4
    { name: "Collaboration", areas: ["Product Design"], loadingRing: 9 }, // 7, 4
    //"Affinity Designer", "Adobe Photoshop", "Adobe Illustrator", "Origami Studio", "Play", "Figma", "Diary Studies", "Field Studies",
    { name: "Affinity Designer", areas: ["Visual Design"], loadingRing: 5 }, // 0, 5
    { name: "Adobe Photoshop", areas: ["Visual Design"], loadingRing: 4 }, // 1, 5
    { name: "Adobe Illustrator", areas: ["Visual Design"], loadingRing: 9 }, // 2, 5
    { name: "Origami Studio", areas: ["Product Design"], loadingRing: 3 }, // 3, 5
    { name: "Play", areas: ["Product Design"], loadingRing: 2 }, // 4, 5
    { name: "Figma", areas: ["Product Design", "Visual Design"], loadingRing: 2 }, // 5, 5
    { name: "Diary Studies", areas: ["Product Design"], loadingRing: 2 }, // 6, 5
    { name: "Field Studies", areas: ["Product Design"], loadingRing: 3 }, // 7, 5
    //"Affinity Photo", "Affinity Publisher", "Tea", "Hobbies", "Protopie", "UI/UX Design", "Human-Centered Design", "Interviews",
    { name: "Affinity Photo", areas: ["Visual Design"], loadingRing: 5 }, // 0, 6
    { name: "Affinity Publisher", areas: ["Visual Design"], loadingRing: 4 }, // 1, 6
    { name: "Tea", areas: ["Hobbies"], loadingRing: 3 }, // 2, 6
    { name: "Hobbies", areas: ["Hobbies"], loadingRing: 2 }, // 3, 6
    { name: "Protopie", areas: ["Product Design"], loadingRing: 1 }, // 4, 6
    { name: "UI/UX Design", areas: ["Product Design"], loadingRing: 1 }, // 5, 6
    { name: "Human-Centered Design", areas: ["Product Design"], loadingRing: 1 }, // 6, 6
    { name: "Interviews", areas: ["Product Design"], loadingRing: 2 }, // 7, 6
    //"CAD Drawing", "Spline", "Rhinoceros", "Magic", "Market Analysis", "Product Design", "HCI", "Descriptive Statistics",
    { name: "CAD Drawing", areas: ["Industrial Design"], loadingRing: 5 }, // 0, 7
    { name: "Spline", areas: ["Industrial Design", "Product Design", "Visual Design", "Motion Design"], loadingRing: 4 }, // 1, 7
    { name: "Rhinoceros", areas: ["Industrial Design"], loadingRing: 3 }, // 2, 7
    { name: "Magic", areas: ["Hobbies"], loadingRing: 2 }, // 3, 7
    { name: "Market Analysis", areas: ["Product Design"], loadingRing: 1 }, // 4, 7
    { name: "Product Design", areas: ["Product Design"], loadingRing: 0 }, // 5, 7
    { name: "HCI", areas: ["Product Design"], loadingRing: 1 }, // 6, 7
    { name: "Descriptive Statistics", areas: ["Product Design"], loadingRing: 2 }, // 7, 7
    //"NURBS Modeling", "Industrial Design", "Design History", "Reading", "Storytelling", "Design Thinking", "Academic Research", "Affinity Diagramming",
    { name: "NURBS Modeling", areas: ["Industrial Design"], loadingRing: 5 }, // 0, 8
    { name: "Industrial Design", areas: ["Industrial Design"], loadingRing: 4 }, // 1, 8
    { name: "Design History", areas: ["Industrial Design", "Product Design", "Visual Design"], loadingRing: 3 }, // 2, 8
    { name: "Reading", areas: ["Hobbies"], loadingRing: 2 }, // 3, 8
    { name: "Storytelling", areas: ["Product Design", "Sound Design", "Visual Design"], loadingRing: 1 }, // 4, 8
    { name: "Design Thinking", areas: ["Product Design"], loadingRing: 1 }, // 5, 8
    { name: "Academic Research", areas: ["Product Design"], loadingRing: 1 }, // 6, 8
    { name: "Affinity Diagramming", areas: ["Product Design"], loadingRing: 2 }, // 7, 8
    //"Polygon Modeling", "Rapid Iterative Prototyping", "3D Printing", "Philosophy", "Field Recording", "Usability Studies", "Focus Groups", "Survey Studies",
    { name: "Polygon Modeling", areas: ["Industrial Design"], loadingRing: 5 }, // 0, 9
    { name: "Rapid Iterative Prototyping", areas: ["Industrial Design", "Development", "Electronics", "Product Design"], loadingRing: 4 }, // 1, 9
    { name: "3D Printing", areas: ["Industrial Design", "Electronics"], loadingRing: 8 }, // 2, 9
    { name: "Philosophy", areas: ["Hobbies"], loadingRing: 3 }, // 3, 9
    { name: "Field Recording", areas: ["Sound Design"], loadingRing: 2 }, // 4, 9
    { name: "Usability Studies", areas: ["Product Design"], loadingRing: 2 }, // 5, 9
    { name: "Focus Groups", areas: ["Product Design"], loadingRing: 2 }, // 6, 9
    { name: "Survey Studies", areas: ["Product Design"], loadingRing: 8 }, // 7, 9
    //"Raspberry Pi", "Electronics", "D&D", "Mixing", "Sound Design", "German", "Google Forms", "Typeform",
    { name: "Raspberry Pi", areas: ["Electronics"], loadingRing: 5 }, // 0, 10
    { name: "Electronics", areas: ["Electronics"], loadingRing: 9 }, // 1, 10
    { name: "D&D", areas: ["Hobbies"], loadingRing: 4 }, // 2, 10
    { name: "Mixing", areas: ["Sound Design"], loadingRing: 3 }, // 3, 10
    { name: "Sound Design", areas: ["Sound Design"], loadingRing: 3 }, // 4, 10
    { name: "German", areas: ["Languages"], loadingRing: 3 }, // 5, 10
    { name: "Google Forms", areas: ["Product Design"], loadingRing: 3 }, // 6, 10
    { name: "Typeform", areas: ["Product Design"], loadingRing: 3 }, // 7, 10
    //"Soldering", "Arduino", "Board Games", "Reaper", "English", "Italian", "Slovenian", "Languages"
    { name: "Soldering", areas: ["Electronics"], loadingRing: 6 }, // 0, 11
    { name: "Arduino", areas: ["Electronics"], loadingRing: 5 }, // 1, 11
    { name: "Board Games", areas: ["Hobbies"], loadingRing: 9 }, // 2, 11
    { name: "Reaper", areas: ["Sound Design"], loadingRing: 4 }, // 3, 11
    { name: "English", areas: ["Languages"], loadingRing: 4 }, // 4, 11
    { name: "Italian", areas: ["Languages"], loadingRing: 4 }, // 5, 11
    { name: "Slovenian", areas: ["Languages"], loadingRing: 4 }, // 6, 11
    { name: "Languages", areas: ["Languages"], loadingRing: 4 }, // 7, 11
  ];
