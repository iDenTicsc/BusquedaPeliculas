export interface ApiMovie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface Movie {
    title: string;
    year: string;
    id: string;
    poster: string;
}

export interface ApiResponse {
    Search?: ApiMovie[];
    totalResults?: string;
    Response: "True" | "False";
    Error?: string;
}