import type { Student, StudentFilter } from '$lib/types';
import { BaseService } from '$lib/services/baseService';
import { AppError, ErrorCode } from '$lib/errors';

export class StudentService extends BaseService<Student, StudentFilter> {
    private static instance: StudentService;

    private constructor() {
        super('students');
    }

    public static getInstance(): StudentService {
        if (!StudentService.instance) {
            StudentService.instance = new StudentService();
        }
        return StudentService.instance;
    }

    protected getDefaults(): Student[] {
        return [
            { id: '45faae85-6d04-444a-8aed-893fdb463928', firstName: 'Ada', lastName: 'Lovelace', age: 16, classCode: '3A' },
            { id: '3c6131a6-987e-4ec0-8fd3-533084886e3f', firstName: 'Grace', lastName: 'Hopper', age: 15, classCode: '2B' }
        ];
    }

    public get(filter?: StudentFilter): Student[] {
        if (!filter) return [...this.items];

        return this.items.filter(student => {
            const { firstName, lastName, age, classCode } = filter;
            return (
                (!firstName || student.firstName.toLowerCase().includes(firstName.toLowerCase())) &&
                (!lastName || student.lastName.toLowerCase().includes(lastName.toLowerCase())) &&
                (!age || student.age === age) &&
                (!classCode || student.classCode.toLowerCase().includes(classCode.toLowerCase()))
            );
        });
    }

    public addStudent(student: Omit<Student, 'id'>): Student {
        if (!student.firstName || !student.lastName || !student.age || !student.classCode) {
            throw new AppError(ErrorCode.INVALID_STUDENT_DATA);
        }
        if (student.age <= 0) {
            throw new AppError(ErrorCode.INVALID_AGE);
        }
        return this.add(student);
    }

    public update(student: Student): void {
        if (student.age <= 0) {
            throw new AppError(ErrorCode.INVALID_AGE);
        }
        super.update(student);
    }
}
