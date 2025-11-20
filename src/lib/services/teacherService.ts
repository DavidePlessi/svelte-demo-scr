import { type Teacher, Subject, type TeacherFilter } from '$lib/types';
import { BaseService } from '$lib/services/baseService';
import { AppError, ErrorCode } from '$lib/errors';

export class TeacherService extends BaseService<Teacher, TeacherFilter> {
    private static instance: TeacherService;

    private constructor() {
        super('teachers');
    }

    protected getDefaults(): Teacher[] {
        return [
            { id: '6e22b5ce-1191-4c4c-a36b-7b243de9e4d8', firstName: 'Margaret', lastName: 'Hamilton', subject: Subject.English }
        ];
    }

    public static getInstance(): TeacherService {
        if (!TeacherService.instance) {
            TeacherService.instance = new TeacherService();
        }
        return TeacherService.instance;
    }

    public get(filter?: TeacherFilter): Teacher[] {
        if (!filter) return [...this.items];

        return this.items.filter(teacher => {
            const { firstName, lastName, subject } = filter;
            return (
                (!firstName || teacher.firstName.toLowerCase().includes(firstName.toLowerCase())) &&
                (!lastName || teacher.lastName.toLowerCase().includes(lastName.toLowerCase())) &&
                (!subject || teacher.subject === subject)
            );
        });
    }

    public addTeacher(teacher: Omit<Teacher, 'id'>): Teacher {
        if (!teacher.firstName || !teacher.lastName || !teacher.subject) {
            throw new AppError(ErrorCode.INVALID_TEACHER_DATA);
        }
        return this.add(teacher);
    }
}
