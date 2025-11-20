export interface Entity {
    id: string;
}

export interface Person extends Entity {
    firstName: string;
    lastName: string;
}

export interface Student extends Person {
    age: number;
    classCode: string;
}

export enum Subject {
    Art = 'Art',
    English = 'English',
    History = 'History',
    InformationTechnology = 'Information Technology',
    Mathematics = 'Mathematics',
    Music = 'Music',
    Science = 'Science'
}

export interface Teacher extends Person {
    subject: Subject;
}

export interface Column<T = any> {
    key: keyof T;
    label: string;
    type?: 'text' | 'number' | 'select';
    options?: string[];
}

export interface Field {
    name: string;
    label: string;
    type: 'text' | 'number' | 'select';
    options?: string[];
}

export interface EntityFilter {
    id?: string;
}

export interface StudentFilter extends EntityFilter {
    firstName?: string;
    lastName?: string;
    age?: number;
    classCode?: string;
}

export interface TeacherFilter extends EntityFilter {
    firstName?: string;
    lastName?: string;
    subject?: Subject;
}

// OLD
// export interface Filter {
//     [key: string]: string | number | undefined;
// }
