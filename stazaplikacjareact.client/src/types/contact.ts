export interface Contact {
    id: number;
    name: string
    surname: string;
    email: string;
    password: string;
    otherCategory?: string;
    phoneNumber: string;
    birthDate: Date;
    sluzbowySubCategoryId: number;
    categoryId: number;
}