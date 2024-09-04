
interface User {
    id: string;
    estado: string;
    sector: number;
    usuario: string;
}

interface UserPagination {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number;
    data: User[];
}

export type { User, UserPagination };