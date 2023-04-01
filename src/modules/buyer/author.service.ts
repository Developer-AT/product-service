import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorService {
    getAllAuthors(): string {
        return 'List of all Authors!';
    }

    addAuthor() {
        return 'Author added!';
    }

    updateAuthorById() {
        return 'Update Author by Id';
    }

    deleteAuthorById() {
        return 'Delete Author By Id';
    }
}
